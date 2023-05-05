import React from "react";
import api from "../api/mainApi";
import "./Appbutton.css";
import { useRecoilState } from 'recoil';
import { stationListState } from "store";

function handleSubmit() {
  
  api.getStation().then((res) => {
    console.log(res.data)
  })
};

function Appbutton(props) {
  return (
    <div className="Appbutton">
      <button onClick={handleSubmit}>{props.message}</button>
    </div>
  );
};
export default Appbutton;
