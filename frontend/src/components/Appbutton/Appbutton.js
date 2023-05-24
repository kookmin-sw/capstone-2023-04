import React from "react";
import api from "../../api/mainApi";
import "./Appbutton.css";
import { useSetRecoilState } from 'recoil';
import { stationListState} from "store";

function Appbutton(props) {
  const setStationList = useSetRecoilState(stationListState);

  function handleSubmit() {
    api.getStationInfo().then((res) => {
      setStationList(res.data)
      return window.location.replace("/");
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
          <button onClick={handleSubmit}>새로고침</button>
        </div>
      );
    } else 
    {
      return (
        <div className="Appbutton">
          <button disabled={true} style={{backgroundColor:"#777"}}>{props.message}</button>
        </div>
      );
    }
  }
  
};
export default Appbutton;
