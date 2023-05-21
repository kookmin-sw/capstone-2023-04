import React, { useEffect, useState } from "react";
import { Appheader, Pathindex } from "components";
import { useLocation } from "react-router-dom";
import api from "../../api/mainApi";
import { useRecoilValue } from "recoil";
import { stationListState } from "store";

export default function Result() {
  const location = useLocation();
  const data = location.state;
  const station = useRecoilValue(stationListState)
  const [path, setPath] = useState([]);

  useEffect(() => {
    api.postFindRoute(data).then((res) => {
      setPath(res.data.route);
    });
  }, []);

  // console.log(path[0].subPath[3].passStopList);
  var stationList = [];
  for(let i = 0; i < station.length; i++)
  {
    if(station[i].updnLine === "상행" || station[i].updnLine === "내선")
      stationList.push([station[i].station_name, 1]);
    else
      stationList.push([station[i].station_name, 2]);
  }
  console.log(stationList);
  return (
    <div className="html">
      <div className="App">
        <Appheader />
        {/* main.js 41줄 처럼 정보 받아오면 받아온 것 만큼 Pathindex를 만들어서 보여주면 됨  */}
        {path.map((item, index) => {
          return <Pathindex key={index} item={item} />;
        })}
      </div>
    </div>
  );
}
