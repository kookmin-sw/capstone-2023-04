import React from "react";
import "./Pathindex.css";

// props로 받아야 할 것 : 버스번호
function Pathindex(props) {
  const busColor = ["#f2b70a", "#0068b7", "#53b332", "e60012"];
  // 버스 번호는 idx 0 : 2자리수 노란색, idx 1 : 3자리수, 파란색, idx 2 : 4자리수, 초록색, idx 3 : 4자리수, 9로 시작, 빨간색
  let bus_index = -1;
  if (props.bus_id < 100) {
    bus_index = 0;
  } else if (props.bus_id < 1000) {
    bus_index = 1;
  } else if (props.bus_id < 9000) {
    bus_index = 2;
  } else if (props.bus_id < 10000) {
    bus_index = 3;
  }

  return (
    <span className="Pathindex">
      <span
        className="Iconcontainer"
        style={{ backgroundColor: busColor[bus_index] }}
      >
        <img src="icon/bus_normal_icon.png"></img>
      </span>
      <div
        className="Routetime"
        style={{ backgroundColor: busColor[bus_index] }}>
        여기에 중괄호로 props.걸리는 시간 넣어주세요.
      </div>
    </span>
  );
}

export default Pathindex;
