import React from "react";
import Appbutton from "./Appbutton";
import "./SearchBox.css";

const SearchBoxes = () => {
  return (
    <div className="SearchBoxes">
      <div>
        <input type="text" placeholder="출발지를 입력하세요" />
      </div>
      <div>
        <input type="text" placeholder="도착지를 입력하세요" />
      </div>
      <div>
        <Appbutton />
      </div>
    </div>
  );
};

export default SearchBoxes;
