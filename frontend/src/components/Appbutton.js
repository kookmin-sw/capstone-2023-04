import React from "react";
import api from "../api/mainApi";
import "./Appbutton.css";
import { useRecoilState } from 'recoil';
import { stationListState } from "store";

function Appbutton(props) {
  const setStationList = useRecoilState(stationListState);

  function handleSubmit() {
    api.getStationInfo().then((res) => {
      setStationList(res.data)
    })
  };

  return (
    <div className="Appbutton">
      <button onClick={handleSubmit}>{props.message}</button>
    </div>
  );
};
export default Appbutton;
