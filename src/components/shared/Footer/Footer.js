import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

// CSS
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-content-icons">
          <a href="https://github.com/ClaudenirFer" target="_blank">
            <FontAwesomeIcon icon={faGithubSquare} />
          </a>
          <a
            href="https://www.linkedin.com/in/claudenir-ferreira-ab10b3b5/"
            target="_blank"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <div className="footer-content-copyright">
          <p> Claudenir Ferreira - &copy; 2022 - All rights reserved </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
