import React from "react";
import api from "../api/mainApi";
import "./Appbutton.css";
import { useRecoilState } from 'recoil';
import { stationListState } from "store";

function Appbutton(props) {
  const [stationList, setStationList] = useRecoilState(stationListState);

  function handleSubmit() {
    api.getStationInfo().then((res) => {
      setStationList(res.data)
    })
  };

  if (props.message === "찾아보자!") {
    return (
      <div className="Appbutton">
        <button>{props.message}</button>
      </div>
    );
  } else {
    if (props.state >= 5)
    {
      return (
        <div className="Appbutton">
          <button onClick={handleSubmit}>{props.message}</button>
        </div>
      );
    } else 
    {
      return (
        <div className="Appbutton">
          <button disabled={true} style={{backgroundColor:"#777777"}}>{props.message}</button>
        </div>
      );
    }
  }
  
};
export default Appbutton;
