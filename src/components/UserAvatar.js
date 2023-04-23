import React from "react";
import Avatar, { genConfig } from 'react-nice-avatar';

const UserAvatar = ({ username, height, width, shape }) => {
  const config = genConfig(username)
  return (
    <Avatar style={{ width: width, height: height }} shape={shape} {...config} />
  );
};

export default UserAvatar;