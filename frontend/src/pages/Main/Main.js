import React, {useState, useEffect} from 'react';
import "./Main.css";
import { Appbutton, Appheader, SearchContainer, Timeline } from "components";
import { useRecoilValue } from 'recoil';
import { stationListState } from 'store';
import api from "api/mainApi";

export default function Main() {    
    const [stationList, setStationList] = useState([]);
    const [refreshTime, setTime] = useState('');

    useEffect(() => {
      api.getSavedTime().then((res) => {
        let time = res.data[0].request_time
        setTime(time);
      });
      api.getStationList().then((res) => {
        setStationList(res.data);
        console.log(stationList[0]);
      })
    }, []);


    const today = new Date();
    const before = new Date(refreshTime);
    const diff = today.getTime() - before.getTime();
    const diffMin = diff / (60 * 1000);
    console.log(diffMin);
    const refresh = diffMin.toString().charAt() + " 분 전";

    return (
    <div className="html">
        <div className="App">
            <Appheader />
            <SearchContainer />

            <div className="InformationClass">
                <div className="Informationbox">
                    <p>지금 지연이 예상되고 있어요!</p>
                    {
                        stationList.map((item, index) => {
                            return (
                                <Timeline key={index} message={item.station_name} />
                            );
                        })
                    }
                </div>
                
            </div>
                    <Appbutton message={refresh} state={diffMin} /> 
        </div>
    </div>
    );
}