import React, { useEffect, useState } from "react";
import { Appheader, Pathindex } from "components";
import { useLocation } from "react-router-dom";
import api from "../../api/mainApi";
import { useRecoilValue } from "recoil";
import { stationListState } from "store";

export default function Result() {
  const location = useLocation();
  const data = location.state;
  const station = useRecoilValue(stationListState);
  const [path, setPath] = useState([]);
  useEffect(() => {
    api.postFindRoute(data).then((res) => {
      setPath(res.data.route);
    });
  }, []);

  // stationList는 서버에서 받아온 지연 되는 역 정보
  var stationList = [];
  for (let i = 0; i < station.length; i++) {
    if (station[i].updnLine === "상행" || station[i].updnLine === "내선")
      stationList.push([station[i].station_name, 1]);
    else stationList.push([station[i].station_name, 2]);
  }
  // passStopList는 대중교통 길찾기 경로 중에 지하철 역 경로만 저장
  // index = 0은 경로, index = 1은 전체 경로 인덱스 번호
  var passStopList = [];
  for (let i = 0; i < path.length; i++) {
    var subPath = path[i].subPath;
    for (let j = 0; j < subPath.length; j++) {
      if (subPath[j].trafficType === 1) {
        passStopList.push([subPath[j].passStopList, subPath[j].wayCode, i]);
      } else continue;
    }
  }
  // station_name은 지하철 경로
  for (let i = 0; i < passStopList.length; i++) {
    var station_name = passStopList[i][0].stations;
    var wayCode = passStopList[i][1];
    var index = passStopList[i][2];
    for (let j = 0; j < station_name.length; j++) {
      var realStationName = station_name[j].stationName;
      for (let k = 0; k < stationList.length; k++) {
        if (
          realStationName === stationList[k][0] &&
          wayCode === stationList[k][1]
        ) {
          path.splice(index, 1);
          break;
        }
      }
    }
  }
  return (
    <div className="html">
      <div className="App">
        <div className="nanumgothic">
          <Appheader />
          {/* main.js 41줄 처럼 정보 받아오면 받아온 것 만큼 Pathindex를 만들어서 보여주면 됨  */}
          {path.map((item, index) => {
            return <Pathindex key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
