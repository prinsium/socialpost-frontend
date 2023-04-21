import { Box, Stack, Typography, useTheme, Badge } from "@mui/material";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/authHelper";

const LikeBox = (props) => {
  const { likeCount, onLike } = props;
  const theme = useTheme();
  const [liked, setLiked] = useState(props.liked);

  const navigate = useNavigate();

  const handleLike = (e) => {
    if (isLoggedIn()) {
      const newLikedValue = !liked;
      setLiked(newLikedValue);
      onLike(newLikedValue);
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ "&:hover": {cursor: "pointer" }}} >
    <Badge badgeContent={likeCount} color="grey" onClick={handleLike}>
        {liked ? (<MdOutlineFavorite color="red"  size="24px" />) : (<MdOutlineFavoriteBorder size="24px" />)}
    </Badge>
      </Box>
  );
};

export default LikeBox;