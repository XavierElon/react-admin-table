import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import SearchIcon from '../images/icn-search.png'

const data = require('../test.json');


export default class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      data
     }
  }
  
  
  render() {
    console.log(this.state.data)
    return (
      <div className="Table">
        <MDBDataTable 
        bordered 
        large 
        noBottomColumns={true} 
        entriesLabel="" 
        data={this.state.data} 
        infoLabel={["","","",""]}
        entriesOptions={[]}  />
        <img className="SearchIcon" src={SearchIcon} alt="" />
      </div>
    );
  }
  
};

