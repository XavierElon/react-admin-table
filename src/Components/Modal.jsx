import React from "react";
import styled from "styled-components";
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
  padding-left: 20px;
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
  padding-left: 20px;
  padding-top: 20px;
  text-transform: uppercase;
`;

// const gxStyle = {
//   position: "relative",
//   top: "-4rem",
//   left: "102rem",
// };

// const rxStyle = {
//   position: "relative",
//   top: "-4rem",
//   left: "102rem",
// };

export default function Modal({ color, id }) {
  console.log(color);
  if (color === "green") {
    return (
      <div className="owt-content-modal">
        <GreenModal className="owt-content-green-modal">
          <p className="owt-content-green-modal-text">
            Request #{id} has been approved.
          </p>
          <Link to="/">
            <i class="fa fa-times owt-content-green-x" aria-hidden="true"></i>
          </Link>
        </GreenModal>
      </div>
    );
  } else {
    return (
      <div className="owt-content-modal">
        <RedModal className="owt-content-red-modal">
          <p className="owt-content-red-modal-text">
            Request #{id} has been denied.
          </p>
          <Link to="/">
            <i class="fa fa-times owt-content-red-x" aria-hidden="true"></i>
          </Link>
        </RedModal>
      </div>
    );
  }
}
