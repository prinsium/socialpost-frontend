import { IconButton } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftCircle } from "react-icons/bs"

const GoBack = () => {
  return (
    <IconButton component={Link} to={"/"}>
      <BsArrowLeftCircle />
    </IconButton>
  );
};

export default GoBack;