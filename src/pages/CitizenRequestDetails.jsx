import React from "react";
import { Link } from "react-router-dom";
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
  margin-left: auto;
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
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    window["citizenFormLoad"](`${this.state.id}`);
    await this.sleep(1200);
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        let approve = document.getElementsByTagName("label");
        console.log(approve);
        let length = approve.length;
        console.log(length);
        for (let i = 0; i < length; i++) {
          console.log(approve[i].attributes);
          console.log(approve[i].attributes[0].nodeValue);
          let str = approve[i].attributes[0].nodeValue;
          let str2 = approve[i].attributes[0].nodeValue;
          str = str.substr(8);
          str2 = str2.substr(7);
          console.log(str2);
          console.log(str);
          if (
            str === "approved" ||
            str === "denied" ||
            str2 === "approved" ||
            str2 === "denied"
          ) {
            approve[i].style.display = "none";
          } else if (str === "disabled" ||
          str === "deleted" ||
          str2 === "disabled" ||
          str2 === "deleted") {
            approve[i].style.position='relative';
            approve[i].style.left='-4rem';
          }
        }
      });
    let ohid = document.getElementsByClassName("formio-component-userOhid");
    ohid[0].style.display = "none";
  }

  render() {
    return (
      <div className="odx-form__container container">
        <FormContainer>
          <h3 className="owt-content-citizen-entry-form-text">
            <b>Request #{this.state.id}</b>
          </h3>
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
