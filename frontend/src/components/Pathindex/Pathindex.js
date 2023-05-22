import React from "react";
import "./Pathindex.css";
import { ProgressBar } from "components";
// props로 받아야 할 것 : 버스번호
function Pathindex(props) {
  // 지하철 호선 1~9, 우이신설
  const metroColor = [
    "#0052A4",
    "#00A84D",
    "#EF7C1C",
    "#00A5DE",
    "#996CAC",
    "#CD7C2F",
    "#747F00",
    "#E6186C",
    "#BB8336",
    "#B0CE18",
  ];
  var metroIndex = -1;
  var metro_name = "";

  const busColor = ["#f2b70a", "#0068b7", "#53b332", "#e60012"];
  // 버스 번호는 idx 0 : 2자리수 노란색, idx 1 : 3자리수, 파란색, idx 2 : 4자리수, 초록색, idx 3 : 4자리수, 9로 시작, 빨간색
  var bus_index = -1;
  var bus_id = -1;
  var bus_name = "";
  const regex = /[^0-9]/g;
  const imgSrc = ["icon/metro_normal_icon.png", "icon/bus_normal_icon.png"];
  // 지하철 정상 0, 버스 정상 1

  var imgIdx = -1;
  // 서버에서 받아온 정보에 따라서 imgIdx를 바꿔주세요
  const itemSubPath = props.item.subPath;
  const subPath = [];
  for (let i = 0; i < itemSubPath.length; i++) {
    subPath.push(itemSubPath[i]);
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
        <ProgressBar total={props.item.totalTime} subPath={subPath}/>
        {subPath.map((item, index) => {
          imgIdx = item.trafficType - 1;
          if (item.trafficType === 1) {
            metro_name = item.lane[0].name;
            metro_name = metro_name.replace("수도권", "");
            metroIndex = item.lane[0].subwayCode - 1;
            if (metroIndex > 99) metroIndex = metroColor.length -1;
            return (
              <div key={index} className="Routeinfo">
                <div className="Transportation">
                  <span
                    className="Iconcontainer"
                    style={{
                      backgroundColor: metroColor[metroIndex],
                    }}>
                    <img src={imgSrc[imgIdx]}></img>
                  </span>
                  <span style={{ color: metroColor[metroIndex] }}>
                    {metro_name}
                  </span>
                  {/* 버스 번호 서버에서 넣어주세요 */}
                  <span> | {item.startName}</span>
                </div>
                {index === subPath.length - 2 ? (<span>{item.endName} 하차</span>) : (<span></span>)}
              </div>
              );
          }
          else if (item.trafficType === 2) {
            bus_name = item.lane[0].busNo;
            bus_id = bus_name.replace(regex, "");
            bus_id = Number(bus_id);
              if (bus_id < 100) {
                bus_index = 0;
              } else if (bus_id < 1000) {
                bus_index = 1;
              } else if (bus_id < 9000) {
                bus_index = 2;
              } else if (bus_id < 10000) {
                bus_index = 3;
              }
              return (
                <div key={index} className="Routeinfo">
                  <div className="Transportation">
                    <span
                      className="Iconcontainer"
                      style={{
                        backgroundColor: busColor[bus_index],
                      }}>
                      <img src={imgSrc[imgIdx]}></img>
                    </span>
                    <span style={{ color: busColor[bus_index] }}>
                      {bus_name}
                    </span>
                    {/* 버스 번호 서버에서 넣어주세요 */}
                    <span> | {item.startName}</span>
                  </div>
                  {index === subPath.length - 2 ? (<span>{item.endName} 하차</span>) : (<span></span>)}
                </div>
                );
            }
          else {
                return null;
          }
        })}
      </div>
    </span>
  );
}
export default Pathindex;
