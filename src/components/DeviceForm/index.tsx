import { useFormik } from "formik";

import { FormControl, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";
import { setShowModal } from "../../redux/slices/ui";
import { setRefetchDevices } from "../../redux/slices/devices";
import { DEVICE } from "../../redux/slices/devices/interfaces";
import { ErrorLabel } from "../ErrorLabel";
import { TYPES } from "./constants";
import { GET_DEVICES_URL } from "../../utils/constants";
import { ButtonsSection } from "./components";
import { validationSchema } from "./validation-schema";

interface Props {
  handleCloseModal: () => void;
}

export const DeviceForm = ({ handleCloseModal }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedDevice, actionToPerform } = useAppSelector(
    (state) => state.uiSlice
  );

  const { values, errors, handleChange, handleSubmit, setFieldValue } =
    useFormik<DEVICE>({
      initialValues: {
        hdd_capacity: selectedDevice.hdd_capacity ?? "",
        id: selectedDevice.id ?? "",
        system_name: selectedDevice.system_name ?? "",
        type: selectedDevice.type ?? "",
      },
      onSubmit: async (formData) => {
        try {
          const rawData = await fetch(
            `${GET_DEVICES_URL}/${
              actionToPerform === "edit" ? selectedDevice.id : ""
            }`,
            {
              method: actionToPerform === "add" ? "POST" : "PUT",
              body: JSON.stringify(formData),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
          const data = await rawData.json();
          if (data) {
            dispatch(setShowModal(false));
            dispatch(setRefetchDevices(true));
          }
        } catch (e) {
          console.log("There was an error ", e);
        }
      },
      validationSchema,
    });

  const handleCapacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = new RegExp(/^\d*$/);
    if (regex.test(e.currentTarget.value))
      setFieldValue("hdd_capacity", e.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label style={{ display: "flex", flexDirection: "column" }}>
          <span>System name *</span>
          <TextField
            sx={{ marginTop: "2px" }}
            name="system_name"
            onChange={handleChange}
            value={values.system_name}
          />
          {errors.system_name && <ErrorLabel message={errors.system_name} />}
        </label>
        <label style={{ marginTop: "6px" }}>Device type *</label>
        <Select
          sx={{ marginTop: "2px" }}
          displayEmpty
          name="type"
          onChange={handleChange}
          value={values.type}
        >
          <MenuItem value="">Select type</MenuItem>
          {TYPES.map(({ key, value }) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
        {errors.type && <ErrorLabel message={errors.type} />}
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: "6px" }}
        >
          <span>HDD capacity (GB) *</span>
          <TextField
            sx={{ marginTop: "2px" }}
            name="hdd_capacity"
            onChange={handleCapacityChange}
            value={values.hdd_capacity}
          />
          {errors.hdd_capacity && <ErrorLabel message={errors.hdd_capacity} />}
        </label>
      </FormControl>
      <ButtonsSection handleCloseModal={handleCloseModal} />
    </form>
  );
};
