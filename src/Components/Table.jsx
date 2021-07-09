import React from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import styled from "styled-components";
import * as Badges from "./Badge";
import { Link } from "react-router-dom";
import Constants from "../helpers/constants";
import Grid from "@material-ui/core/Grid";
import MobileTable from "./MobileTable";
import MobileTablePending from "./MobileTablePending"


const Button1Active = styled("div")`
  width: 250px;
  height: 36px;
  background-color: #525051;
  stroke-width: 1;
  border-top-left-radius: 4px;
  color: white;
  text-align: center;
  border: 1px solid;
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
  font-size: 18px;
  padding-top: 5px;
  cursor: pointer;
`;

const badgeStyle = {
  paddingTop: ".6rem",
  textAlign: "center !important",
};

const FormContainer = styled.div`
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

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

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async componentWillMount() {
    let data = {
      columns: [
        {
          label: "Request No.",
          field: "number",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Resource Type",
          field: "type",
          sort: "asc",
          width: 150,
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

    let data2 = {
      columns: [
        {
          label: "Request No.",
          field: "number",
          sort: "disabled",
          width: 150,
        },
        {
          label: "Resource Type",
          field: "type",
          sort: "asc",
          width: 150,
        },
        {
          label: "Resource Name",
          field: "name",
          sort: "asc",
          width: 150,
        },
        {
          label: "Offer Start Date",
          field: "startDate",
          sort: "asc",
          width: 150,
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
          width: 150,
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
      textDecoration: "underline !important",
    };
    let length;
    try {
      const res = await fetch(
        `${Constants.DRFT_FORM_SUBMISSION_URL_NO_SLASH}?limit=${Constants.LIMIT_AMOUNT}`
      );
      const result = await res.json();
      length = result.length;
      for (let i = 0; i < length; i++) {
        let newStart = "";
        let newEnd = "";
        let resource_type;
        let cap_name = result[i].data.resourceName;
        cap_name = cap_name.charAt(0).toUpperCase() + cap_name.slice(1);

        if (result[i].data.resourceType === "serviceDeals") {
          resource_type = "Service Deals";
        } else if (result[i].data.resourceType === "digitalResources") {
          resource_type = "Digital Resources";
        } else if (result[i].data.resourceType === "donateDevices") {
          resource_type = "Donate Devices";
        }

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
        if (
          result[i].data.status === "approved" ||
          result[i].data.status === "disabled" ||
          result[i].data.status === "denied"
        ) {
          data.rows.push({
            number: new_id,
            type: resource_type,
            name: cap_name,
            startDate: newStart,
            endDate: newEnd,
            status: status,
            // clickEvent: () => this.getRow(id),
          });
        }

        if (result[i].data.status === "pending") {
          data2.rows.push({
            number: new_id,
            type: resource_type,
            name: cap_name,
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
    let new_rows = this.state.data.rows
    if (this.state.active && new_rows) {
      return (
        <div className="owt-main-content-table">
          <FormContainer>
            <div className="owt-content-title-row">
              <span className="owt-content-admin-title-text">
                <h1 className="owt-content-admin-title">Admin Dashboard</h1>
              </span>
              <span className="owt-content-new-form-div">
                <span className="owt-content-plus-button">
                  <Link to="/requestform">
                    <i className="fas fa-plus" aria-hidden="true"></i>
                  </Link>
                </span>
                <Link to="/requestform">
                  <div className="owt-content-request-text">
                    <p id="new-request-text">new request</p>
                  </div>
                </Link>
              </span>
            </div>
            <span className="owt-content-buttons">
              <span className="owt-content-button1-active" tabIndex="0" description="new-requests">
                <Button1Active>New Requests</Button1Active>
              </span>
              <span className="owt-content-button2-inactive" tabIndex="0" description="existing-entries">
                <Button2Inactive onClick={this.handleClick}>
                  Existing Entries
                </Button2Inactive>
              </span>
            </span>
            <i
              className="fa fa-search owt-content-existing-entries-magnifying-glass"
              aria-hidden="true"
            ></i>
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
                    small
                    maxHeight="500px"
                    entries={25}
                    noBottomColumns={true}
                    entriesLabel=""
                    data={this.state.data2}
                    infoLabel={["", "", "", ""]}
                    entriesOptions={[]}
                    paginationLabel={["<", ">"]}
                  />
                </div>
              </Grid>
            </Grid>
           <React.Fragment>
              <MobileTablePending></MobileTablePending>
           </React.Fragment>
          </FormContainer>
        </div>
      );
    } else {
      return (
        <div className="owt-main-content-table">
          <div className="owt-content-title-row">
            <span className="owt-content-admin-title-text">
              <h1 className="owt-content-admin-title">Admin Dashboard</h1>
            </span>
            <span className="owt-content-new-form-div">
              <span className="owt-content-plus-button">
                <Link to="/requestform">
                  <i class="fas fa-plus" aria-hidden="true"></i>
                </Link>
              </span>
              <div className="owt-content-request-text">
                <Link to="/requestform">
                  <p id="new-request-text">new request</p>
                </Link>
              </div>
            </span>
          </div>
          <span className="owt-content-buttons">
            <span className="owt-content-button1-active" tabIndex="0" description="new-requests"> 
              <Button1Inactive onClick={this.handleClick}>
                New Requests
              </Button1Inactive>
            </span>
            <span className="owt-content-button2-inactive" tabIndex="0" description="existing-entries">
              <Button2Active>Existing Entries</Button2Active>
            </span>
          </span>
          <i
            className="fa fa-search owt-content-new-entries-magnifying-glass"
            aria-hidden="true"
          ></i>
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
                  entries={25}
                  noBottomColumns={true}
                  entriesLabel=""
                  data={this.state.data}
                  infoLabel={["", "", "", ""]}
                  entriesOptions={[]}
                  paginationLabel={["<", ">"]}
                />
              </div>
            </Grid>
          </Grid>
          <React.Fragment>
              <MobileTable></MobileTable>
           </React.Fragment>
        </div>
      );
    }
  }
}
