import React from 'react'
import './Header.css'
import Logo from '../images/ohio_logo.png'
import Bar from '../images/Path.svg'

export default class Header extends React.Component {
    render() {

        return (
            <div className="Header">
                <img className="Logo" src={Logo} alt="" />
                <img className="Bar" src={Bar} alt="" />
                <p className="Title">Office of Workforce Transforamtion</p>
            </div>

        )
    }
}
