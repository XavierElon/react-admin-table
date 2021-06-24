import React from "react";
import { Form } from "react-formio";
import { Link } from "react-router-dom";
import axios from "axios";
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

export default class TestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      status: "pending",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  async handleSubmit(event) {
    let ohid = window.portalUserID
    await this.sleep(1000);
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        this.setState({
            id: result[0]._id,
          });
      });
      console.log("id = " +this.state.id)
      await this.sleep(1000);
    let update = [
      {
        op: "replace",
        path: "/data/status",
        value: "pending",
      },
      {
        op: "replace",
        path: "/data/userOhid",
        value: {ohid}
      }
    ];
    const response = await axios.patch(
      `${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`,
      update
    );
    console.log(response);
    this.props.history.push("/");
  }



  render() {
    console.log("here");
    return (
      <main className="owt-content-main-body container">
        <article className="owt-content-form-page">
          <h2 className="owt-content-new-entry-form-text">
            <b>New Entry Form</b>
          </h2>
          <form noValidate autoComplete="off">
            <Form src={Constants.DRFT_FORM_URL} onSubmit={this.handleSubmit} />
            <Link to="/">
              <div style={cancelStyle} className="owt-content-cancel-button">
                <b>Cancel</b>
              </div>
            </Link>
          </form>
        </article>
      </main>
    );
  }
}
