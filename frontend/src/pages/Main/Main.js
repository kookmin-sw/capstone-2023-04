import React from 'react';
import "./Main.css";

import { Appbutton, Appheader, SearchContainer, Timeline } from "components";

import { useRecoilValue } from 'recoil';
import { stationListState } from 'store';

export default function Main() {
    const stationList = useRecoilValue(stationListState);
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

            <Appbutton message="새로고침" />
        </div>
    </div>
    );
}