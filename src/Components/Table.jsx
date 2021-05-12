import React, { Component, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import SearchIcon from '../images/icn-search.png'
import PlusButton from '../images/plus-button.png'
import styled from 'styled-components'

const data = require('../test.json');


const Button = styled.button `
    background-color: #F2F2F2;
    color: #000000;
    font-size: 12px;
    // padding: 10px 60px;
    width: 163px;
    height: 30px;
    border-radius: 5px;
    left: 50px;
    // margin: 10px 0px;
    cursor: pointer;

`

const ButtonToggle = styled(Button) `
  background: white;
  ${({ active }) => 
  active &&
`
 background: black;
`
}
`

const types = ['New Requests', 'Existing Listings']

function ToggleButton() {
    const [active, setActive] = useState(types[0])
    return <div>
      {types.map(type => (
        <ButtonToggle
        active={active === type}
        onCLick={() => setActive(type)}
        >{type}</ButtonToggle>
      ))}
    </div>
}

export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      data
     }
  }
  
  
  render() {
    console.log(this.state.data)
    return (
      <div className="Table">
        <h2 className="admin-title">Admin Dashboard</h2>
        <ToggleButton className="ToggleButtons"></ToggleButton>
        <img className="PlusButton" src={PlusButton} alt="" onclick={this.newRequest}/>
        <p className="NewRequestText" onclick={this.newRequest}>new request</p>
        <MDBDataTable 
        bordered 
        large 
        noBottomColumns={true} 
        entriesLabel="" 
        data={this.state.data} 
        infoLabel={["","","",""]}
        entriesOptions={[]}  />
        <img className="SearchIcon" src={SearchIcon} alt="" />
      </div>
    );
  }
  
};

