import React from "react";
import Constants from "../helpers/constants";
import { Link } from "react-router-dom";
import * as Badges from "./Badge";
import axios from 'axios'

const linkStyle = {
  color: "#3d7aa9",
  width: "150px",
  height: "28px",
  fontSize: "14px",
  lineHeight: "28px",
  textTransform: "uppercase",
  textDecoration: "underline !important",
};

const badgeStyle = {
    paddingTop: ".6rem",
    textAlign: "center !important",
  };

export default class MobileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.deleteId = this.deleteId.bind(this)
  }


  async componentDidMount() {
    // fetch(
    //   `${Constants.DRFT_FORM_SUBMISSION_URL_NO_SLASH}?limit=${Constants.LIMIT_AMOUNT}`
    // )
    //   .then((result) => result.json())
    //   .then((res) => this.setState({ data: res }));
    let length;
    let data = []
    try {
      const res = await fetch(
        `${Constants.DRFT_FORM_SUBMISSION_URL_NO_SLASH}?limit=${Constants.LIMIT_AMOUNT}`
      );
      const result = await res.json();
      length = result.length;

      for (let i = 0; i < length; i++) {
        let new_name = result[i].data.resourceName

        let status;
        let id = result[i]._id;

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
          data.push({
            number: id,
            name: new_name,
            status: status,
          });
        }
      }
      this.setState((this.state.data = data));
    } catch (error) {
      console.log(error);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async DeleteId(id) {
    const response = axios.delete(`${Constants.DRFT_FORM_SUBMISSION_URL}${id}`);
    await this.sleep(1000);
    window.location.reload();
  }

  render() {
      console.log("data")
    console.log(this.state.data);
    return (
        <div className="mobile-admin-table">
        {this.state.data.map((person, index) => (
          <div className="container">
            <div className="row">
              <div className="col-xs-5 col-sm-4">
                <p className="mobile-admin-request-number">Request No.</p>
              </div>
              <div className="col-xs-7 col-sm-4">
                <p key={index} classNam="owt-content-admin-mobile-id">
                  <Link
                    className="owt-content-admin-id-link"
                    style={linkStyle}
                    to={`/requestdetails/${person.number}`}
                  >
                    {person.number}
                  </Link>
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-5 col-sm-4">
                <p className="mobile-admin-status-text">Status</p>
              </div>
              <div className="col-xs-7 col-sm-4">
                <p className="mobile-admin-status" key={index}>
                  {person.status}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-5 col-sm-4">
                <p className="mobile-admin-resource-name-text">
                  Resource Name{" "}
                </p>
              </div>
              <div className="col-xs-7 col-sm-4">
                <p className="mobile-admin-resource-name" key={index}>
                  {person.name}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-2 col-sm-4">
                <Link
                  className="mobile-admin-edit"
                  to={`/requestdetails/${person.number}`}
                >
                  <i class="fas fa-edit">edit</i>
                </Link>
              </div>
              <div className="col-xs-2 col-sm-4">
                <i class="far fa-trash-alt mobile-admin-delete" onClick={() => this.DeleteId(person.number)}>delete</i>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
