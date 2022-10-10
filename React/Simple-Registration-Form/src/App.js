import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import './App.css';
import Signup from './components/Signup.js'
import Login from './components/Login.js'


function App() {
  return (
    <div className="App">
       <nav>
        <NavLink to="/"><h1>Registration Form</h1></NavLink>
        <div className="link-container">
          <NavLink to="signup">Signup</NavLink>
          <NavLink to="login">Login</NavLink>
        </div>
       </nav>
       <main>
         <Routes>
           <Route path="/" element={<Signup/>}/>
           <Route path="/signup" element={<Signup/>}/>
           <Route path="/login" element={<Login/>}/>
          </Routes>
       </main>
    </div>
  );
}

export default App;
