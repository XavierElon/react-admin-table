import React from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import PlusButton from "../images/plus-button.png";
import styled from "styled-components";
import * as Badges from "./Badge";
import { Link } from "react-router-dom";
import Constants from "../helpers/constants";
import Grid from "@material-ui/core/Grid";

const Button1Active = styled("div")`
  width: 250px;
  height: 36px;
  background-color: #525051;
  stroke-width: 1;
  border-top-left-radius: 4px;
  color: white;
  text-align: center;
  border: 1px solid;
  // position: absolute;
  // top: -5rem;
  // left: 0rem;
  font-size: 18px;
  padding-top: 5px;
`;

const Button1Inactive = styled("div")`
  width: 250px;
  height: 36px;
  background-color: #f2f2f2;
  stroke-width: 1;
  border-top-left-radius: 4px;
  color: black;
  text-align: center;
  // position: absolute;
  // top: -5rem;
  // left: 0rem;
  font-size: 18px;
  padding-top: 5px;
  cursor: pointer;
`;

const Button2Active = styled("div")`
  width: 250px;
  height: 36px;
  background-color: #525051;
  stroke-width: 1;
  border-top-right-radius: 4px;
  color: white;
  text-align: center;
  // position: absolute;
  // top: 1.6rem;
  // left: 41rem;
  font-size: 18px;
  padding-top: 5px;
`;

const Button2Inactive = styled("div")`
  width: 250px;
  height: 36px;
  background-color: #f2f2f2;
  stroke-width: 1;
  border-top-right-radius: 4px;
  color: black;
  text-align: center;
  // position: absolute;
  // top: 1.6rem;
  // left: 41rem;
  font-size: 18px;
  padding-top: 5px;
  cursor: pointer;
`;

const badgeStyle = {
  paddingTop: ".6rem",
  textAlign: "center !important"
};

// function getRow(id) {
//   console.log("row");
//   return <Link to={`/requestdetails/${id}`}></Link>;
// }

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      data2: {},
      isLoading: true,
      active: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    let data = {
      columns: [
        {
          label: "Resource No.",
          field: "number",
          sort: "disabled",
          width: 180,
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
          sort: "disabled",
          width: 170,
        },
      ],
      rows: [],
    };

    let data2 = {
      columns: [
        {
          label: "Request No.",
          field: "number",
          sort: "disabled",
          width: 180,
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
          width: 300,
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
          sort: "disabled",
          width: 170,
        },
      ],
      rows: [],
    };

    const linkStyle = {
      color: "#3d7aa9",
      width: "150px",
      height: "28px",
      fontSize: "14px",
      lineHeight: "28px",
      textTransform: "uppercase",
      textDecoration: "underline"
    };

    try {
      const res = await fetch(
        `${Constants.DFRT_FORM_URL}?limit=${Constants.LIMIT_AMOUNT}`
      );
      const result = await res.json();
      let length = result.length;
      console.log(result);
      for (let i = 0; i < length; i++) {
        let newStart = "";
        let newEnd = "";

        let start = result[i].data.offerStartDate;
        if (start != null) {
          newStart = start.substr(0, start.length - 14);
        }

        let end = result[i].data.offerExpirationDate;
        if (end != null) {
          newEnd = end.substr(0, end.length - 14);
        }

        let status;
        let id = result[i]._id;
        let new_id = (
          <Link className="Link" style={linkStyle} to={`/requestdetails/${id}`}>
            {id}
          </Link>
        );

        if (result[i].data.status === "pending") {
          status = (
            <Badges.BlueBadge style={badgeStyle}>
              Pending Review
            </Badges.BlueBadge>
          );
        } else if (result[i].data.status === "approved") {
          status = (
            <Badges.GreenBadge style={badgeStyle}>Approved</Badges.GreenBadge>
          );
        } else if (result[i].data.status === "disabled") {
          status = (
            <Badges.GreyBadge style={badgeStyle}>Disabled</Badges.GreyBadge>
          );
        } else if (result[i].data.status === "denied") {
          status = <Badges.RedBadge style={badgeStyle}>Denied</Badges.RedBadge>;
        }
        data.rows.push({
          number: new_id,
          type: result[i].data.resourceType,
          name: result[i].data.resourceName,
          startDate: newStart,
          endDate: newEnd,
          status: status,
          // clickEvent: () => this.getRow(id),
        });

        if (result[i].data.status === "pending") {
          data2.rows.push({
            number: new_id,
            type: result[i].data.resourceType,
            name: result[i].data.resourceName,
            startDate: newStart,
            endDate: newEnd,
            status: status,
          });
        }
      }
      this.setState((this.state.data2 = data2));
      this.setState((this.state.data = data));
    } catch (error) {
      console.log(error);
    }
  }

  handleClick() {
    this.setState({ active: !this.state.active });
  }

  render() {
    if (this.state.active) {
      return (
        <div className="owt-main-content-table">
          <div className="owt-content-title-row">
            <span className="owt-content-admin-title-text">
              <h2 className="owt-content-admin-title">Admin Dashboard</h2>
            </span>
            <span>
              <Link to="/requestform">
                <span className="owt-content-plus-button">
                  <img
                    id="plus-button"
                    src={PlusButton}
                    alt=""
                    onClick={this.getNewEntries}
                  />
                </span>
                <div className="owt-content-request-text">
                  <p id="new-request-text">new request</p>
                </div>
              </Link>
            </span>
          </div>
          <span className="owt-content-buttons">
            <span className="owt-content-button1-active">
              <Button1Active>New Requests</Button1Active>
            </span>
            <span className="owt-content-button2-inactive">
              <Button2Inactive onClick={this.handleClick}>
                Existing Entries
              </Button2Inactive>
            </span>
          </span>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <div className="owt-content-table">
                <MDBDataTable
                  className="owt-content-datadata-table"
                  bordered
                  sortable
                  noBottomColumns={true}
                  entriesLabel=""
                  data={this.state.data2}
                  infoLabel={["", "", "", ""]}
                  entriesOptions={[]}
                  paginationLabel={["<", ">"]}
                />
              </div>
              <i class="fal fa-search" aria-hidden="true"></i>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="owt-main-content-table">
          <div className="owt-content-title-row">
            <span className="owt-content-admin-title-text">
              <h2 className="owt-content-admin-title">Admin Dashboard</h2>
            </span>
            <span>
              <Link to="/requestform">
                <span className="owt-content-plus-button">
                  <img
                    id="plus-button"
                    src={PlusButton}
                    alt=""
                    onClick={this.getNewEntries}
                  />
                </span>
                <div className="owt-content-request-text">
                  <p id="new-request-text">new request</p>
                </div>
              </Link>
            </span>
          </div>
          <span className="owt-content-buttons">
            <span className="owt-content-button1-active">
              <Button1Inactive onClick={this.handleClick}>
                New Requests
              </Button1Inactive>
            </span>
            <span className="owt-content-button2-inactive">
              <Button2Active>Existing Entries</Button2Active>
            </span>
          </span>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <div className="owt-content-table">
                <MDBDataTable
                  className="owt-content-datadata-table"
                  bordered
                  sortable
                  noBottomColumns={true}
                  entriesLabel=""
                  data={this.state.data}
                  infoLabel={["", "", "", ""]}
                  entriesOptions={[]}
                  paginationLabel={["<", ">"]}
                />
              </div>
              <i class="fal fa-search" aria-hidden="true"></i>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
