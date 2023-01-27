import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Icon from "@mui/material/Icon";
import ListItemText from "@mui/material/ListItemText";

import { DEVICE } from "../../../../redux/slices/devices/interfaces";
import {
  capitalizeFirstLetter,
  getDeviceLogo,
} from "../../../../utils/functions";

import { CustomModal, DevicesOptionsTooltip } from "../../../../components";
interface Props {
  device: DEVICE;
  hoveredListItemId: string;
  setSelectedDevice: (id: string) => void;
}

export const DeviceListItem = ({
  device,
  hoveredListItemId,
  setSelectedDevice,
}: Props) => {
  return (
    <>
      <ListItem
        key={device.id}
        sx={{
          borderTop: "1px solid #CBCFD3",
          fontSize: 14,
          color: "#211F33",
          lineHeight: "17px",
          fontWeight: 500,
          bgcolor: device.id === hoveredListItemId ? "#F4F4F5" : "",
          ":hover": {
            bgcolor: device.id !== hoveredListItemId ? "#eaeaea" : "",
            cursor: "pointer",
          },
          ":last-child": {
            borderBottom: "1px solid #CBCFD3",
          },
        }}
        onClick={() => setSelectedDevice(device.id)}
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
            {capitalizeFirstLetter(device.type)} workstation -
            {device.hdd_capacity} GB
          </Typography>
        </Box>
        {hoveredListItemId === device.id && (
          <DevicesOptionsTooltip device={device} />
        )}
      </ListItem>
      <CustomModal />
    </>
  );
};
