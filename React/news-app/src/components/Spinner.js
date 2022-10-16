import React, { Component } from "react";
import loading from "../loader.gif";

export class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="" style={{ width: "3rem", height: "3rem" }} />
      </div>
    );
  }
}

export default Spinner;
