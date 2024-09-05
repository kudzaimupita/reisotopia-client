'use client';

import React from 'react';
import './Container.css'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Container;
