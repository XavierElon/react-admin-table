import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Table from "../Components/Table";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

const appStyle = {
  textAlign: "center",
  width: "100%",
  height: "774px",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "auto",
  paddingBottom: "72px",
};

const wrapperStyle = {
  paddingBottom: "72px",
};

const headerStyle = {
  position: "fixed",
  width: "100%",
  minWidth: "1440px",
  height: "80px",
  backgroundColor: "white",
  fill: "white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  zIndex: "1"
};

const tableStyle = {
  position: "absolute",
  left: "50px",
  marginLeft: "auto",
  marginRight: "auto",
  width: "1080px",
  height: "523px",
  marginTop: "60px",
};

export default class Dashboard extends React.Component {
  render() {
    return (
      <div style={appStyle} className="App">
        <div style={wrapperStyle} className="Content-Wrap">
          <div style={headerStyle} className="Header">
            <Header></Header>
          </div>
          <Grid>
            <div style={tableStyle} className="DataTable">
              <Table></Table>
            </div>
          </Grid>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
