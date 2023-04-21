import { CircularProgress, styled, Stack, Typography } from "@mui/material";
import React from "react";

const MaterialUIText = styled(Typography)(({  }) => ({ 
  background: "-webkit-linear-gradient(45deg, #51ff8e 10%, #3300ff 20%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent" 
}))

const Loading = ({ label }) => {
  return (
    <Stack alignItems="center">
      <MaterialUIText> <CircularProgress size={30} sx={{ my: 1 }} /> </MaterialUIText>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {label || "Loading"}
      </Typography>
    </Stack>
  );
};

export default Loading;