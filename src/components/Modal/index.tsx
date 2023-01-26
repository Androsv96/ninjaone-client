import { ReactNode } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Icon from "@mui/material/Icon";
import Button from "@mui/material/Button";

import closeImg from "../../assets/close.svg";

interface Props {
  show: boolean;
  title: string;
  children?: ReactNode;
  action: "submit" | "delete";
}

export const CustomModal = ({ title, show, children, action }: Props) => {
  return (
    <Modal
      open={show}
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
            {title}
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
          >
            <img src={closeImg} alt="closeImg" />
          </Icon>
        </Box>
        <Box mt="24px">{children}</Box>
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "32px" }}>
          <Button variant="outlined" sx={{ marginRight: "8px" }}>
            Cancel
          </Button>
          <Button variant="contained">
            {action === "submit" ? "Submit" : "Delete"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
