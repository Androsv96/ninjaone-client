import { useCallback, useEffect, useState } from "react";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { DEVICE } from "../../redux/slices/devices/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DeviceListItem } from "./components";
import { GET_DEVICES_URL } from "../../utils/constants";
import { setDevices, setRefetchDevices } from "../../redux/slices/devices";
import { AddDevice, Filters } from "../";

export const DevicesList = () => {
  const dispatch = useAppDispatch();
  const { refetchDevices, filteredDevices } = useAppSelector(
    (state) => state.devicesSlice
  );

  const [selectedListItem, setSelectedListItem] = useState("");

  const handleOnSelectedListItem = (id: string) => {
    if (id === selectedListItem) return setSelectedListItem("");
    setSelectedListItem(id);
  };

  const getDevices = useCallback(async () => {
    const rawData = await fetch(GET_DEVICES_URL);
    const data: DEVICE[] = await rawData.json();
    dispatch(setDevices(data));
  }, [dispatch]);

  useEffect(() => {
    getDevices();
  }, [getDevices]);

  useEffect(() => {
    if (refetchDevices) {
      dispatch(setRefetchDevices(false));
      getDevices();
    }
  }, [refetchDevices, getDevices, dispatch]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", padding: "24px 31px" }}
    >
      <AddDevice />
      <Filters />

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
          {filteredDevices.length > 0 &&
            filteredDevices.map((device) => (
              <DeviceListItem
                key={device.id}
                hoveredListItemId={selectedListItem}
                device={device}
                setSelectedDevice={handleOnSelectedListItem}
              />
            ))}
        </List>
      </Box>
    </Box>
  );
};
