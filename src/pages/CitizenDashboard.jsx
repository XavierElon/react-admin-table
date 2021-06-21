import React from "react";
import CitizenTable from "../Components/CitizenTable";
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
  position: "absolute",
  left: "0%",
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: "100%",
  height: "523px",
  marginTop: "10rem",
  flexGrow: "1"
};

export default function CitizenDashboard() {
  let ohid = window.portalUserID
  console.log("ohid = " + ohid)
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