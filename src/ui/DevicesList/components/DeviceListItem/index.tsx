import { useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Icon from "@mui/material/Icon";
import ListItemText from "@mui/material/ListItemText";

import { DEVICE } from "../../../../utils/interfaces";
import {
  capitalizeFirstLetter,
  getDeviceLogo,
} from "../../../../utils/functions";

import dotsImg from "../../../../assets/dots.svg";

interface Props {
  device: DEVICE;
}

export const DeviceListItem = ({ device }: Props) => {
  const [showOptionsDots, setShowOptionsDots] = useState(false);

  return (
    <ListItem
      key={device.id}
      sx={{
        borderTop: "1px  solid #CBCFD3",
        fontSize: 14,
        color: "#211F33",
        lineHeight: "17px",
        fontWeight: 500,
        ":hover": {
          backgroundColor: "#F4F4F5",
        },
      }}
      onMouseOver={() => setShowOptionsDots(true)}
      onMouseOut={() => setShowOptionsDots(false)}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          <ListItemIcon
            sx={{
              minWidth: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={getDeviceLogo(device.type)}
                alt={`${device.type}Logo`}
              />
            </Icon>
          </ListItemIcon>
          <ListItemText primary={device.system_name} />
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: "15px",
            fontWeight: 400,
            color: "#6E6D7A",
          }}
        >
          {capitalizeFirstLetter(device.type)} workstation -{" "}
          {device.hdd_capacity} GB
        </Typography>
      </Box>
      {showOptionsDots && (
        <ListItemSecondaryAction>
          <Icon
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "white",
              borderRadius: "4px",
            }}
          >
            <img src={dotsImg} alt="dotsImg" />
          </Icon>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};
