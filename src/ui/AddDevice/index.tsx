import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";

import { useAppDispatch } from "../../redux/hooks";
import { setActionToPerform, setShowModal } from "../../redux/slices/ui";
import addImg from "../../assets/add.svg";

export const AddDevice = () => {
  const dispatch = useAppDispatch();

  const handleAddNewDevice = () => {
    dispatch(setShowModal(true));
    dispatch(
      setActionToPerform({
        action: "add",
        selectedDevice: {
          hdd_capacity: "",
          id: "",
          system_name: "",
          type: "",
        },
      })
    );
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography
        sx={{
          color: "#211F33",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "24px",
        }}
      >
        Devices
      </Typography>
      <Button
        sx={{
          backgroundColor: "#337AB7",
          height: "38px",
          lineHeight: "14px",
          padding: "12px",
          ":hover": {
            backgroundColor: "#3370fb",
          },
        }}
        variant="contained"
        startIcon={
          <Icon
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={addImg} alt="addImg" />
          </Icon>
        }
        onClick={handleAddNewDevice}
      >
        Add device
      </Button>
    </Box>
  );
};
