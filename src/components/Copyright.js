import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1">
      Copyright © 2023{" "}
      <Link to="/" color="white">
       Capybaras
      </Link>
    </Typography>
  );
};

export default Copyright;