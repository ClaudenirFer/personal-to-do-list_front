import React from "react";
import { Link } from "react-router-dom";

// CSS
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-content-link">
          <Link to="/" className="header-content-link-item">
            Home
          </Link>

          <Link to="/add" className="header-content-link-item">
            Add
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
