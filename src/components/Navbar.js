import React from 'react'
import { Link } from "react-router-dom";

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExploreIcon from '@mui/icons-material/Explore';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

  
export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg justify-content-around bg-dark" data-bs-theme="dark">
      <div className='d-flex justify-content-between'>
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to='/'><HomeRoundedIcon fontSize="large" /></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/'><ExploreIcon fontSize="large" /></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/'><AddCircleOutlineIcon fontSize="large" /></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/'><ChatIcon fontSize="large" /></Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to='/Signup'><AccountCircleIcon fontSize="large" /></Link>
      </li>
    </ul>
    </div>
</nav>

    );
  }


export default Navbar

