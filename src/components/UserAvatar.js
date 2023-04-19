
import React from "react";
import Avatar, { genConfig } from 'react-nice-avatar';

const UserAvatar = ({ username, height, width }) => {
  return (
    <Avatar style={{ width: width, height: height }} src={username} />
  );
};

export default UserAvatar;