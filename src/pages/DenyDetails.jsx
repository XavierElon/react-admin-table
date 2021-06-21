import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Constants from "../helpers/constants";
import Grid from "@material-ui/core/Grid";

const appStyle = {
  textAlign: "center",
  width: "100%",
  height: "1080px",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "auto",
  paddingBottom: "72px",
  flexDirection: "column",
  display: "flex",
};

const bodyStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1",
};

const link1Style = {
  color: "#700017",
  width: "150px",
  height: "28px",
  fontSize: "14px",
  lineHeight: "28px",
  textTransform: "uppercase",
};

const link2Style = {
  position: "absolute",
  top: "5rem",
  left: "32rem",
  color: "#700017",
  width: "150px",
  height: "28px",
  fontSize: "14px",
  lineHeight: "28px",
  textTransform: "uppercase",
};

const slashStyle = {
  position: "absolute",
  top: "5rem",
  left: "30rem",
};

const titleStyle = {
  position: "absolute",
  top: "8.5rem",
  left: "16rem",
  width: "100px",
  height: "20px",
  fontSize: "18px",
  color: "#222222",
};

const commentStyle = {
  width: "550px",
  position: "absolute",
  top: "13rem",
  left: "17rem",
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
    this.props.history.push("/");
  }

  render() {
    console.log(this.state);
    return (
      <div style={appStyle} className="owt-content-main-body">
        <Grid>
          <div style={bodyStyle}>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Link to="/" style={link1Style}>
                <p className="owt-content-deny-admin-dash-text">
                  Admin Dashboard
                </p>
              </Link>
              <p style={slashStyle} className="owt-content-deny-slash-div">
                {" "}
                /{" "}
              </p>
              <Link to={`/requestdetails/${this.state.id}`} style={link2Style}>
                <p>{this.state.id}</p>
              </Link>
              <p style={titleStyle} className="owt-content-deny-details-text">
                <b>Deny Details</b>
              </p>
              <TextField
                className="owt-content-deny-details-textfield"
                multiline
                rows="5"
                style={commentStyle}
                size="medium"
                name="deniedComment"
                onChange={this.handleInputChange}
                variant="outlined"
                value={this.state.deniedComment}
              ></TextField>
              <input
                className="owt-content-deny-submit-button"
                style={submitStyle}
                type="submit"
                value="Save"
                onSubmit={this.handleSubmit}
              />
              <Link to="/">
                <div
                  style={cancelStyle}
                  className="owt-content-deny-cancel-button"
                >
                  <b>Cancel</b>
                </div>
              </Link>
            </form>
          </div>
        </Grid>
      </div>
    );
  }
}
