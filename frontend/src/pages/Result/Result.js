import React from "react";
import { Appheader, Pathindex } from "components";

export default function Result() {
  return (
    <div className="html">
      <div className="App">
        <Appheader />
        <div
          className="Informationbox"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Pathindex />
          <Pathindex />
        </div>
      </div>
    </div>
  );
}
