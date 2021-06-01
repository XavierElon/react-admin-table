import React from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import { Form } from 'react-formio';
import './RequestForm.css'

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
  position: "absolute",
  width: "100%",
  height: "80px",
  backgroundColor: "#white",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
};

// const tableStyle = {
//   position: "absolute",
//   marginLeft: "auto",
//   marginRight: "auto",
//   width: "1080px",
//   height: "523px",
//   marginTop: "60px",
// };

export default class RequestForm extends React.Component {
  render() {
    return (
      <div style={appStyle} className="App">
        <div style={wrapperStyle} className="Content-Wrap">
          <div style={headerStyle} className="Header">
            <Header></Header>
          </div>
          <div className="DataTable">
              <Form src="https://webform-portal.iop.ohio.gov/authoring-owt/drftrequestform"/>
          </div>
          <Footer></Footer>
        </div>
      </div>
    );
  }
}
