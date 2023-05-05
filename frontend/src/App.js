import React, { useEffect } from 'react';
import "./App.css";
import Appbutton from "./components/Appbutton";
import Appheader from "./components/Appheader";
import SearchContainer from "./components/SearchContainer";
import Timeline from "./components/Timeline";
import api from "./api/mainApi"

function App() {
  const getTime = async () => {
    await api.getSavedTime().then((res) => {
      console.log(res.data[0].request_time);
    });
  };
  
  useEffect(() => {
    getTime();
  }, []);
  return (
    <div className="html">
      <div className="App">
        <Appheader />
        <SearchContainer />

        <div className="InformationClass">
          <div className="Informationbox">
            <p>지금 지연되고 있어요!</p>
          <Timeline />
          </div>
        </div>

        <Appbutton message="새로고침" />
      </div>
    </div>
  );
}

export default App;
