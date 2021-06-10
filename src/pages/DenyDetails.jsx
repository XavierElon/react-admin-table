import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";

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

const headerStyle = {
  position: "fixed",
  width: "100%",
  minWidth: "1440px",
  height: "80px",
  backgroundColor: "white",
  fill: "white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  zIndex: "1",
  flexGrow: "0",
};

const bodyStyle = {
  position: "absolute",
  left: "0%",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1",
};

const footerStyle = {
  flexGrow: "0",
};

const link1Style = {
  position: "absolute",
  top: "5rem",
  left: "15rem",
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
  position: "absolute",
  top: "90rem",
  left: "125rem",
  width: "112px",
  height: "36px",
  borderRadius: "4px",
  backgroundColor: "#700017",
  color: "white",
  fontSize: "14px",
  lineHeight: "32px",
  textAlign: "center",
  border: "0px",
};

const cancelStyle = {
  position: "absolute",
  top: "90rem",
  left: "113rem",
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
      id: this.props.match.params.id
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/${this.state.id}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        this.setState({
          deniedComment: result.data.deniedComment
        });
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log("value = " + value + " name = " + name);
    console.log(this.state.deniedComment)
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
      value: `${this.state.deniedComment}`
        }
    ]

    console.log(update);
    const response = await axios.patch(
      `https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform/submission/${this.state.id}`,
      update
    );
    console.log(response);
    this.props.history.push("/");
  }

  render() {
      console.log(this.state)
    return (
      <div style={appStyle}>
        <div style={headerStyle}>
        </div>
        <Grid>
          <div style={bodyStyle}>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Link to="/" style={link1Style}>
                <h5>Admin Dashboard</h5>
              </Link>
              <p style={slashStyle}> / </p>
              <Link to={`/requestdetails/${this.state.id}`} style={link2Style}>
                <h5>{this.state.id}</h5>
              </Link>
              <p style={titleStyle}>
                <b>Deny Details</b>
              </p>
              <TextField
                multiline
                rows="6"
                style={commentStyle}
                size="medium"
                label="Comment (Optional)"
                name="deniedComment"
                onChange={this.handleInputChange}
                variant="standard"
                value={this.state.deniedComment}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>
              <input
                style={submitStyle}
                type="submit"
                value="Save"
                onSubmit={this.handleSubmit}
              />
              <Link to="/">
                <div style={cancelStyle}>
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
