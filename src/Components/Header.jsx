import React from "react";
import "./Header.css";
import Logo from "../images/logo-iop-marroon.png";
import Bar from "../images/Line.svg";
import HelpIcon from "../images/icn-help.png";
import UserIcon from "../images/icn-user.png";
import VerticalDivider from "../images/vertical-divider.svg";
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'



export default class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <header>
            <Link to="/footer">
          <img className="Logo" src={Logo} alt="" />
          </Link>
          <img className="Bar" src={Bar} alt="" />
          <p className="Title">Office of Workforce Transforamtion</p>
          <img className="VerticalDivider" src={VerticalDivider} alt="" />
          <img className="HelpIcon" src={HelpIcon} alt="" />
          <p className="HelpText">Help</p>
          <img className="UserIcon" src={UserIcon} alt="" />
          <p className="ProfileText">Profile</p>
          
        </header>
      </div>
    );
  }
}
