import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowModal } from "../../redux/slices/ui";
import { setRefetchDevices } from "../../redux/slices/devices";
import { GET_DEVICES_URL } from "../../utils/constants";

interface Props {
  systemName: string;
  handleCloseModal: () => void;
}

export const ConfirmDeleteDevice = ({
  systemName,
  handleCloseModal,
}: Props) => {
  const { selectedDevice } = useAppSelector((state) => state.uiSlice);
  const dispatch = useAppDispatch();

  const handleDeleteDevice = async () => {
    const rawData = await fetch(`${GET_DEVICES_URL}/${selectedDevice.id}`, {
      method: "DELETE",
    });
    const data = await rawData.json();
    if (data) {
      dispatch(setShowModal(false));
      dispatch(setRefetchDevices(true));
    }
  };

  return (
    <>
      <Typography
        sx={{ fontSize: "14px", lineHeight: "16px", fontWeight: 400 }}
      >
        You are about to delete the device{" "}
        <Typography component={"span"} fontWeight={700}>
          {systemName}
        </Typography>{" "}
        This action cannot be undone.
      </Typography>
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
            bgcolor: "#D53948",
            ":hover": {
              bgcolor: "#d51414",
            },
          }}
          onClick={handleDeleteDevice}
        >
          Delete
        </Button>
      </Box>
    </>
  );
};
