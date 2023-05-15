import React from "react";
import api from "../../api/mainApi";
import "./Appbutton.css";
import { useRecoilValue, useRecoilState } from 'recoil';
import { departureState, arrivalState, stationListState } from "store";
import axios from "axios";

function Appbutton(props) {
  const [stationList, setStationList] = useRecoilState(stationListState);
  const departure = useRecoilValue(departureState);
  const arrival = useRecoilValue(arrivalState);

  var starting_point = departure;
  var destination = arrival;

  const data = {
    starting_point : starting_point,
    destination : destination
  }
  function handleSubmit() {
    api.getStationInfo().then((res) => {
      setStationList(res.data)
      return window.location.replace("/");
    })
  };

  function findRoute() {
    api.postFindRoute(data).then((res) => {
      console.log(res.data)
    })
  }

  if (props.message === "찾아보자!") {
    return (
      <div className="Appbutton">
        <button onClick={findRoute}>{props.message}</button>
      </div>
    );
  } else {
    if (props.state >= 5)
    {
      return (
        <div className="Appbutton">
          <button onClick={handleSubmit}>새로고침</button>
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
