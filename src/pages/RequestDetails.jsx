import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default class RequestDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header></Header>
        <Footer></Footer>
      </div>
    );
  }
}
