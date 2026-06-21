# Plan de Trabajo - Hotfix Bugs QA Sprint 3

**Fecha:** 2026-06-21
**Branch:** `fix/qa-sprint3-hotfix`
**Responsable:** QA - José Soto
**Bloquea:** Despliegue a Producción

---

## Resumen Ejecutivo

3 bugs identificados en QA del Módulo de Panel de Administración. 2 de alta severidad bloquean el despliegue a producción. Todos requieren corrección en **frontend**, con mejoras defensivas en **backend**.

---

## BUG-ADM-001 — Filtro de estado inoperante

| Campo | Valor |
|-------|-------|
| Severidad | Alta |
| Caso de prueba | TC-ADMIN007 |
| Capa afectada | **Frontend** |

### Causa Raíz

El dropdown de filtros en `RequestFilters.tsx` envía valores en **minúsculas** (`"pending"`, `"in_review"`, `"approved"`, `"rejected"`), pero el hook `useAdminRequests.ts` valida contra `VALID_STATUSES` que contiene valores en **MAYÚSCULAS** (`"PENDING"`, `"IN_REVIEW"`, etc.).

```
RequestFilters.tsx:118  → value="pending"
useAdminRequests.ts:9   → VALID_STATUSES = ["PENDING", "IN_REVIEW", ...]
useAdminRequests.ts:40  → VALID_STATUSES.includes("pending") → false SIEMPRE
```

`validStatus` siempre es `undefined`, por lo que el filtro nunca se envía al backend.

### Archivos a Modificar

1. **`frontend/src/hooks/admin/useAdminRequests.ts`** (línea 9, 40-42)
   - Cambiar `VALID_STATUSES` a minúsculas: `["pending", "in_review", "approved", "rejected"]`
   - O alternativamente, mapear el valor del select a mayúsculas antes de validar

2. **`frontend/src/components/admin-requests/RequestFilters.tsx`** (líneas 118-121)
   - Asegurar que los `value` del select coincidan con los valores del enum `RequestStatus` de Prisma (`pending`, `in_review`, `approved`, `rejected`) — ya están correctos en minúsculas

### Criterio de Aceptación

- Seleccionar "Pending" en el dropdown filtra solo solicitudes con estado `pending`
- Seleccionar "In Review" filtra solo `in_review`
- Seleccionar "All Statuses" muestra todos los registros
- El filtro se mantiene al paginar

---

## BUG-ADM-002 — Error 500 al filtrar por tipo de trámite

| Campo | Valor |
|-------|-------|
| Severidad | Alta |
| Caso de prueba | Filtrado por Tipo de Trámite |
| Capa afectada | **Frontend** (causa) + **Backend** (validación) |

### Causa Raíz

El componente `RequestFilters.tsx` tiene opciones **hardcoded** con **nombres de trámite** en vez de UUIDs:

```tsx
<option value="Academic Certificate">Academic Certificate</option>
```

El backend recibe `"Academic Certificate"` y lo pasa directamente a Prisma como `procedureTypeId`:

```ts
// prisma-admin-dashboard.repository.ts:94
where.procedureTypeId = filters.procedureTypeId;  // "Academic Certificate" → UUID field
```

Prisma lanza: `Invalid input syntax for type uuid: "Academic Certificate"`

### Archivos a Modificar

1. **`frontend/src/components/admin-requests/RequestFilters.tsx`** (líneas 124-133)
   - Eliminar opciones hardcoded
   - Cargar tipos de trámite dinámicamente desde el backend via un nuevo servicio/hook
   - Usar el UUID como `value` y el nombre como label

2. **`frontend/src/services/admin/dashboard/dashboard.service.ts`** (nuevo endpoint o reutilizar existente)
   - Agregar función `getProcedureTypes()` que retorne `[{ id: UUID, name: string }]`

3. **`frontend/src/hooks/admin/` (nuevo hook o extender existente)**
   - Hook `useProcedureTypes()` para cargar los tipos de trámite al montar el filtro

