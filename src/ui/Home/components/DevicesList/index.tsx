import { useCallback, useEffect, useState } from "react";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setDevices,
  setRefetchDevices,
} from "../../../../redux/slices/devices";
import { DEVICE } from "../../../../redux/slices/devices/interfaces";
import { GET_DEVICES_URL } from "../../../../utils/constants";
import { DeviceListItem } from "../DeviceListItem";

export const DevicesList = () => {
  const [selectedListItem, setSelectedListItem] = useState("");
  const { refetchDevices, filteredDevices } = useAppSelector(
    (state) => state.devicesSlice
  );
  const dispatch = useAppDispatch();

  const handleOnSelectedListItem = (id: string) => {
    if (id === selectedListItem) return setSelectedListItem("");
    setSelectedListItem(id);
  };

  const getDevices = useCallback(async () => {
    try {
      const rawData = await fetch(GET_DEVICES_URL);
      const data: DEVICE[] = await rawData.json();
      dispatch(setDevices(data));
    } catch (e) {
      console.log("There was an error getting the devices ", e);
    }
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
    <>
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
    </>
  );
};
