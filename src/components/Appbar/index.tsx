import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import ninjaOneLogo from "../../assets/ninjaOneLogo.svg";

export const Appbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#002A42" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{ width: 120, height: 26 }}
            src={ninjaOneLogo}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
