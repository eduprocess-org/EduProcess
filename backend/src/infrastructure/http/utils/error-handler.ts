import { Response } from "express";
import { logger } from "../../config/logger.config";

interface ErrorMapping {
  message: string;
  status: number;
}

const ERROR_MAPPINGS: ErrorMapping[] = [
  { message: "Request not found", status: 404 },
  { message: "Procedure not found", status: 404 },
  { message: "Observation not found", status: 404 },
  { message: "Request not found or unauthorized", status: 404 },
  { message: "A user with this email already exists", status: 409 },
  { message: "Only institutional emails ending in @uce.edu.ec are allowed", status: 400 },
  { message: "Invalid credentials", status: 401 },
  { message: "Invalid or expired refresh token", status: 401 },
  { message: "Procedure is not available for new requests", status: 409 },
  { message: "Procedure name is required", status: 400 },
  { message: "Procedure description is required", status: 400 },
  { message: "Procedure name must be at least 3 characters", status: 400 },
  { message: "Procedure name must not exceed 200 characters", status: 400 },
  { message: "Procedure description must not exceed 2000 characters", status: 400 },
  { message: "Procedure with this name already exists", status: 409 },
  { message: "Specified faculty does not exist", status: 400 },
  { message: "Specified career does not exist", status: 400 },
  { message: "Each requirement must have a name", status: 400 },
  { message: "Cannot delete procedure with active requests", status: 409 },
  { message: "Failed to upload document", status: 502 },
  { message: "Only administrators can update request status", status: 403 },
  { message: "Notification not found", status: 404 },
];

const PREFIX_MAPPINGS: Array<{ prefix: string; status: number }> = [
  { prefix: "Unsupported file type", status: 400 },
  { prefix: "Invalid status transition", status: 422 },
  { prefix: "File exceeds", status: 400 },
];

export function handleError(error: unknown, res: Response, context: string) {
  if (error instanceof Error && error.name === "MulterError") {
    return res.status(400).json({ success: false, message: "File exceeds the 5MB size limit" });
  }

  const message = error instanceof Error ? error.message : "Internal server error";

  for (const mapping of ERROR_MAPPINGS) {
    if (message === mapping.message) {
      return res.status(mapping.status).json({ success: false, message });
    }
  }

  for (const mapping of PREFIX_MAPPINGS) {
    if (message.startsWith(mapping.prefix)) {
      return res.status(mapping.status).json({ success: false, message });
    }
  }

  logger.error(`Unhandled error in ${context}`, { error: message });
  res.status(500).json({ success: false, message: "Internal server error" });
}
