import React from 'react';
import './App.css';

import { Navbar } from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Signup from './components/Signup';

function App() {

  return (
    <div>
        <Router>
          <Navbar/>
        <Routes>
        {/* <Route exact path='/Home' element={<Home/>}/>
        <Route exact path='/About' element={<About/>}/>
        <Route exact path='/Login' element={<Login/>}/> */}
        <Route exact path='/Signup' element={<Signup/>}/>
        </Routes>
        </Router>
</div>
  )
}

export default App;