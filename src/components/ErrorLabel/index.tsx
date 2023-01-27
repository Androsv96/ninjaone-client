import Typography from "@mui/material/Typography";

interface Props {
  message: string;
}

export const ErrorLabel = ({ message }: Props) => {
  return (
    <Typography
      component={"span"}
      sx={{ color: "#D53948", fontSize: "14px", lineHeight: "21px" }}
    >
      {message}
    </Typography>
  );
};
