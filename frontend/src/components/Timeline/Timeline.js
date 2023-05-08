import React from "react";
import "./Timeline.css";

function Timeline(props) {
  return (
    <span className="Timeline">
      <span className="Iconcontainer">
        <img src="icon/metro_error_icon.png"></img>
      </span>
      <div className="Routetime">{props.message}</div>
    </span>
  );
}
export default Timeline;
