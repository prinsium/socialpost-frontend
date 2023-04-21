import {Box, Card, IconButton, Stack, Typography, useTheme, Badge } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillCheckCircle, AiFillMessage } from "react-icons/ai";
import {RxCrossCircled} from "react-icons/rx";
import {FiEdit2, FiTrash} from "react-icons/fi";
import { BiMessageSquare, BiMessageSquareDots } from "react-icons/bi";

import { deletePost, likePost, unlikePost, updatePost } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import ContentDetails from "./ContentDetails";
import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import HorizontalStack from "./util/HorizontalStack";
import PostUpdateEditor from "./PostUpdateEditor";
import Markdown from "./Markdown";

import "./postCard.css";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxWidth: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isAuthor = user && user.username === postData.poster.username;

  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 210;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), title, content );
    setPost({ ...post, title, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <Card variant="outlined" sx={{ padding: 0 }} >
      <Box className={preview}>
        
          <PostContentBox clickable={preview} post={post} editing={editing} >
            <HorizontalStack justifyContent="space-between">
              <ContentDetails
                username={post.poster.username}
                createdAt={post.createdAt}
                edited={post.edited}
                preview={preview === "secondary"}
              />
              <Box>
                {user && (isAuthor || user.isAdmin) && preview !== "secondary" && (
                  <HorizontalStack>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleEditPost}
                    >
                      {editing ? (
                        <RxCrossCircled color={iconColor} />
                      ) : (
                        <FiEdit2 color= '#adbfcf' />
                      )}
                    </IconButton>
                    <IconButton
                      disabled={loading}
                      size="small"
                      onClick={handleDeletePost}
                    >
                      {confirm ? (
                        <AiFillCheckCircle color={theme.palette.error.main} />
                      ) : (
                        <FiTrash color= '#adbfcf' />
                      )}
                    </IconButton>
                  </HorizontalStack>
                )}
              </Box>
            </HorizontalStack>
              <Box sx={{ml:1, mr:1, pl:1, pr:1}}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ overflow: "hidden", maxHeight: 125 }}
              className="title"
            >
              {post.title}
            </Typography>

            {preview !== "secondary" &&
              (editing ? (
                <PostUpdateEditor
                  handleSubmit={handleSubmit}
                  originalTitle={post.title}
                  originalContent={post.content}
                />
              ) : (
                <Box>
                <Box
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="title"
                >
                  <Markdown title={post.title} />
                </Box>

                <Box
                  maxHeight={maxHeight}
                  overflow="hidden"
                  className="content"
                >
                  <Markdown content={post.content} />
                </Box>
                </Box>
              ))}
              </Box>
               </PostContentBox>
        
      </Box>
            <HorizontalStack sx={{ m: 1, p: 1 }}>
          <Badge> 
            <LikeBox sx={{ "&:hover": {cursor: "pointer" }}} likeCount={likeCount} liked={post.liked} onLike={handleLike} /></Badge>
            
            <Box sx={{ "&:hover": {cursor: "pointer" }}} onClick={() => navigate("/posts/" + post._id)}>
            <Badge badgeContent={post.commentCount} >
              {post.commentCount===0?(<BiMessageSquare  size="24px" />):(<BiMessageSquareDots  size="24px" />)}
            </Badge>
            </Box>
            </HorizontalStack>
         
    </Card>
  );
};

export default PostCard;