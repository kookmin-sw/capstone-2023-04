import React from "react";
import { useState } from "react";

function handleSubmit() {
  alert("저장 성공");
};

function Appbutton(props) {
  return (
    <div className="Appbutton">
      <button onClick={handleSubmit}>{props.message}</button>
    </div>
  );
};
export default Appbutton;
