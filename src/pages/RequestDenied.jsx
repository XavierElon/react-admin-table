import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Table from "../Components/Table";
import Modal  from "../Components/Modal";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

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

const headerStyle = {
  position: "fixed",
  width: "100%",
  minWidth: "1440px",
  height: "80px",
  backgroundColor: "white",
  fill: "white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  zIndex: "1",
  flexGrow: "0"
};

const bodyStyle = {
  position: "absolute",
  left: "0%",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1"
};

const footerStyle = {
  flexGrow: "0"
}

export default class RequestDenied extends React.Component {
  constructor(props) {
      super(props)
      console.log(this.props.match.params.id)
        this.state = {
            id: this.props.match.params.id
        }
  }
  
  render () {
    return (
        <div style={appStyle}>
            <div style={headerStyle}>
              <Header></Header>
            </div>
            <Grid>
              <div style={bodyStyle}>
                  <Modal color="red" id={this.state.id}></Modal>
                <Table></Table>
              </div>
            </Grid>
            <Footer style={footerStyle}></Footer>
        </div>
      );
  }

  
}