4. **`backend/src/infrastructure/persistence/prisma/admin/prisma-admin-dashboard.repository.ts`** (línea 94)
   - Agregar validación: si `filters.procedureTypeId` no es un UUID válido, ignorar el filtro o retornar error controlado

### Criterio de Aceptación

- El dropdown de "Procedure Type" se carga dinámicamente con los trámites de la BD
- Seleccionar un trámite filtra correctamente por `procedureTypeId` (UUID)
- Si el backend recibe un valor inválido, retorna 400 con mensaje descriptivo (no 500)

---

## BUG-STUD-001 — Timeline no se actualiza sin observación

| Campo | Valor |
|-------|-------|
| Severidad | Media |
| Capa afectada | **Backend** + **Frontend** |

### Causa Raíz (3 problemas encadenados)

**Problema 1 — Backend: Tracking endpoint no retorna historial de estados**
- El endpoint de tracking construye la línea de tiempo **solo a partir de observaciones**, no de audit logs
- No hay forma de saber cuándo cambió el estado anteriormente

**Problema 2 — Frontend service: Timeline construido incorrectamente**
- `requestTracking.service.ts:44-53` itera observaciones y aplica `STATUS_MAP[item.status]` (estado actual) a **TODAS** las entradas
- Todas las entradas del timeline muestran el mismo status, no el histórico

**Problema 3 — Frontend hook: Sin re-fetch ni invalidación**
- `useRequestTracking.ts:58` solo depende de `[requestId]`
- No hay mecanismo de actualización cuando el admin cambia el estado
- La vista del estudiante permanece congelada

### Archivos a Modificar

1. **Backend — `application/procedures/procedure.service.ts`** (método `getRequestTracking`)
   - Modificar para incluir eventos de audit log (cambios de estado) en el timeline
   - Retornar cada cambio de estado como un entry del timeline con su timestamp

2. **Backend — `infrastructure/persistence/prisma/` (repository de procedures)**
   - Query para obtener `auditLogs` filtrados por `action` que contenga cambios de estado
   - Incluir `oldValue`, `newValue`, `createdAt` en la respuesta

3. **Frontend — `services/student/requests/requestTracking.service.ts`** (líneas 34-53)
   - Reconstruir el timeline combinando:
     - Evento "Submitted" (createdAt de la solicitud)
     - Eventos de audit log (cambios de estado)
     - Observaciones (comentarios de admin)
   - Cada entrada debe tener su propio status y timestamp

4. **Frontend — `hooks/requests/useRequestTracking.ts`**
   - Opción A: Agregar React Query para manejo de caché y invalidación
   - Opción B: Agregar polling cada 30s mientras la solicitud esté en estado activo
   - Opción C (mínimo): Agregar un refresh manual que el estudiante pueda usar

### Criterio de Aceptación

- Cuando el admin cambia el estado de "Pendiente" a "En Revisión", el estudiante ve el cambio en su timeline sin necesidad de recargar
- El timeline muestra cada paso: Submitted → Under Review → Approved/Rejected
- Cada paso tiene su fecha y descripción correspondiente

---

## Orden de Ejecución Recomendado

| Paso | Bug | Prioridad | Estimación |
|------|-----|-----------|------------|
| 1 | BUG-ADM-001 | Crítico (1 archivo, cambio mínimo) | 30 min |
| 2 | BUG-ADM-002 | Crítico (3-4 archivos, servicio + hook) | 2 horas |
| 3 | BUG-STUD-001 | Alto (backend + frontend, más complejo) | 3-4 horas |

**Total estimado:** ~6 horas de desarrollo

---

## Notas de Implementación

- No usar React Query a menos que se vaya a migrar todo el proyecto — mantener consistencia con el patrón actual de `useState` + `useEffect`
- Para BUG-ADM-002, verificar si ya existe un endpoint que retorne los procedure types (posiblemente `/procedures`)
- Para BUG-STUD-001, el endpoint de tracking ya existe en `procedure.controller.ts:74` — solo necesita enriquecerse con audit logs
- Todos los cambios deben incluir tests unitarios correspondientes
