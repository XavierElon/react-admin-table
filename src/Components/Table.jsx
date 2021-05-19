import React, { Component, useState } from "react";
import { MDBDataTable, MDBBadge, MDBTable, MDBTableHead, MDBBtn } from "mdbreact";
import Button from 'react-bootstrap/Button'
import "./Table.css";
import SearchIcon from "../images/icn-search.png";
import FilterIcon from "../images/filter-icon.png"
import PlusButton from "../images/plus-button.png";
import SmallFilter from "../images/filter.png"
import styled from "styled-components";
import blueBadge from "./Badge"


let data = require("../test.json");
let new_data = JSON.parse(JSON.stringify(data))
let isNewRequests = true



const NewButton = styled.button`
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


const ButtonToggle = styled(NewButton)`
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
      data: this.data2,
      new_data:this.data2,
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

  data2 = {
    columns: [
          {
            'label': [<i key="Lorem" className="fa fa-leaf mr-2 blue-text" aria-hidden="true"></i>, 'Lorem'],
            field: "number",
            sort: "asc",
            width: 170,

          },
          {
            label: "Resource Type",
            field: "type",
            sort: "asc",
            width: 10
          },
          {
            label: "Resource Name",
            field: "name",
            sort: "asc",
            width: 270
          },
          {
            label: "Offer Start Date",
            field: "startDate",
            sort: "asc",
            width: 100
          },
          {
            label: "Offer End Date",
            field: "endDate",
            sort: "asc",
            width: 150
          },
          {
            label: "Status",
            field: "status",
            sort: "asc",
            width: 170
          }
        ],
        rows: [
          {
            number: "01234567890",
            type: "Donated Device",
            name: "Computer",
            startDate: "01/01/2021",
            endDate: "01/02/2021",
            status: <blueBadge>Pending Review</blueBadge>
          },
          {
            number: "123",
            type: "Donated Device",
            name: "Computer",
            startDate: "01/02/2021",
            endDate: "02/21/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "01234567801",
            type: "Donated Device",
            name: "Computer",
            startDate: "05/02/2021",
            endDate: "05/05/2021",
            status: <Button variant="danger">Denied</Button>
          },
          {
            number: "01234567826",
            type: "Digital Resource",
            name: "Computer",
            startDate: "05/01/2021",
            endDate: "05/06/2021",
            status: <Button variant="dark">Disabled</Button>
          },
          {
            number: "50129354238756",
            type: "Donated Device",
            name: "Laptop",
            startDate: "04/15/2021",
            endDate: "04/21/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "5287896407239",
            type: "Digital Resource",
            name: "Laptop",
            startDate: "04/17/2021",
            endDate: "05/01/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "12942137344",
            type: "Donated Device",
            name: "Laptop",
            startDate: "03/01/2021",
            endDate: "03/10/2021",
            status: <Button variant="primary">Pending Review</Button>
          },
          {
            number: "85235239853",
            type: "Donated Device",
            name: "Laptop",
            startDate: "02/09/2021",
            endDate: "02/14/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "95232349645",
            type: "Donated Device",
            name: "Laptop",
            startDate: "03/11/2021",
            endDate: "03/15/2021",
            status: <Button variant="primary">Pending Review</Button>
          },
          {
            number: "112414230",
            type: "Donated Device",
            name: "Router",
            startDate: "02/01/2021",
            endDate: "02/05/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "14232432641",
            type: "Donated Device",
            name: "Laptop",
            startDate: "12/31/2020",
            endDate: "01/01/2021",
            status: <Button variant="primary">Pending Review</Button>
          },
          {
            number: "12142357565",
            type: "Donated Device",
            name: "Router",
            startDate: "01/01/2021",
            endDate: "01/02/2021",
            status: <Button variant="primary">Pending Review</Button>
          },
          {
            number: "1353534568",
            type: "Donated Device",
            name: "Router",
            startDate: "12/21/2020",
            endDate: "01/02/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "14743567457",
            type: "Donated Devicer",
            name: "Router",
            startDate: "05/10/2021",
            endDate: "05/16/2021",
            status: <Button variant="primary">Pending Review</Button>
          },
          {
            number: "15543223265",
            type: "Digital Resource",
            name: "Phone",
            startDate: "05/01/2021",
            endDate: "05/03/2021",
            status: <Button variant="success">Approved</Button>
          },
          {
            number: "11426567986",
            type: "Donated Device",
            name: "Router",
            startDate: "03/14/2021",
            endDate: "03/24/2021",
            status: <Button variant="primary">Pending Review</Button>
          }
        ]
      }

  componentDidMount() {
    // this.newEntries();
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
    console.log(this.data2)
    console.log(this.state.button1.active)
    if (this.state.isNewRequests) {
      console.log("new")
      return (
        <div className="Table">
          <blueBadge/>
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
            <img className="FilterIcon" id="filter1" src={FilterIcon} alt=""/>
          <MDBDataTable
              bordered
              btn
              fixed
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
              btn
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
