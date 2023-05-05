import React, {useState, useEffect} from 'react';
import "./Main.css";
import { Appbutton, Appheader, SearchContainer, Timeline } from "components";
import { useRecoilValue } from 'recoil';
import { stationListState } from 'store';
import api from "api/mainApi";

export default function Main() {    
    const stationList = useRecoilValue(stationListState);
    const [refreshTime, setTime] = useState('');

    useEffect(() => {
      api.getSavedTime().then((res) => {
        let time = res.data[0].request_time
        setTime(time);
      });
    }, []);

    const today = new Date();
    const before = new Date(refreshTime);
    const diff = today.getTime() - before.getTime();
    const diffMin = diff / (60 * 1000);
    console.log(today + "\n" + before);
    console.log(diffMin);
    // Todo : diffMin >= 5 일 때만 새로고침 버튼 활성화
    
    return (
    <div className="html">
        <div className="App">
            <Appheader />
            <SearchContainer />

            <div className="InformationClass">
                <div className="Informationbox">
                    <p>지금 지연이 예상되고 있어요!</p>
                <Timeline />
                </div>
            </div>

            <Appbutton message={refreshTime} />
        </div>
    </div>
    );
}