import React from "react";
import "./Footer.css";
import Logo from "../images/iop-logo.png";
import Facebook from "../images/Facebook.svg";
import Twitter from "../images/Twitter.svg";
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        
          <Link to='/'><img className="LogoFooter" src={Logo} alt="" /></Link>
          <p className="PrivacyText">Privacy Notice and Policies</p>
          <p className="AccessibilityText">Accessibility</p>
          <p className="OhioCheckbookText">Ohio Checkbook</p>
          <a target="_blank" href="https://www.facebook.com/">
            <img className="FacebookLogo" src={Facebook} alt="" />
          </a>
          <a target="_blank" href="https://www.twitter.com/">
            <img className="TwitterLogo" src={Twitter} alt="" />
          </a>
      </div>
    );
  }
}
