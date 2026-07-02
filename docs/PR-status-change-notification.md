## General Description

* **Huly Issue Linked:** EDUPR-266
* **What was done?:** Implemented automatic notification generation when procedure request status changes. Added NotificationService injection to ProcedureService and created STATUS_NOTIFICATION_MAP with messages for each status transition (in_review, approved, rejected).

## Type of Change

* [x] `feat` (New feature)
* [ ] `fix` (Bug correction)
* [ ] `refactor` (Code restructuring without changes in behavior)
* [ ] `other` (Specify type from Conventional Commits)

## Quality Verification Checklist

* [x] The application runs and compiles successfully in the local workspace.
* [x] The functionality was tested manually before opening this Pull Request.
* [x] No local configuration or environment files (`.env`) are included in this commit.
