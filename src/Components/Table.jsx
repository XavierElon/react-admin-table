import React, { Component, useState } from "react";
import { MDBDataTable, MDBTable, MDBTableHead } from "mdbreact";
import "./Table.css";
import SearchIcon from "../images/icn-search.png";
import FilterIcon from "../images/icn-filter.png";
import PlusButton from "../images/plus-button.png";
import SmallFilter from "../images/small-filter.png";
import styled from "styled-components";
import * as Badges from "./Badge";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import RequestDetails from "../pages/RequestDetails";

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
  z-index: 10;
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
  height: 100px;
`;

const linkStyle = `
  color: #700017;
  width: 150px;
  height: 28px;
  font-family: Source Sans Pro;
  font-size: 14px;
  text-decoration: none solid rgb(112, 0, 23);
  line-height: 28px;
  text-transform: capitalize;
`;

const types = ["New Requests", "Existing Entries"];

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

function getRow(id) {
  console.log("row");
  return <Link to={`/requestdetails/${id}`}></Link>;
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},

      isNewRequests: true,
      button1: {
        active: true,
        color: false,
      },
      button2: {
        active: false,
        color: true,
      },
    };

    this.handleClick = this.handleClick.bind(this);

    console.log(this.state.data);

    let data2 = {
      columns: [
        {
          label: "Resource No.",
          field: "number",
          sort: "asc",
          width: 200,
        },
        {
          label: "Resource Type",
          field: "type",
          sort: "asc",
          width: 200,
        },
        {
          label: "Resource Name",
          field: "name",
          sort: "asc",
          width: 270,
        },
        {
          label: "Offer Start Date",
          field: "startDate",
          sort: "asc",
          width: 100,
        },
        {
          label: "Offer End Date",
          field: "endDate",
          sort: "asc",
          width: 150,
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 170,
        },
      ],
      rows: [],
    };

    fetch(
      "https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission"
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result[0]._id);
        let length = result.length;
        for (let i = 0; i < length; i++) {
          let start = result[i].data.offerStartDate;
          let newStart = start.substr(0, start.length - 14);
          let end = result[i].data.offerExpirationDate;
          let newEnd = end.substr(0, end.length - 14);
          let status;
          let id = result[i]._id;
          let new_id = <Link to={`/requestdetails/${id}`}>${id}</Link>

          if (result[i].state === "submitted") {
            status = <Badges.BlueBadge>Pending Review</Badges.BlueBadge>;
          } else if (result[i].state === "approved") {
            status = <Badges.GreenBadge>Approved</Badges.GreenBadge>;
          } else if (result[i].state === "disabled") {
            status = <Badges.GreyBadge>Disabled</Badges.GreyBadge>;
          } else if (result[i].state === "denied") {
            status = <Badges.RedBadge>Denied</Badges.RedBadge>;
          }

          data2.rows.push({
            number: new_id,
            type: result[i].data.requestType,
            name: result[i].data.resourceName,
            startDate: newStart,
            endDate: newEnd,
            status: status,
            clickEvent: () => this.getRow(id),
          });
        }
      });
    this.setState((this.state.data = data2));
    console.log("this.state.data");
    console.log(this.state.data);
    console.log(data2);
  }

  getRow(id) {
    console.log(id);
    return <RequestDetails></RequestDetails>;
  }

  componentDidMount() {
    getRow();
  }

  handleClick() {
    console.log("handleClick");
    this.setState((prevState) => ({ isNewRequests: !prevState.isNewRequests }));
  }

  render() {
    console.log("in render");
    console.log(this.state.data);
    if (this.state.isNewRequests) {
      return (
        <div className="Table">
          <h2 className="admin-title">Admin Dashboard</h2>
          <div className="ToggleButtons">
            <ToggleGroup></ToggleGroup>
          </div>

          {/* <div className="Filter" onClick={this.filterMenu}></div>
          <img className="FilterIcon" src={FilterIcon} alt="" />
          <p className="FilterText">Filter</p> */}
          <Link to="/requestform">
            <p className="NewRequestText">new request</p>
            <img
              className="PlusButton"
              src={PlusButton}
              alt=""
              onClick={this.getNewEntries}
            />
          </Link>

          <img className="SmallFilter" id="filter1" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter2" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter3" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter4" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter5" src={SmallFilter} alt="" />
          <MDBDataTable
            bordered
            btn
            sortable
            noBottomColumns={true}
            entriesLabel=""
            data={this.state.data}
            infoLabel={["", "", "", ""]}
            entriesOptions={[]}
            paginationLabel={["<", ">"]}
          />
          <img className="SearchIcon" src={SearchIcon} alt="" />
        </div>
      );
    } else {
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
          <img className="SmallFilter" id="filter1" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter2" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter3" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter4" src={SmallFilter} alt="" />
          <img className="SmallFilter" id="filter5" src={SmallFilter} alt="" />
          <MDBDataTable
            bordered
            btn
            sortable
            noBottomColumns={true}
            entriesLabel=""
            data={this.state.data}
            infoLabel={["", "", "", ""]}
            entriesOptions={[]}
            paginationLabel={["<", ">"]}
          />
          <img className="SearchIcon" src={SearchIcon} alt="" />
        </div>
      );
    }
  }
}
