import React from "react";
import "./ProgressBar.css";

function ProgressBar(props) {
    const path = props.subPath

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
      var metro_name = -1;
    
      const busColor = ["#f2b70a", "#0068b7", "#53b332", "#e60012"];
      // 버스 번호는 idx 0 : 2자리수 노란색, idx 1 : 3자리수, 파란색, idx 2 : 4자리수, 초록색, idx 3 : 4자리수, 9로 시작, 빨간색
      var bus_index = -1;
      var bus_id = -1;
      var bus_name = "";

    return (
        <span className="ProgressBar">
            {path.map((item, index) => {
                if (item.trafficType === 1)
                {
                    metro_name = item.lane[0].name;
                    metro_name = metro_name.replace("수도권", "");
                    metroIndex = item.lane[0].subwayCode - 1;
                    if (metroIndex > 99) metroIndex = metroColor.length -1;

                    return <span key={index} className="pathTime" style={{backgroundColor:metroColor[metroIndex]}}>{item.sectionTime} 분</span>
                }
                else if(item.trafficType === 2)
                {
                    const regex = /[^0-9]/g;
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
                    return <span key={index} className="pathTime" style={{backgroundColor:busColor[bus_index]}}>{item.sectionTime} 분</span>
                }
                else
                {
                    return <span key={index} className="pathTime" style={{backgroundColor:"#777777"}}>{item.sectionTime} 분</span>
                }
            })}
            
        </span>
      );
};
export default ProgressBar;
