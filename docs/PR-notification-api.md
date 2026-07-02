## General Description

* **Huly Issue Linked:** Notification API Endpoints
* **What was done?:** Implemented backend API endpoints for notification management. Created domain, application, and infrastructure layers following the existing project architecture. Connected frontend to consume the real API instead of mock data.

## Type of Change

* [x] `feat` (New feature)
* [ ] `fix` (Bug correction)
* [ ] `refactor` (Code restructuring without changes in behavior)
* [ ] `other` (Specify type from Conventional Commits)

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/v1/notifications` | Get notifications for authenticated user |
| `PATCH` | `/api/v1/notifications/:id/read` | Mark a notification as read |
| `PATCH` | `/api/v1/notifications/read-all` | Mark all notifications as read |

## Frontend Changes

- `frontend/src/services/notification/notificationService.ts` - Replaced mock data with real API calls using `apiClient`

## Quality Verification Checklist

* [x] The application runs and compiles successfully in the local workspace.
* [x] The functionality was tested manually before opening this Pull Request.
* [x] No local configuration or environment files (`.env`) are included in this commit.
* [x] Backend build passes (`npm run build`)
* [x] Frontend build passes (`npm run build`)
* [x] All backend tests pass (213/213)
* [x] Endpoints tested against real database
* [x] Authentication validation works (401 without token)
* [x] Authorization rules enforced (user only sees own notifications)
