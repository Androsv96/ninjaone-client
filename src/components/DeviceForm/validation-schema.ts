import * as Yup from "yup";

export const validationSchema = Yup.object({
  system_name: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  hdd_capacity: Yup.string().required("Required"),
});
