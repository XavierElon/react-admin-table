import React from "react";
import Table from "../Components/Table";
import CitizenTable from "../Components/CitizenTable"
import Grid from "@material-ui/core/Grid";

const appStyle = {
  textAlign: "center",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "auto",
  paddingBottom: "72px",
  flexDirection: "column",
  display: "flex",
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

export default function Home() {
  let ohid = window.portalUserID;
  let admin = false;
  
  if(ohid.charAt(0) === '7') {
    admin=true
  }

  if (!admin) {
    return (
      <div style={appStyle}>
        <Grid>
          <div style={bodyStyle}>
            <Table></Table>
          </div>
        </Grid>
      </div>
    );
  } else {
    return (
        <div style={appStyle}>
          <Grid>
            <div style={bodyStyle}>
              <CitizenTable></CitizenTable>
            </div>
          </Grid>
        </div>
      );
  }
}
