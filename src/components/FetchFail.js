import { Typography, Box } from "@mui/material";
import React from "react";

const FetchFail = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography variant="h6" sx={{ mt: 2 }}>
        Something went wrong!
      </Typography>
    </Box>
  );
};

export default FetchFail;