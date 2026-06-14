# EDUPR-130 — Request Status Tracking Logic

## Objetivo
Implementar máquina de estados para seguimiento de solicitudes, línea de tiempo (timeline), auditoría, y conectar frontend con backend real (eliminar mocks).

---

## Arquitectura (Backend)

```
Controller → Service → Repository → Prisma → PostgreSQL
                ↕
         StatusHistoryService
                ↕
         StatusMachine (pure functions)
```

---

## 1. Status Machine — `backend/src/domain/procedures/status-machine.ts`

### Transiciones válidas
```
pending  ──→  in_review  ──→  approved
                              └──→  rejected
```
- `pending` → solo `in_review`
- `in_review` → `approved` o `rejected`
- `approved` / `rejected` → **terminales** (sin salida)

### Funciones exportadas
| Función | Descripción |
|---------|-------------|
| `isTransitionValid(from, to)` | Valida si una transición es legal |
| `getNextPossibleStatuses(current)` | Devuelve los estados siguientes posibles |
| `STATUS_LABELS` | Map `pending→Submitted`, `in_review→Under Review`, `approved→Approved`, `rejected→Rejected` |

---

## 2. StatusHistoryService — `backend/src/application/procedures/status-history.service.ts`

### `buildTimeline(request, statusLabels)`
Construye un array de `TimelineEntry[]` con:

1. Entrada inicial "Submitted" desde `createdAt`
2. Entradas por cada `auditLog` con `action === 'STATUS_CHANGE'`
3. **Observations**: si tienen la misma fecha que el último entry, **reemplazan su description** (no crean entry nuevo). Si tienen fecha distinta, crean entry nuevo con el status actual.

### `logStatusChange(params)`
Escribe en Winston:
- `STATUS_CHANGE` — siempre
- `APPROVED` — cuando `toStatus === 'approved'`
- `REJECTED` — cuando `toStatus === 'rejected'`

---

## 3. ProcedureService — `backend/src/application/procedures/procedure.service.ts`

### Métodos nuevos
| Método | Descripción |
|--------|-------------|
| `updateRequestStatus(id, newStatus, userId, userRole, comment?)` | Valida rol admin + transición, persiste, crea audit log + observation |
| `getRequestTimeline(id, studentId)` | Timeline para estudiante (suyo propio) |
| `adminGetRequestTimeline(id)` | Timeline para admin (cualquier solicitud) |

### Método modificado
| Método | Cambio |
|--------|--------|
| `createRequest(studentId, procedureId, files, extra?)` | Ahora recibe `extra: { career?, semester?, reason? }` y los persiste |

---

## 4. ProcedureController — `backend/src/infrastructure/http/controllers/procedure.controller.ts`

### Handlers nuevos
| Handler | Ruta | Códigos de respuesta |
|---------|------|---------------------|
| `updateRequestStatus` | `PATCH /requests/:id/status` | 200, 400, 401, 403, 404, 422 |
| `getRequestTimeline` | `GET /requests/:id/timeline` | 200, 401, 404 |
| `adminGetRequestTimeline` | `GET /admin/requests/:id/timeline` | 200, 401, 403, 404 |

### Errores mapeados
| Error | Código |
|-------|--------|
| `Invalid status transition` | 422 |
| `Only administrators can update request status` | 403 |

---

## 5. Rutas — `backend/src/infrastructure/http/routes/procedure.routes.ts`

```
GET    /procedures              → listar (auth)
GET    /procedures/:id          → detalle (auth)
POST   /requests                → crear (auth + multer)
GET    /requests                → listar del estudiante (auth)
GET    /requests/:id/tracking   → tracking (auth)
GET    /requests/:id/timeline   → timeline estudiante (auth)
PATCH  /requests/:id/status     → cambiar estado (auth + admin)
GET    /admin/requests/:id/timeline → timeline admin (auth + admin)
```

---

## 6. Admin Middleware — `backend/src/infrastructure/http/middlewares/admin.middleware.ts`

```ts
if (req.user?.role !== 'admin') → 403
```

---

## 7. Repositorio — `backend/src/infrastructure/persistence/prisma/prisma-procedure.repository.ts`

### Métodos nuevos
| Método | Descripción |
|--------|-------------|
| `findByIdWithoutAuth(id)` | Busca request sin filtrar por estudiante (admin) |
| `updateStatus(input)` | Actualiza status + crea observation si hay comment |
| `createAuditLog(...)` | Inserta en tabla `AuditLog` |
| `findAuditLogsByRequest(id)` | Trae audit logs ordenados |

