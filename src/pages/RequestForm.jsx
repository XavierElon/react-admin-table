import React from "react";
import { Link } from "react-router-dom";
// import Constants from "../helpers/constants";
import styled from 'styled-components'

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

export default class RequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      status: "pending",
    };
    
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async componentDidMount() {
    window["createForm"]();
    await this.sleep(800)
    let ohid = document.getElementsByClassName("formio-component-userOhid")
    ohid[0].style.display='none'
    let status = document.getElementsByClassName("formio-component-status")
    status[0].style.display='none'
  }

  render() {
    
    return (
      <div className="container">
        <FormContainer>
            <h3 className="owt-content-new-request-form-text">
            <b>New Entry Form</b>
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
