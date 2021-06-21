import React from "react";
import styled from "styled-components";
import GX from "../images/icn-close-green.svg";
import RX from "../images/icn-close-red.svg";
import { Link } from "react-router-dom";

const RedModal = styled("div")`
  width: 1080px;
  height: 65px;
  background-color: #f5cccc;
  stroke-width: 1;
  border-radius: 3px;
  color: #222222;
  border: 1px solid #e32222;
  text-align: left;
  padding-left: 50px;
  padding-top: 20px;
`;
const GreenModal = styled("div")`
  width: 1080px;
  height: 65px;
  background-color: #c8d3ae;
  stroke-width: 1;
  border-radius: 3px;
  color: #222222;
  border: 1px solid #5e8000;
  text-align: left;
  padding-left: 30px;
  padding-top: 20px;
  text-transform: uppercase;
`;

export default function Modal({ color, id }) {
  
  if (color === "green") {
    return (
      <div className="owt-content-modal">
        <GreenModal className="owt-content-green-modal">
          <p className="owt-content-green-modal-text">Request {id} was approved.</p>
          <Link to='/'>
          <img
            className="owt-content-green-modal-x"
            src={GX}
            alt=""
          />
          </Link>
        </GreenModal>
      </div>
    );
  } else {
    return (
      <div className="owt-content-modal">
        <RedModal className="owt-content-red-modal">
          <p className="owt-content-red-modal-text">Request {id} has been denied.</p>
          <Link to='/'>
          <img
            className="owt-content-red-modal-x"
            src={RX}
            alt=""
          />
          </Link>
        </RedModal>
      </div>
    );
  }
}
