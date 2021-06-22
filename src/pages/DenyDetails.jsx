import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Constants from "../helpers/constants";
import Grid from "@material-ui/core/Grid";

const commentStyle = {
  width: "550px",
};

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
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "black",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  cursor: "pointer",
};

export default class DenyDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.match.params.id);
    this.state = {
      id: this.props.match.params.id,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`${Constants.DFRT_FORM_URL}/${this.state.id}`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          deniedComment: result.data.deniedComment,
        });
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("value = " + value + " name = " + name);
    console.log(this.state.deniedComment);
    this.setState({
      [name]: value,
    });
  };

  async handleSubmit(event) {
    event.preventDefault();

    const update = [
      {
        op: "replace",
        path: "/data/deniedComment",
        value: `${this.state.deniedComment}`,
      },
    ];

    console.log(update);
    const response = await axios.patch(
      `${Constants.DFRT_FORM_URL}/${this.state.id}`,
      update
    );
    console.log(response);
    this.props.history.push(`/requestdenied/${this.state.id}`);
  }

  render() {
    console.log(this.state);
    return (
      <div className="owt-content-main-body">
        <Grid>
          <div className="owt-content-deny-comment-main-body container">
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-sm-3">
                  <Link to="/">
                    <span className="owt-content-deny-admin-dash-text">
                      Admin Dashboard
                    </span>
                  </Link>
                </div>
                <div className="col-sm-1">
                  <span>
                    <p className="owt-content-deny-slash-div"> / </p>
                  </span>
                </div>
                <div className="col-sm-3">
                  <span>
                      <span className="owt-content-deny-request-id">
                        <p>Request #</p>
                        <p className="owt-content-deny-id-link">
                          {this.state.id}
                        </p>
                      </span>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3">
                  <span>
                    <p className="owt-content-deny-details-text">
                      Deny Details
                    </p>
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-3">
                  <span>
                    <p className="owt-content-deny-comment-label">
                      Comment (Optional)
                    </p>
                  </span>
                </div>
                <div className="col-sm-3">
                  <span className="owt-content-deny-details-textfield">
                    <TextField
                      multiline
                      rows="5"
                      style={commentStyle}
                      size="medium"
                      name="deniedComment"
                      onChange={this.handleInputChange}
                      variant="outlined"
                      value={this.state.deniedComment}
                    ></TextField>
                  </span>
                </div>
              </div>

              <div className="row owt-content deny-submit-cancel-buttons">
                <div className="col-sm-1">
                  <Link to="/">
                    <div
                      style={cancelStyle}
                      className="owt-content-deny-cancel-button"
                    >
                      <b>Cancel</b>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-1">
                  <input
                    style={submitStyle}
                    className="owt-content-deny-submit-button"
                    type="submit"
                    value="Save"
                    onSubmit={this.handleSubmit}
                  />
                </div>
              </div>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
}
