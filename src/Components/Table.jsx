import React, { Component, useState } from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import SearchIcon from "../images/icn-search.png";
import FilterIcon from "../images/filter.png"
import PlusButton from "../images/plus-button.png";
import SmallFilter from "../images/filter.png"
import styled from "styled-components";


let data = require("../test.json");
let new_data = JSON.parse(JSON.stringify(data))
let isNewRequests = true

const Button = styled.button`
  background: grey;
  color: white;
  font-size: 12px;
  // padding: 10px 60px;
  width: 163px;
  height: 30px;
  border-radius: 5px;
  border-color: white;
  margin: 100px -1px;
  cursor: pointer;
  z-index:10;
`;


const ButtonToggle = styled(Button)`
  background: #f2f2f2;
  color: black;
  ${({ active }) =>
    active &&
    `
    background: #000000;
    color: #FFFFFF;
  `}
`;

const ButtonGroup = styled.div`
  display: flex;
`;

const types = ["New Requests", "Existing Entries"];

function SetData(types,type) {
  
}

function ToggleGroup() {
  const [active, setActive] = useState(types[0]);
  return (
    <ButtonGroup>
      {types.map((type) => (
        <ButtonToggle
          dat={type === type[1]}
          key={type}
          active={active === type}
          onClick={() => setActive(type)}
        >
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}



export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: data,
      new_data:new_data,
      isNewRequests: true,
      button1: {
        active: true,
        color: false,
      },
      button2: {
        active: false,
        color:true,
      },
      
    };

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.newEntries();
  }

  newEntries() {
    console.log(this.state.button1)
    console.log(data)
    console.log(new_data)
    let length = new_data.rows.length
    for (let i = 0; i < length; i++) {
      if (new_data.rows[i].status !== "Pending") {
        delete new_data.rows[i]
      }
    }
    console.log("new_data")
    console.log(new_data)
    console.log(this.state.new_data)
  }
  
  handleClick() {
    console.log("handleClick")
    this.setState(prevState => ({ isNewRequests: !prevState.isNewRequests }));
    }

  render() {
    // console.log(this.state.isNewRequests)
    console.log(this.state.button1.active)
    if (this.state.isNewRequests) {
      console.log("new")
      return (
        <div className="Table">
          <h2 className="admin-title">Admin Dashboard</h2>
          <div className="ToggleButtons"  onClick={this.handleClick}>
            <ToggleGroup></ToggleGroup>
            
          </div>
          <img
            className="PlusButton"
            src={PlusButton}
            alt=""
            onClick={this.getNewEntries}
          />
          <p className="NewRequestText" onClick={this.newEntries}>
            new request
          </p>
          <div className ="DataTable">
          <MDBDataTable
              bordered
              sortable
              noBottomColumns={true}
              entriesLabel=""
              data={this.state.new_data}
              infoLabel={["", "", "", ""]}
              entriesOptions={[]}
              paginationLabel={["<",">"]}
            />
          </div>
            <img className="SearchIcon" src={SearchIcon} alt="" />
        </div>
      )
    } else {
      console.log("old")
      return (
        <div className="Table">
          <h2 className="admin-title">Admin Dashboard</h2>
          <div className="ToggleButtons" onClick={this.handleClick}>
            <ToggleGroup></ToggleGroup>
          </div>
          <img
            className="PlusButton"
            src={PlusButton}
            alt=""
            onclick={this.getNewEntries}
          />
          <p className="NewRequestText" onclick={this.newEntries}>
            new request
          </p>
          <div className ="DataTable">
          <MDBDataTable
              bordered
              sortable
              noBottomColumns={true}
              entriesLabel=""
              data={this.state.data}
              infoLabel={["", "", "", ""]}
              entriesOptions={[]}
              paginationLabel={["<",">"]}
            />
          </div>
            <img className="SearchIcon" src={SearchIcon} alt="" />
        </div>
      )
    }
  }
}
