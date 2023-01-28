import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icon from "@mui/material/Icon";

import { ConfirmDeleteDevice, DeviceForm } from "../";
import { getActionToPerform } from "../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/";
import { setShowModal } from "../../redux/slices/ui";
import closeImg from "../../assets/close.svg";

export const CustomModal = () => {
  const dispatch = useAppDispatch();
  const { showModal, actionToPerform, selectedDevice } = useAppSelector(
    (state) => state.uiSlice
  );

  const handleCloseModal = () => dispatch(setShowModal(false));

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
          {actionToPerform === "delete" ? (
            <ConfirmDeleteDevice
              systemName={selectedDevice.system_name}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            <DeviceForm handleCloseModal={handleCloseModal} />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
