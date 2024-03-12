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
      return res.data.route
    }).then((data)=>{
   const filterPath = data.filter(item=>{ 
        let flag = true
        station.forEach(element => {
          let wayCode = 0  
          if(element.updnLine==="상행"||element.updnLine==="내선"){
            wayCode = 1
          }else{
            wayCode = 2
          }
          item.subPath.filter(pa=>pa.trafficType === 1)?.forEach(pa=>{
            if(pa.wayCode === wayCode){
              flag = false
            }
            else{
            if(pa.passStopList.stations.find(des=>des.stationName == element.station_name)){
              flag = false
            }
          }
          })
        })
        return flag
  })
  setPath(filterPath)
    })
  }, []);
  return (
    <div className="html">
      <div className="App">
        <div className="nanumgothic">
          <Appheader />
          {path.map((item, index) => {
            return <Pathindex key={index} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
