import React from "react";
import { Appheader, Pathindex } from "components";
import { useLocation } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  console.log(location);
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
