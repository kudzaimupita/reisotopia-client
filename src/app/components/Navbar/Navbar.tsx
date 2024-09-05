import React from "react";
import { useDispatch } from "react-redux";
import "./Navbar.css";
import Logo from "../Logo/Logo";
import { setLang } from "@/app/store";
import { useSelector } from "react-redux";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

const Navbar = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: any) => state.locale.currentLang);
  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLang(event.target.value));
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Logo />
        </div>
        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/hotels">Hotels</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="navbar-lang">
          <LanguageSelector />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
