import React from "react";
import "./Timeline.css";

function Timeline(props) {
  const color = ['#0052A4', '#00A84D', '#EF7C1C', '#00A5DE', '#996CAC',
      '#CD7C2F', '#747F00', '#E6186C', '#BB8336']
  const index = props.subway_id - 1001;

  return (
    <span className="Timeline">
      <span className="Iconcontainer" style={{backgroundColor : color[index]}}>
        <img src="icon/metro_error_icon.png"></img>
      </span>
      <div className="Routetime" style={{backgroundColor : color[index]}}>
        {props.subway_id- 1000}호선 {props.station}역 - {props.updnLine}
      </div>
    </span>
  );
}
export default Timeline;
