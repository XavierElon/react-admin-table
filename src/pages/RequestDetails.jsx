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
  margin: auto;
  margin: 50px auto;
  padding: 40px 32px;
`;

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id.toUpperCase(),
      status: "",
      url: Constants.DRFT_FORM_SUBMISSION_URL + this.props.match.params.id,
      approvedUrl: "requestapproved/" + this.props.match.params.id,
    };

    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window["formLoad"](`${this.state.id}`);
    // fetch(`${Constants.DFRT_FORM_URL}/${this.state.id}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     this.setState({
    //       status: result.data.status,
    //     });
    //   });

    // console.log(this.state.status);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // async handleSubmit(event) {
  //   await this.sleep(1000);
  //   fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //       this.setState({
  //         status: result.data.status,
  //       });
  //     });
  //   await this.sleep(1000);
  //   console.log("status = " + this.state.status);
  //   if (this.state.status === "deleted") {
  //     const response = await axios.delete(
  //       `${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`
  //     );
  //     console.log(response);
  //     await this.sleep(1000);
  //     this.props.history.push("/");
  //   } else if (this.state.status === "approved") {
  //     this.props.history.push(`/requestapproved/${this.state.id}`);
  //   } else if (this.state.status === "denied") {
  //     this.props.history.push(`/denydetails/${this.state.id}`);
  //   } else {
  //       this.props.history.push("/");
  //   }
  // }

  render() {
    return (
      <div>
        <FormContainer>
          <h2 className="owt-content-new-entry-form-text">
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
