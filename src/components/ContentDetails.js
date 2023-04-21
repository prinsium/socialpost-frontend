import { Avatar, Typography, Link, List, ListItem, ListItemAvatar, ListItemText, Box } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";
import UserAvatar from "./UserAvatar";

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <Box sx={{m:0, p:0}}>
      <List>
        <ListItem alignItems="flex-start">
      <ListItemAvatar>
      <UserAvatar width={38} height={38} username={username} />
      </ListItemAvatar>
      <ListItemText 
      primary={<Typography>
        <Link underline="none" color="inherit"
          onClick={(e) => {e.stopPropagation()}}
          href={"/users/" + username}
        >
          {username}
        </Link>
        </Typography>}
        secondary={!preview && (
          <Typography sx={{fontSize: '70%'}}>
            {edited && <>Edited&nbsp;</>}<Moment fromNow>{createdAt}</Moment>
            </Typography>
        )} />
        </ListItem>
      </List>
      </Box>
  );
};

export default ContentDetails;