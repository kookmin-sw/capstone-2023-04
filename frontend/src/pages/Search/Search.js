import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Appbutton,
  Appheader,
  Postcode,
  SearchContainer,
  Timeline,
} from "components";

import { useRecoilValue } from "recoil";
import { stationListState } from "store";

export default function Search() {
  const location = useLocation();

  return (
    <div className="html">
      <div className="App">
        <Postcode location={"state" in location && location.state} />
      </div>
    </div>
  );
}
