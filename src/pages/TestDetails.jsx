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

export default class TestDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      status: "",
      url: Constants.DRFT_FORM_SUBMISSION_URL + this.props.match.params.id,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log(this.state.id);
  }

  componentDidMount() {
    console.log(this.state.url);
    fetch(`${Constants.DFRT_FORM_URL}/${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          status: result.data.status,
        });
      });

    console.log(this.state.status);
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
    await this.sleep(1000);
    fetch(`${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          status: result.data.status,
        });
      });
    console.log(this.state.status);
    let update;
    if (this.state.status === "deleted") {
      const response = await axios.delete(
        `${Constants.DRFT_FORM_SUBMISSION_URL}${this.state.id}`
      );
      console.log(response);
      await this.sleep(1000);
      this.props.history.push("/");
    }
        this.props.history.push("/");
    //   }
  }

  render() {
    return (
      <main className="owt-content-main-body container">
        <article className="owt-content-form-page">
          <h2 className="owt-content-new-entry-form-text">
            <b>New Entry Form</b>
          </h2>
          <form noValidate autoComplete="off">
            <Form src={this.state.url} onSubmit={this.handleSubmit} />
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
