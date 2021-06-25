import React from "react";
import Table from "../Components/Table";
import Modal from "../Components/Modal";
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
  display: "flex"
};

const bodyStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1"
};

export default class RequestDenied extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id.toUpperCase(),
    };
  }

  render() {
    return (
      <div style={appStyle}>
        <Grid>
          <div style={bodyStyle}>
            <Modal
              className="owt-content-red-modal"
              color="red"
              id={this.state.id}
            ></Modal>
            <Table></Table>
          </div>
        </Grid>
      </div>
    );
  }
}
