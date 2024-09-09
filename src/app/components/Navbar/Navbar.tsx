import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import LanguageSelector from "../LanguageSelector/LanguageSelector";
import useIsMobile from "@/app/hooks/useIsMobile";

const Navbar: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="navbar">
      {!isMobile && (
        <div className="navbar-logo">
          <Logo />
        </div>
      )}
      <div className="navbar-lang">
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
