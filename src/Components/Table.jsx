import React, { Component } from "react";
import { MDBDataTable } from "mdbreact";
import "./Table.css";
import SearchIcon from '../images/icn-search.png'

const data = require('../test.json');

const DatatablePstartendDate = () => {
  // const data = {
  //   columns: [
  //     {
  //       label: "Request No",
  //       field: "number",
  //       sort: "asc",
  //       width: 170,
  //     },
  //     {
  //       label: "Resource Type",
  //       field: "type",
  //       sort: "asc",
  //       width: 10,
  //     },
  //     {
  //       label: "Resource Name",
  //       field: "name",
  //       sort: "asc",
  //       width: 270,
  //     },
  //     {
  //       label: "Offer Start Date",
  //       field: "startDate",
  //       sort: "asc",
  //       width: 100,
  //     },
  //     {
  //       label: "Offer End Date",
  //       field: "endDate",
  //       sort: "asc",
  //       width: 150,
  //     },
  //     {
  //       label: "Status",
  //       field: "status",
  //       sort: "asc",
  //       width: 170,
  //     },
  //   ],
  //   rows: [
  //     {
  //       number: "1",
  //       type: "Donated Device",
  //       name: "Computer",
  //       startDate: "01/01/2021",
  //       endDate: "01/02/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "2",
  //       type: "Donated Device",
  //       name: "Computer",
  //       startDate: "01/02/2021",
  //       endDate: "02/21/2021",
  //       status: "Finished",
  //     },
  //     {
  //       number: "3",
  //       type: "Donated Device",
  //       name: "Computer",
  //       startDate: "05/02/2021",
  //       endDate: "05/05/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "4",
  //       type: "Digital Resource",
  //       name: "Computer",
  //       startDate: "05/01/2021",
  //       endDate: "05/06/2021",
  //       status: "Finished",
  //     },
  //     {
  //       number: "5",
  //       type: "Donated Device",
  //       name: "Laptop",
  //       startDate: "04/15/2021",
  //       endDate: "04/21/2021",
  //       status: "Finished",
  //     },
  //     {
  //       number: "6",
  //       type: "Digital Resource",
  //       name: "Laptop",
  //       startDate: "04/17/2021",
  //       endDate: "05/01/2021",
  //       status: "Finished",
  //     },
  //     {
  //       number: "7",
  //       type: "Donated Device",
  //       name: "Laptop",
  //       startDate: "03/01/2021",
  //       endDate: "03/10/2021",
  //       status: "Finished",
  //     },
  //     {
  //       number: "8",
  //       type: "Donated Device",
  //       name: "Laptop",
  //       startDate: "02/09/2021",
  //       endDate: "02/14/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "9",
  //       type: "Donated Device",
  //       name: "Laptop",
  //       startDate: "03/11/2021",
  //       endDate: "03/15/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "10",
  //       type: "Donated Device",
  //       name: "Router",
  //       startDate: "02/01/2021",
  //       endDate: "02/05/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "11",
  //       type: "Donated Device",
  //       name: "Laptop",
  //       startDate: "12/31/2020",
  //       endDate: "01/01/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "12",
  //       type: "Donated Device",
  //       name: "Router",
  //       startDate: "01/01/2021",
  //       endDate: "01/02/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "13",
  //       type: "Donated Device",
  //       name: "Router",
  //       startDate: "12/21/2020",
  //       endDate: "01/02/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "14",
  //       type: "Donated Devicer",
  //       name: "Router",
  //       startDate: "05/10/2021",
  //       endDate: "05/16/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "15",
  //       type: "Digital Resource",
  //       name: "Phone",
  //       startDate: "19",
  //       endDate: "05/03/2021",
  //       status: "Pending",
  //     },
  //     {
  //       number: "16",
  //       type: "Donated Device",
  //       name: "Router",
  //       startDate: "03/14/2021",
  //       endDate: "03/24/2021",
  //       status: "Pending",
  //     },
  //   ]
  // };
  console.log(data)
  return (
    <div className="Table">
      <MDBDataTable striped 
      bordered 
      large 
      noBottomColumns={true} 
      entriesLabel="" 
      data={data} 
      infoLabel={["","","",""]}
      entriesOptions={[]} 
      pstartendDatesAmount={4} />
      <img className="SearchIcon" src={SearchIcon} alt="" />
    </div>
  );
};

export default DatatablePstartendDate;
