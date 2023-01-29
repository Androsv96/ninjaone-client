import Box from "@mui/material/Box";

import { AddDevice, Filters } from "..";
import { DevicesList } from "./components/";

export const Home = () => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", padding: "24px 31px" }}
    >
      <AddDevice />
      <Filters />
      <DevicesList />
    </Box>
  );
};
