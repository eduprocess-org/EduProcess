import * as yup from "yup";

export const procedureRequestSchema = yup.object({
<<<<<<< HEAD
  career: yup
    .string()
    .required("Career is required"),

=======
>>>>>>> qa
  semester: yup
    .string()
    .required("Semester is required"),

  reason: yup
    .string()
    .required("Reason is required")
<<<<<<< HEAD
    .min(10),

  document: yup
    .mixed<FileList>()
    .required("Supporting document is required"),
=======
    .min(
      10,
      "Reason must contain at least 10 characters"
    ),
>>>>>>> qa
});