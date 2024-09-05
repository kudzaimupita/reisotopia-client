
import React from 'react';
import './Navbar.css'; 
import Logo from '../Logo/Logo';

const Navbar = () => {
  return (
    <>
     <nav className="navbar">
      <div className="navbar-logo">
       <Logo/>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/hotels">Hotels</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
    </>
   
  );
};

export default Navbar;
