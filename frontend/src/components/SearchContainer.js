import React from "react";
import Appbutton from "./Appbutton";
import "./SearchContainer.css";

const SearchContainer = () => {
  return (
    <div className="SearchContainer">
      <div>
        <input
          className="Waypoint"
          type="text"
          placeholder="출발지를 입력하세요"
        />
      </div>

      <div>
        <input
          className="Waypoint"
          type="text"
          placeholder="도착지를 입력하세요"
        />
      </div>
      <div>
        <Appbutton message="찾아보자!"/>
      </div>
    </div>
  );
};

export default SearchContainer;
