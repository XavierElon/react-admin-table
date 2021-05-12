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
    console.log("empty")
}



export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    newRequest() {
        console.log("empty")
    }

    render() {

        return (
            <div className="wrapper">
                <h2 className="admin-title">Admin Dashboard</h2>
                <Button onClick={setActive} className="NewRequestsButton">New Requests</Button>
                <Button onClick={setActive} className="ExistingListingsButton">Existing Listings</Button>
                <img className="PlusButton" src={PlusButton} alt="" onclick={this.newRequest}/>
                <p className="NewRequestText" onclick={this.newRequest}>new request</p>
            </div>
            

        )
    }
}
