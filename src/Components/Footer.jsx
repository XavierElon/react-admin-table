import React from "react";
import "./Footer.css";
import Logo from "../images/iop-logo.png";
import Facebook from "../images/Facebook.svg";
import Twitter from "../images/Twitter.svg";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <img className="LogoFooter" src={Logo} alt="" />
        <p className="PrivacyText">Privacy Notice and Policies</p>
        <p className="AccessibilityText">Accessibility</p>
        <p className="OhioCheckbookText">Ohio Checkbook</p>
        <img className="FacebookLogo" src={Facebook} alt="" />
        <img className="TwitterLogo" src={Twitter} alt="" />
      </div>
    );
  }
}
