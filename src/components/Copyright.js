import { Typography, Link } from "@mui/material";
import React from "react";

const Copyright = () => {
  return (
    <Typography variant="subtitle1">
      Copyright © 2023{" "}
      <Link href="/" underline="hover">
       Capybaras
      </Link>
    </Typography>
  );
};

export default Copyright;