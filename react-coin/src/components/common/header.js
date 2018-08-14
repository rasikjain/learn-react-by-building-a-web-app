import React from "react";
import "./header.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import Search from "./search";

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <img src={logo} alt="logo" className="Header-logo" />
      </Link>
      <Search />
    </div>
  );
};

export default Header;