### Método modificado
| Método | Cambio |
|--------|--------|
| `findById(id)` | Ahora mapea `procedureRequirements` → `requirements` |
| `createRequest(input)` | Persiste `career`, `semester`, `reason` |

---

## 8. Prisma Schema — `backend/prisma/schema.prisma`

### Columnas agregadas a `ProcedureRequest`
```
career    String?
semester  String?
reason    String?
```

---

## 9. Tipos — `backend/src/domain/procedures/procedure.types.ts`

### Nuevos tipos
```
AuditLogEntryDTO
UpdateStatusInput
```

### Tipos modificados
```
ProcedureRequestDTO  → +career?, +semester?, +reason?, +auditLogs?
CreateRequestInput   → +career?, +semester?, +reason?
```

---

## 10. Logger — `backend/src/infrastructure/config/logger.config.ts`

- File transport con rotación: 10MB, max 5 archivos
- Archivo separado para `error` level
- Directorio configurable via `LOG_DIR` env var (default `backend/logs/`)

---

## 11. Frontend — Conexión con Backend

### Archivo nuevo
| Archivo | Contenido |
|---------|-----------|
| `frontend/src/types/api.types.ts` | `ApiResponse<T>`, `ApiProcedure`, `ApiProcedureRequirement`, `ApiObservation`, `ApiRequest`, `ApiDocument` |

### Servicios modificados (todos dejaron de usar mocks)
| Servicio | Endpoint | Transformación |
|----------|----------|----------------|
| `procedures.service.ts` | `GET /procedures` | Mapea a `Procedure[]` con defaults |
| `procedure-details.service.ts` | `GET /procedures/:id` | Concatena `requirementsText` + `requirements` |
| `procedureRequest.service.ts` | `POST /requests` | Envía FormData con `procedureId`, `career`, `semester`, `reason`, `documents` |
| `requestTracking.service.ts` | `GET /requests/:id/tracking` | Construye timeline desde `observations` |
| `studentRequests.service.ts` | `GET /requests` | Mapea status: `in_review` → `PENDING` |

### Otros cambios frontend
| Archivo | Cambio |
|---------|--------|
| `apiClient.ts` | Interceptor JWT + baseURL `/api/v1` |
| `ProcedureRequestPage.tsx` | Usa `useProcedureDetails` hook en vez de mock |

---

## 12. Tests

| Archivo | Tests | Cobertura |
|---------|-------|-----------|
| `status-machine.test.js` | 12 | Transiciones válidas/inválidas, terminales, labels |
| `status-update.test.js` | 9 | Admin ok, no-admin 403, transición inválida, request no existente, terminal, rollback, audit log |
| `timeline.test.js` | 6 | Creación, audit logs, full flow, observations, filtro non-STATUS_CHANGE, orden |
| `full-flow.test.js` | 1 (14 pasos) | Lifecycle completo: procedures → crear → tracking → timeline → status changes → admin timeline → validaciones |

**Total: 73 tests, todos pasan.**

---

## Docker Compose

```yaml
services:
  backend:
    volumes:
      - eduprocess_logs:/var/log/eduprocess
    environment:
      - LOG_DIR=/var/log/eduprocess
volumes:
  eduprocess_logs:
```

---

## Archivos clave para review

### Domain (reglas de negocio puras)
- `backend/src/domain/procedures/status-machine.ts`
- `backend/src/domain/procedures/procedure.types.ts`

### Application (orquestación)
- `backend/src/application/procedures/procedure.service.ts`
- `backend/src/application/procedures/status-history.service.ts`

### Infrastructure (implementación concreta)
- `backend/src/infrastructure/http/controllers/procedure.controller.ts`
- `backend/src/infrastructure/http/routes/procedure.routes.ts`
- `backend/src/infrastructure/http/middlewares/admin.middleware.ts`
- `backend/src/infrastructure/persistence/prisma/prisma-procedure.repository.ts`
- `backend/src/infrastructure/config/logger.config.ts`

### Tests
- `backend/tests/procedures/status-machine.test.js`
- `backend/tests/procedures/status-update.test.js`
- `backend/tests/procedures/timeline.test.js`
- `backend/tests/procedures/full-flow.test.js`

### Frontend
- `frontend/src/types/api.types.ts`
- `frontend/src/services/procedures/procedureRequest.service.ts`
- `frontend/src/services/requests/requestTracking.service.ts`
- `frontend/src/services/api/apiClient.ts`
