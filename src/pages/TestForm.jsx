import React from "react";
import { Form } from "react-formio";
import { Link } from "react-router-dom";
import axios from "axios";
import "./RequestForm.css";
import Constants from "../helpers/constants";
import $ from "jquery";

const submitStyle = {
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "#1672B5",
  color: "white",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  border: "0px",
};

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

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $("#eqj3zes").css("display", "none !important");
    $(".owt-content-new-entry-form-text").css("display", "none !important");
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("value = " + value + " name = " + name);
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  };

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async handleSubmit(event) {
    let id;
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
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
    ];
    const response = await axios.patch(
      `${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`,
      update
    );
    console.log(response);
    this.props.history.push("/");
  }

  handleChange(event) {
    console.log("here");
    console.log(event.target.value);
    this.setState({ value: event.target.value });
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
