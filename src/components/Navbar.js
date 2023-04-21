import { useTheme } from "@emotion/react";
import { IconButton, Stack, TextField, Modal, AppBar, useScrollTrigger, Slide, Box, Menu, MenuItem, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd, AiOutlinePlusCircle } from "react-icons/ai";
import {BiHomeAlt2, BiMessageSquareDetail, BiSearch} from "react-icons/bi"
import { Link, useNavigate, useLocation } from "react-router-dom";

import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import PostEditor from './PostEditor'

const style1 = {
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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 200,
  maxWidth: 600,
  minHeight: 130,
  maxHeight: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="up" in={!trigger}>
      {children}
    </Slide>
  );
}


const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openn, setOpenn] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpenn(true);
  const handleClose1 = () => setOpenn(false);
  const handleonClose = () => setAnchorEl(null);
  


  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };



  return (
    <HideOnScroll>
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0}} elevation={24} color="default" enableColorOnLight>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ ml: 2, mr: 2, pt: 1, pb: 1,}}
        spacing={!mobile ? 2 : 0}
      >
        <IconButton size="large" component={Link} to={"/"}><BiHomeAlt2 /></IconButton>

         <IconButton size="large" onClick={handleOpen}><BiSearch /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style1} component="form" direction="row" alignItems="center" onSubmit={handleSubmit}>
        <Box sx={{display: 'flex', alignItems: 'center', border: '1px solid',}} fullWidth >
             <TextField
              fullWidth
              variant="standard"
              size="small"
              placeholder="Search"
              sx={{ p:1}}
              onChange={handleChange}
              value={search}
             />
             <Divider orientation="vertical" flexItem />
             <IconButton sx={{m:1, p:1}} onClick={handleSubmit}>
             <BiSearch /></IconButton>
        </Box>
        </Box>
      </Modal>

    <div>
    <IconButton size="large" onClick={handleOpen1}><AiOutlinePlusCircle /></IconButton>
    <Modal
        open={openn}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
        <PostEditor /> 
        </Box>
      </Modal>

      </div>
          {user? (
            <>
            <IconButton size="large" component={Link} to={"/messenger"}><BiMessageSquareDetail /></IconButton>
            </>
          ):(
            <>
            <IconButton size="large" component={Link} to={"/login"}><BiMessageSquareDetail /></IconButton>
            </>
          )}

          {user ? (
            <>
               <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu}
              ><UserAvatar width={30} height={30} username={user.username} /></IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleonClose}
              >
                <MenuItem component={Link}  to={"/users/" + username}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <IconButton size="large" component={Link} to={"/login"}><AiOutlineUserAdd /></IconButton>
            </>
          )}
          </Stack>
          </AppBar>
          </HideOnScroll>
  );
};

export default Navbar;