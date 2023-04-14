import { Card } from "@mui/material";
import React from "react";
import Copyright from "./Copyright";

const Footer = () => {
  return (
      <Card sx={{m:1, p:1}} variant="outlined">
        <Copyright />
      </Card>
  );
};

export default Footer;