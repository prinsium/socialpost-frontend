import { useTheme } from "@emotion/react";
import {
  IconButton,
  Stack,
  TextField,
  Modal,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineSearch,
  AiOutlineUserAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import {BiHomeAlt2, BiChat} from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PostEditor from './PostEditor'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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
    <Stack mb={2}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <IconButton component={Link} to={"/"}><BiHomeAlt2 /></IconButton>

        {!navbarWidth && (
          <div>
         <IconButton onClick={handleOpen}><AiOutlineSearch /></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit}>
             <TextField
               size="small"
              label="Search "
               sx={{ flexGrow: 1, maxWidth: 300 }}
               onChange={handleChange}
               value={search}
             />
        </Box>
      </Modal>
      </div>
        )}

    {/* <IconButton component={Link} to={"/posts/create"}><AiOutlinePlusCircle /></IconButton> */}
    <div>
    <IconButton onClick={handleOpen1}><AiOutlinePlusCircle /></IconButton>
    <Modal
        open={openn}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      ><PostEditor />
       
        
      </Modal>
      </div>

          {user? (
            <>
            <IconButton component={Link} to={"/messenger"}>
                <BiChat />
              </IconButton>
            </>
          ):(
            <>
            <IconButton component={Link} to={"/login"}>
                <BiChat />
              </IconButton>
            </>
          )}

          {user ? (
            <>

               <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu}
                color="inherit"><UserAvatar width={30} height={30} username={user.username} /></IconButton>
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
              <IconButton component={Link} to={"/login"}>
                <AiOutlineUserAdd />
              </IconButton>
            </>
          )}
          </Stack>
          </Stack>
  );
};

export default Navbar;