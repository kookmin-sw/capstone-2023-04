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
{/* main.js 41줄 처럼 정보 받아오면 받아온 것 만큼 Pathindex를 만들어서 보여주면 됨  */}
        <Pathindex />
        <Pathindex />

      </div>
    </div>
  );
}
