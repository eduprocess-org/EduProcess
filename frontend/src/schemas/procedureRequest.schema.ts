import * as yup from "yup";

export const procedureRequestSchema = yup.object({
  career: yup
    .string()
    .required("Career is required"),

  semester: yup
    .string()
    .required("Semester is required"),

  reason: yup
    .string()
    .required("Reason is required")
    .min(10),

  document: yup
    .mixed<FileList>()
    .required("Supporting document is required"),
});