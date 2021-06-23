import React from "react";
import { Form } from "react-formio";
import "date-fns";
import axios from "axios";
import Constants from "../helpers/constants";
import $ from 'jquery'

export default class TestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      status: "pending",
      url:
        Constants.DRFT_FORM_SUBMISSION_URL +
        this.props.match.params.id,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state.id)
  }

  componentDidMount() {
    
  }

  handleInputChange = (event) => {
    console.log(event);
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
    event.preventDefault();
    if (this.state.status === "deleted") {
      const response = await axios.delete(
        `${Constants.DFRT_FORM_URL}/${this.state.id}`
      );
      console.log(response);
      await this.sleep(1000);
      this.props.history.push("/");
    }

    if (this.state.status !== "deleted") {
      console.log("status = " + this.state.status);

      if (this.state.status === "approved") {
        this.props.history.push(`/requestapproved/${this.state.id}`);
      } else if (this.state.status === "denied") {
        this.props.history.push(`/denydetails/${this.state.id}`);
      } else {
        this.props.history.push("/");
      }
    }
  }

  render() {
     console.log("details")
    return (
      <main className="owt-content-main-body container">
        <article className="owt-content-form-page">
          <h2 className="owt-content-new-entry-form-text">
            <b>New Entry Form</b>
          </h2>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Form src={this.state.url} />
          </form>
        </article>
      </main>
    );
  }
}
