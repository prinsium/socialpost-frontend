import { Stack, Box } from "@mui/material";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./PostCard";

const Sidebar = () => {
  return (
    <Stack spacing={2}>
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;