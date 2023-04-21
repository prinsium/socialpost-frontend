import { Box, Card, IconButton, Typography, useTheme, Link } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";

import { AiFillEdit, AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import {FiEdit2, FiTrash} from "react-icons/fi";
import { HiReply } from "react-icons/hi";

import { isLoggedIn } from "../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "./ContentDetails";
import HorizontalStack from "./util/HorizontalStack";
import { deleteComment, updateComment } from "../api/posts";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Markdown from "./Markdown";

const Comment = (props) => {
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    await updateComment(comment._id, user, { content });

    const newCommentData = { ...comment, content, edited: true };

    setComment(newCommentData);

    editComment(newCommentData);

    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
    borderRadius: 1.5,
    mb: theme.spacing(2),
    padding: theme.spacing(0),
  };

  return (
    <Card variant="outlined" >
    <Box sx={style}>
      <Box
        sx={{
          pl: theme.spacing(1),
          pt: theme.spacing(1),
          pb: theme.spacing(1),
          pr: 1,
        }}
      >
        {props.profile ? (
          <Box>
            <Typography variant="h6">
              <Link underline="hover" color="inherit" href={"/posts/" + comment.post._id}>
                {comment.post.title}
              </Link>
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              <Moment fromNow>{comment.createdAt}</Moment>{" "}
              {comment.edited && <>(Edited)</>}
            </Typography>
          </Box>
        ) : (
          <HorizontalStack justifyContent="space-between">
            <HorizontalStack>
              
              <ContentDetails
                username={comment.commenter.username}
                createdAt={comment.createdAt}
                edited={comment.edited}
              />

              <IconButton onClick={() => setMinimised(!minimised)}>
                {minimised ? (
                  <AiOutlinePlus size={15} />
                ) : (
                  <AiOutlineLine size={15} />
                )}
              </IconButton>
            </HorizontalStack>
            {!minimised && (
              <HorizontalStack >
                <IconButton
                  variant="text"
                  size="small"
                  onClick={handleSetReplying}
                >
                  {!replying ? (
                    <HiReply />
                  ) : (
                    <MdCancel />
                  )}
                </IconButton>
                {user && (isAuthor || user.isAdmin) && (
                  <HorizontalStack >
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={() => setEditing(!editing)}
                    >
                      {editing ? (
                        <MdCancel />
                      ) : (
                        <FiEdit2 />
                      )}
                    </IconButton>
                    <IconButton
                      variant="text"
                      size="small"
                      onClick={handleDelete}
                    >
                      <FiTrash />
                    </IconButton>
                  </HorizontalStack>
                )}
              </HorizontalStack>
            )}
          </HorizontalStack>
        )}

        {!minimised && (
          <Box overflow="hidden">
            {!editing ? (
              <Markdown content={comment.content} />
            ) : (
              <ContentUpdateEditor
                handleSubmit={handleSubmit}
                originalContent={comment.content}
              />
            )}

            {replying && !minimised && (
              <Box>
                <CommentEditor
                  comment={comment}
                  addComment={addComment}
                  setReplying={setReplying}
                  label="Reply..."
                />
              </Box>
            )}
            {comment.children && (
              <Box sx={{ pt: theme.spacing(2) }}>
                {comment.children.map((reply, i) => (
                  <Comment
                    key={reply._id}
                    comment={reply}
                    depth={depth + 1}
                    addComment={addComment}
                    removeComment={removeComment}
                    editComment={editComment}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
    </Card>
  );
};

export default Comment;