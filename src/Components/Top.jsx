import React from 'react'
import './Top.css'
import PlusButton from '../images/plus-button.png'
import styled from 'styled-components'

const Button = styled.button `
    background-color: white;
    color: #000000;
    font-size: 12px;
    // padding: 10px 60px;
    width: 163px;
    height: 30px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
`

function setActive() {
    console.log("penis")
}


export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.setActive.bind(this);
    }


    setActive = event => {
        console.log("selected")
    }

    render() {

        return (
            <div className="wrapper">
                <h2 id="admin-title">Admin Dashboard</h2>
                <Button onclick={setActive} className="NewRequestsText">New Requests</Button>
                <Button className="ExistingListingsText">Existing Listings</Button>
                <img className="PlusButton" src={PlusButton} alt="" onclick/>
                <p className="NewRequestText">new request</p>
            </div>
            

        )
    }
}
