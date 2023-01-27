import { useFormik } from "formik";

import { FormControl, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks/index";
import { setShowModal } from "../../redux/slices/ui";
import { setRefetchDevices } from "../../redux/slices/devices";
import { DEVICE } from "../../redux/slices/devices/interfaces";
import { ErrorLabel } from "../ErrorLabel";
import { TYPES } from "./constants";
import { validationSchema } from "./validation-schema";
import { GET_DEVICES_URL } from "../../utils/constants";

interface Props {
  handleCloseModal: () => void;
}

export const DeviceForm = ({ handleCloseModal }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedDevice } = useAppSelector((state) => state.uiSlice);

  const { values, errors, handleChange, handleSubmit } = useFormik<DEVICE>({
    initialValues: {
      hdd_capacity: selectedDevice.hdd_capacity ?? "",
      id: selectedDevice.id ?? "",
      system_name: selectedDevice.system_name ?? "",
      type: selectedDevice.type ?? "",
    },
    onSubmit: async (formData) => {
      const updatedDevice = new FormData();
      updatedDevice.append("hdd_capacity", formData.hdd_capacity);
      updatedDevice.append("system_name", formData.system_name);
      updatedDevice.append("type", formData.type);
      try {
        const rawData = await fetch(`${GET_DEVICES_URL}/${selectedDevice.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await rawData.json();
        if (data) {
          dispatch(setShowModal(false));
          dispatch(setRefetchDevices(true));
        }
      } catch (e) {
        console.log("There was an error updating the device ", e);
      }
    },
    validationSchema,
  });

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ display: "flex", flexDirection: "column" }}>
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
          placeholder="Select type"
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
            onChange={handleChange}
            value={values.hdd_capacity}
          />
          {errors.hdd_capacity && <ErrorLabel message={errors.hdd_capacity} />}
        </label>
      </FormControl>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "32px" }}>
        <Button
          variant="outlined"
          sx={{ marginRight: "8px" }}
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#337AB7",
            ":hover": {
              bgcolor: "#3370fb",
            },
          }}
          type="submit"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
