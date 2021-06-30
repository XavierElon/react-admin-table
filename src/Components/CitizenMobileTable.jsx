import React from "react";
import Constants from "../helpers/constants";
import { Link } from "react-router-dom";
import * as Badges from "./Badge";

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

export default class CitizenMobileTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ohid: window.portalUserID,
    };
    this.deleteId = this.deleteId.bind(this);
  }

  async componentDidMount() {
    let length;
    let data = [];

    try {
      const res = await fetch(
        `${Constants.DRFT_FORM_SUBMISSION_URL_NO_SLASH}?limit=${Constants.LIMIT_AMOUNT}`
      );
      const result = await res.json();
      console.log("result");
      console.log(result);
      length = result.length;

      for (let i = 0; i < length; i++) {
        if (result[i].data.userOhid === this.state.ohid) {
          let new_name = result[i].data.resourceName;
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
            status = (
              <Badges.RedBadge style={badgeStyle}>Denied</Badges.RedBadge>
            );
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  deleteId(id) {
    console.log(id);
    console.log("clicked");
  }

  render() {
    console.log("data");
    console.log(this.state.data);
    return (
      <div className="mobile-admin-table">
        {this.state.data.map((person, index) => (
          <div>
            <p className="mobile-admin-request-number">Request No.</p>
            <p key={index} classNam="owt-content-admin-mobile-id">
              <Link
                className="Link"
                style={linkStyle}
                to={`/citizenrequestdetails/${person.number}`}
              >
                {person.number}
              </Link>
            </p>
            <p className="mobile-admin-status-text">Status</p>
            <p key={index}>{person.status}</p>
            <p className="mobile-admin-resource-name-text">Resource Name </p>
            <p className="mobile-admin-resource-name" key={index}>
              {person.name}
            </p>
            <Link
              className="mobile-admin-edit"
              to={`/requestdetails/${person.number}`}
            >
              <i class="fas fa-edit">edit</i>
            </Link>
            <br></br>
            <i class="far fa-trash-alt mobile-admin-delete">delete</i>
            <div className="div-line"></div>
          </div>
        ))}
      </div>
    );
  }
}
