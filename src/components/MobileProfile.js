import { useTheme } from "@emotion/react";
import {Avatar, Box, Button, Card, Divider, IconButton, Paper, Stack, Typography,} from "@mui/material";
import React, { useEffect, useState } from "react";
import {FiEdit2} from "react-icons/fi";
import { MdCancel } from "react-icons/md";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const MobileProfile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card variant="outlined" sx={{ display: { sm: "block", md: "none" }, mb: 2 }}>
     <Paper sx={{p:2}} elevation={0}>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            <UserAvatar width={150} height={150} shape="rounded" username={user.username} />
          </Box>

          <Typography variant="h6">{user.username}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalContent={user.biography}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <Typography textAlign="center" variant="p">
              {user.biography}
            </Typography>
          ) : (
            <Typography variant="p">
              No bio yet
            </Typography>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <IconButton onClick={props.handleEditing}>
                {props.editing ? <MdCancel /> : <FiEdit2 />}
              </IconButton>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" color="error" onClick={props.handleMessage}>
              Message
            </Button>
          )}

          <HorizontalStack>
            <Typography color="text.secondary">
              Likes: <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="text.secondary">
              Posts: <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
      </Paper>
    </Card>
  );
};

export default MobileProfile;