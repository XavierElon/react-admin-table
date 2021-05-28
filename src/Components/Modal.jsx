import { ClickAwayListener } from "@material-ui/core";
import React, { useState } from "react";
import { isDOMComponent } from "react-dom/test-utils";
import styled from "styled-components";
import GX from "../images/icn-close-green.svg";
import RX from "../images/icn-close-red.svg";

const RedModal = styled("div")`
  width: 1080px;
  height: 65px;
  background: #fce7e7;
  stroke-width: 1;
  border-radius: 3px;
  color: #222222;
  border: 1px solid #e32222;
  position: absolute;
  top: -150px;
  text-align: left;
  padding-left: 50px;
  padding-top: 20px;
`;
const GreenModal = styled("div")`
  width: 1080px;
  height: 65px;
  background: #eef2e5;
  stroke-width: 1;
  border-radius: 3px;
  color: #222222;
  border: 1px solid #5e8000;
  position: absolute;
  top: -150px;
  text-align: left;
  padding-left: 30px;
  padding-top: 20px;
`;



export default function Modal({ color, open, close }) {
  
  const styledModal = {
    opacity: open ? 0 : 1
  }
  
  const lick = () => console.log('clciekd')
  console.log(open)
  console.log(close)
  if (color === "green") {
    return (
      <div>
        <GreenModal style={styledModal}>
          <p>Request #123456789 was approved.</p>
          <img
            style={{
              position: "absolute",
              top: "15px",
              right: "25px",
              cursor: "pointer",
            }}
            src={GX}
            alt=""
            onClick={(close)}
          />
        </GreenModal>
      </div>
    );
  } else {
    return (
      <div>
        <RedModal>
          <p>Request #1234567890 has been denied.</p>
          <img
            style={{
              position: "absolute",
              top: "15px",
              right: "25px",
              cursor: "pointer",
            }}
            src={RX}
            alt=""
          />
        </RedModal>
      </div>
    );
  }
}
