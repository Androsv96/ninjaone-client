import * as Yup from "yup";

export const validationSchema = Yup.object({
  system_name: Yup.string()
    .required("Required")
    .min(3, "Length must be greater than 2 chars")
    .max(20, "Max length is 20"),
  type: Yup.string().required("Required"),
  hdd_capacity: Yup.number()
    .required("Required")
    .max(10000000, "Max GB is 10000000"),
});
