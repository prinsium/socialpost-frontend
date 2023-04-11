import { Stack } from "@mui/material";
import React from "react";

const HorizontalStack = (props) => {
  return (
    <Stack direction="row" sx={{color: '#1b252f', backgroundColor: '#1b252f'}} alignItems="center" spacing={1} {...props}>
      {props.children}
    </Stack>
  );
};

export default HorizontalStack;