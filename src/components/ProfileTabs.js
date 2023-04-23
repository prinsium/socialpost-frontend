import { Card, Tab, Tabs } from "@mui/material";
import React from "react";
import {MdOutlineDashboard, MdOutlineFavoriteBorder, MdOutlineInsertComment} from "react-icons/md";

const ProfileTabs = (props) => {
  const handleChange = (e, newValue) => {
    props.setTab(newValue);
  };

  return (
    <Card variant="outlined">
      <Tabs value={props.tab} onChange={handleChange} variant="fullWidth" centered>
        <Tab label={<MdOutlineDashboard size='25px' />} value="posts" />
        <Tab label={<MdOutlineFavoriteBorder size="24px" />} value="liked" />
        <Tab label={<MdOutlineInsertComment size='25px' />} value="comments" />
      </Tabs>
    </Card>
  );
};

export default ProfileTabs;