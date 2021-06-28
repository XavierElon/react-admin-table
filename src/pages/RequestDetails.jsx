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

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      status: "",
      url: Constants.DRFT_FORM_SUBMISSION_URL + this.props.match.params.id,
      approvedUrl: "requestapproved/" + this.props.match.params.id,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    let type
    window["formLoad"](`${this.state.id}`);
    await this.sleep(1000)
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      type = result.data.resourceType
    });
  }


  render() {
    return (
      <div className="container">
        <FormContainer>
          <h2 className="owt-content-new-entry-form-text">
            <b>Request #{this.state.id.toUpperCase()}</b>
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
