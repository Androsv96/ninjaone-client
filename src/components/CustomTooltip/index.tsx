import { ReactNode, forwardRef } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

interface Props {
  children: ReactNode;
  title: ReactNode;
  open: boolean;
  handleTooltipClose: () => void;
}

export const CustomTooltip = ({
  open,
  title,
  children,
  handleTooltipClose,
}: Props) => {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      display: "block",
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
      zIndex: 99,
    },
  }));

  const handleCloseTooltip = () => handleTooltipClose();

  return (
    <ClickAwayListener onClickAway={handleCloseTooltip}>
      <Tooltip
        sx={{ zIndex: 99 }}
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleCloseTooltip}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={title}
        children={<div>{children}</div>}
      />
    </ClickAwayListener>
  );
};

{
  // <HtmlTooltip
  //   PopperProps={{
  //     disablePortal: true,
  //   }}
  //   onClose={handleCloseTooltip}
  //   open={open}
  //   disableFocusListener
  //   disableHoverListener
  //   disableTouchListener
  //   title={title}
  //   children={<div>{children}</div>}
  // />;
}
