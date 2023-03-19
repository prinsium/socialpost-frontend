import React from 'react';
import './App.css';


import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

function App() {
  const [value, setValue] = useState(0);
  return (
    <nav className="navbar fixed-bottom navbar-light">
    <BottomNavigation
  showLabels
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
  }}
>
  <BottomNavigationAction label="Home" icon={<HomeIcon />} />
  <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
  <BottomNavigationAction label="" icon={<AddCircleOutlineIcon />} />
  <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
  <BottomNavigationAction label="Account" icon={<AccountCircleIcon />} />
</BottomNavigation>
    </nav>
  );
}

export default App;