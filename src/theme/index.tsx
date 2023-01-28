import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const CustomTheme = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomTheme;
