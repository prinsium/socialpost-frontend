import React from "react";
import Avatar, { genConfig } from 'react-nice-avatar';

const UserAvatar = ({ username, height, width }) => {
  const config = genConfig(username)
  return (
    <Avatar style={{ width: width, height: height }} {...config} />
  );
};

export default UserAvatar;