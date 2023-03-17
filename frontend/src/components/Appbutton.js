import React from "react";
import { useState } from "react";

const handleSubmit = () => {
  alert("저장 성공");
};

const Appbutton = () => {
  return (
    <div className="Appbutton">
      <button onClick={handleSubmit}>찾아보자</button>
    </div>
  );
};
export default Appbutton;
