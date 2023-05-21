import React from "react";
import { useLocation } from "react-router-dom";
import "./Pathindex.css";

// props로 받아야 할 것 : 버스번호
function Pathindex(props) {
  const location = useLocation();

  const busColor = ["#f2b70a", "#0068b7", "#53b332", "#e60012"];
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
  
  const imgSrc = ["icon/bus_error_icon.png", "icon/bus_normal_icon.png", "icon/metro_error.png", "icon/metro_normal_icon.png","walk_error_icon.png","walk_normal_icon.png"]
// 버스 에러 0, 버스 정상 1, 지하철 에러 2, 지하철 정상 3, 도보 에러 4, 도보 정상 5

  const imgIdx = -1
// 서버에서 받아온 정보에 따라서 imgIdx를 바꿔주세요
  const subPath = props.item.subPath;
  for (let i = 0; i < subPath.length; i++)
  {
    if(subPath[i].trafficType !== 3)
      console.log(subPath[i])
  }
  return (
    <span className="Pathindex">
      <div className="Informationbox">
        <div className="InformaitonTitle">
          <span className="timeValue">{props.item.totalTime}</span>
          {/* 걸리는 시간을 서버에서 받아서 minute에 넣어주세요 */}
          <span>분</span>
          <span> | </span>
        </div>
        <div className="Routeinfo">
          <span>출발 : 출발지이름</span>

          <div className="Transportation">
            <span
              className="Iconcontainer"
              style={{
                backgroundColor: busColor[bus_index],
              }}
            >
              <img src={imgSrc[imgIdx]}></img>
            </span>
            <span style={{ color: busColor[bus_index] }}> 버스번호</span>
            {/* 버스 번호 서버에서 넣어주세요 */}
            <span> | 정류장 이름</span>

          
          </div>
          <span>도착 : 도착지 이름</span>
        </div>
      </div>
    </span>
  );
}
export default Pathindex;
