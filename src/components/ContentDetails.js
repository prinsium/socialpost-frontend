import { Avatar, Typography, Link } from "@mui/material";
import React from "react";
import HorizontalStack from "./util/HorizontalStack";
import Moment from "react-moment";
import UserAvatar from "./UserAvatar";

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <HorizontalStack sx={{}}>
      <UserAvatar width={35} height={35} username={username} />
      <Typography variant="h6" gutterBottom>
        <Link underline="none"
          color="white"
          onClick={(e) => {e.stopPropagation()}}
          href={"/users/" + username}
        >
          {username}
        </Link>
        </Typography>
        {!preview && (
          <>
          <Typography variant="subtitle2" >
            {edited && <>&nbsp;Edited&nbsp;</>}<Moment fromNow>{createdAt}</Moment>
          </Typography>
          </>
        )}
      
    </HorizontalStack>
  );
};

export default ContentDetails;