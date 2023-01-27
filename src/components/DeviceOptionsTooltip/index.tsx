import { useRef, useState } from "react";

import Popover from "@mui/material/Popover";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";

import { useAppDispatch } from "../../redux/hooks";
import { setShowModal, setActionToPerform } from "../../redux/slices/ui";
import dotsImg from "../../assets/dots.svg";
import { DEVICE } from "../../redux/slices/devices/interfaces";

interface Props {
  device: DEVICE;
}

export const DevicesOptionsTooltip = ({ device }: Props) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    if (iconRef) {
      setAnchorEl(iconRef.current);
    }
  };
  const handleClose = () => setAnchorEl(null);
  const handleOnDeleteOptionClick = () => {
    dispatch(setShowModal(true));
    dispatch(
      setActionToPerform({
        action: "delete",
        selectedDevice: device,
      })
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "deviceOptions" : undefined;

  return (
    <ListItemSecondaryAction sx={{ position: "absolute" }}>
      <Icon
        ref={iconRef}
        aria-describedby={id}
        sx={{
          width: 32,
          height: 32,
          backgroundColor: "white",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        <img src={dotsImg} alt="dotsImg" />
      </Icon>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 120,
            height: 72,
            padding: "10px 12px",
            borderRadius: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "21px",
              ":hover": { cursor: "pointer", textDecoration: "underline" },
            }}
          >
            Edit
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: "21px",
              color: "#D53948",
              ":hover": { cursor: "pointer", textDecoration: "underline" },
            }}
            onClick={handleOnDeleteOptionClick}
          >
            Delete
          </Typography>
        </Box>
      </Popover>
    </ListItemSecondaryAction>
  );
};
