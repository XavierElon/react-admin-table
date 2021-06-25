import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Constants from "../helpers/constants";
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
  margin: auto;
  margin: 50px auto;
  padding: 40px 32px;
`;

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      status: "pending",
    };
  }

  componentDidMount() {
    window["createForm"]();
  }

  render() {
    return (
      <div className="odx-form__container">
        <FormContainer>
            <h2 className="owt-content-new-request-form-text">
            <b>New Entry Form</b>
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
