import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Constants from "../helpers/constants";

const cancelStyle = {
  width: "70px",
  height: "34px",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "black",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  cursor: "pointer",
};

const FormContainer = styled.div`
  max-width: 1080px;
  margin-left:auto;
  margin-right: auto;
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

export default class CitizenRequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id.toUpperCase(),
      status: "",
      url: Constants.DRFT_FORM_SUBMISSION_URL + this.props.match.params.id,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state.id);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    window["citizenFormLoad"](`${this.state.id}`);
    await this.sleep(1000)
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      let type = result.data.resourceType
      let approve = document.getElementsByTagName("label")
      console.log(approve)
      if (type === "serviceDeals") {
        console.log("service deals")
        approve[19].style.display='none'
        approve[20].style.display='none'
      } else if (type === "digitalResources") {
        console.log("digital resources")
        approve[23].style.display='none'
        approve[24].style.display='none'
      } else if (type === "donateDevices") {
        console.log("donate devices")
        approve[20].style.display='none'
        approve[21].style.display='none'
      }
    });
    let ohid = document.getElementsByClassName("formio-component-userOhid")
    ohid[0].style.display='none'
  }

  render() {
    return (
      <div className="odx-form__container">
        <FormContainer>
          <h2 className="owt-content-citizen-entry-form-text">
            <b>Request #{this.state.id}</b>
          </h2>
          <div id="requestor-formio"></div>
          <Link to="/">
            <div style={cancelStyle} className="owt-content-cancel-button">
              <b>Cancel</b>
            </div>
          </Link>
        </FormContainer>
      </div>
    );
  }
}
