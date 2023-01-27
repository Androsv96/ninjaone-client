import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

import {
  getActionToPerform,
  getMethodFromActionToPerform,
} from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/";
import { setRefetchDevices } from "../../redux/slices/devices";
import { setShowModal } from "../../redux/slices/ui";
import { GET_DEVICES_URL } from "../../utils/constants";
import closeImg from "../../assets/close.svg";

export const CustomModal = () => {
  const dispatch = useAppDispatch();
  const { showModal, actionToPerform, selectedDevice } = useAppSelector(
    (state) => state.uiSlice
  );

  const handleCloseModal = () => dispatch(setShowModal(false));

  const handleSubmit = () => {
    const method = getMethodFromActionToPerform(actionToPerform);
    if (method === "DELETE") return handleDeleteDevice();
  };

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
    <Modal
      open={showModal}
      BackdropComponent={() => (
        <div
          style={{
            backgroundColor: "#211f33",
            opacity: 0.1,
            width: "100%",
            height: "100%",
          }}
        />
      )}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 540,
          bgcolor: "white",
          outline: 0,
          borderRadius: "4px",
          padding: "24px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontSize: "24px", lineHeight: "29px", fontWeight: 500 }}
          >
            {getActionToPerform(actionToPerform)}
          </Typography>
          <Icon
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ":hover": {
                cursor: "pointer",
              },
            }}
            onClick={handleCloseModal}
          >
            <img src={closeImg} alt="closeImg" />
          </Icon>
        </Box>
        <Box mt="24px">
          <Typography
            sx={{ fontSize: "14px", lineHeight: "16px", fontWeight: 400 }}
          >
            You are about to delete the device{" "}
            <Typography component={"span"} fontWeight={700}>
              {`${selectedDevice.system_name}. `}
            </Typography>
            This action cannot be undone.
          </Typography>
        </Box>
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
              bgcolor: actionToPerform === "delete" ? "#D53948" : "#337AB7",
              ":hover": {
                bgcolor: actionToPerform === "delete" ? "#d51414" : "#3370fb",
              },
            }}
            onClick={handleSubmit}
          >
            {actionToPerform === "delete" ? "Delete" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};