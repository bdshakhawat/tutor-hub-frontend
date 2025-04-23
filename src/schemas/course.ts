import * as yup from "yup";

export const courseYupSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  level: yup.string().required("Level is required"),
  location: yup.string().required("Location is required"),
  seats: yup
    .number()
    .required("Seats is required")
    .integer()
    .min(0, "Seats must be non-negative"),
  classtime: yup.string().required("Classtime is required"),
  price: yup.array().of(
    yup.object().shape({
      amountPerWeek: yup
        .number()
        .required("Price per Week is required")
        .min(0, "Price must be non-negative"),
      daysPerWeek: yup
        .number()
        .required("Days per Week is required")
        .integer()
        .min(0, "Days must be non-negative"),
    })
  ),
});

