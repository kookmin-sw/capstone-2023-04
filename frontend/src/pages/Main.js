import React from 'react';
import "./Main.css";

import Appbutton from "../components/Appbutton";
import Appheader from "../components/Appheader";
import SearchContainer from "../components/SearchContainer";
import Timeline from "../components/Timeline";

export default function Main() {
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