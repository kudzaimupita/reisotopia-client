import React from 'react';
import './Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <img src="https://reisetopia.de/hotel-frontend/_next/image?url=%2Fstatic%2Fimages%2Fheader%2Freisetopia-white.svg&w=256&q=75" alt="Reisetopia" className="logo-image" />
    </div>
  );
};

export default Logo;
