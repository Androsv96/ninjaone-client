import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

interface Props {
  handleCloseModal: () => void;
}

export const ButtonsSection = ({ handleCloseModal }: Props) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginTop: "32px" }}>
      <Button
        variant="outlined"
        sx={{ marginRight: "8px" }}
        onClick={handleCloseModal}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        sx={{
          bgcolor: "#337AB7",
          ":hover": {
            bgcolor: "#3370fb",
          },
        }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};
