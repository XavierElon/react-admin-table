import React from 'react'
import './Header.css'
import Logo from '../images/logo-iop-marroon.png'
import Bar from '../images/Line.svg'
import HelpIcon from '../images/icn-help.png'
import UserIcon from '../images/icn-user.png'
import VerticalDivider from '../images/vertical-divider.svg'

export default class Header extends React.Component {
    render() {

        return (
            <div className="Header">
                <img className="Logo" src={Logo} alt="" />
                <img className="Bar" src={Bar} alt="" />
                <p className="Title">Office of Workforce Transforamtion</p>
                <img className="VerticalDivider" src={VerticalDivider} alt=""/>
                <img className="HelpIcon" src={HelpIcon} alt=""/>
                <p className="HelpText">Help</p>
                <img className="UserIcon" src={UserIcon} alt=""/>
                <p className="ProfileText">Profile</p>
            </div>

        )
    }
}
