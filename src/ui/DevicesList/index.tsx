import { useCallback, useEffect, useState } from "react";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DeviceListItem } from "./components";
import { GET_DEVICES_URL } from "../../utils/constants";
import { DEVICE } from "../../utils/interfaces";

export const DevicesList = () => {
  const [devicesData, setDevicesData] = useState<DEVICE[]>([]);

  const getDevices = useCallback(async () => {
    const rawData = await fetch(GET_DEVICES_URL);
    const data: DEVICE[] = await rawData.json();
    setDevicesData(data);
  }, []);

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", padding: "24px 31px" }}
    >
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

      <Typography
        sx={{
          color: "#211F33",
          fontWeight: 500,
          fontSize: 14,
          lineHeight: "17px",
          marginLeft: "12px",
          marginTop: "23px",
        }}
      >
        Device
      </Typography>
      <Box
        sx={{
          marginTop: "7px",
        }}
      >
        <List>
          {devicesData.length > 0 &&
            devicesData.map((device) => (
              <DeviceListItem key={device.id} device={device} />
            ))}
        </List>
      </Box>
    </Box>
  );
};
