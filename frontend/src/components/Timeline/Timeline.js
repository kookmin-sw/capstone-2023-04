import React from "react";
import "./Timeline.css";

function Timeline(props) {
  return (
    <span className="Timeline">
      <span className="Iconcontainer">
        <img src="icon/metro_error_icon.png"></img>
      </span>
      <div className="Routetime">4호선 혜화역</div>
    </span>
  );
}
export default Timeline;
