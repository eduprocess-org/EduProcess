import * as yup from "yup";

export const procedureRequestSchema = yup.object({
  semester: yup
    .string()
    .required("Semester is required"),

  reason: yup
    .string()
    .required("Reason is required")
    .min(
      10,
      "Reason must contain at least 10 characters"
    ),
});