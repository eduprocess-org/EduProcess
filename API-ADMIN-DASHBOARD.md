# Admin Dashboard API

Endpoints para el dashboard administrativo de EduProcess.

## Base URL

```
/api/v1/admin/dashboard
```

## Authentication

Todos los endpoints requieren:
- JWT Bearer token en el header `Authorization`
- Rol de administrador (`admin`)

```http
Authorization: Bearer <sessionToken>
```

---

## Endpoints

### GET /admin/dashboard/stats

Obtiene métricas resumen del dashboard.

**Response 200:**
```json
{
  "success": true,
  "data": {
    "totalRequests": 125,
    "pendingRequests": 42,
    "approvedRequests": 70,
    "rejectedRequests": 13
  }
}
```

**Response 401:** Sin token o token inválido
**Response 403:** Rol no es admin
**Response 500:** Error interno del servidor

---

### GET /admin/dashboard/recent-requests

Obtiene las 10 solicitudes más recientes.

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "studentName": "Juan Perez",
      "procedureName": "Transcript Request",
      "status": "PENDING",
      "createdAt": "2026-06-16T00:00:00.000Z"
    }
  ]
}
```

**Campos:**
- `id`: Identificador único de la solicitud
- `studentName`: Nombre completo del estudiante
- `procedureName`: Nombre del tipo de trámite
- `status`: Estado de la solicitud (`PENDING`, `APPROVED`, `REJECTED`)
- `createdAt`: Fecha de creación (ISO 8601)

**Response 401:** Sin token o token inválido
**Response 403:** Rol no es admin
**Response 500:** Error interno del servidor

---

### GET /admin/dashboard/requests-by-procedure

Obtiene el conteo de solicitudes agrupadas por tipo de trámite.

**Response 200:**
```json
{
  "success": true,
  "data": [
    {
      "procedureTypeId": "uuid",
      "procedureName": "Transcript Request",
      "count": 50
    },
    {
      "procedureTypeId": "uuid",
      "procedureName": "Enrollment Certificate",
      "count": 35
    }
  ]
}
```

**Campos:**
- `procedureTypeId`: Identificador del tipo de trámite
- `procedureName`: Nombre del tipo de trámite
- `count`: Cantidad de solicitudes para ese tipo

**Response 401:** Sin token o token inválido
**Response 403:** Rol no es admin
**Response 500:** Error interno del servidor

---

## Error Response Format

Todos los errores siguen el mismo formato:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Status Codes

| Código | Descripción |
|--------|-------------|
| 200 | Éxito |
| 401 | No autenticado |
| 403 | No autorizado (rol insuficiente) |
| 500 | Error interno del servidor |
