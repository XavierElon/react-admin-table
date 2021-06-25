import React from "react";
import Table from "../Components/Table";
import CitizenTable from "../Components/CitizenTable";
import Grid from "@material-ui/core/Grid";

export default function Home() {
  let ohid = window.portalUserID;
  let admin = false;

  console.log("ohid = " + ohid)
  // if(ohid.charAt(0) === '7') {
  //   admin=true
  // }

  if (true) {
    return (
      <div>
        <Grid>
          <div className="owt-home-table-body">
            <Table></Table>
          </div>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <Grid>
          <div className="owt-home-table-body">
            <CitizenTable></CitizenTable>
          </div>
        </Grid>
      </div>
    );
  }
}
