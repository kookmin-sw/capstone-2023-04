import React from "react";
import { useLocation } from "react-router-dom";
import {
  Postcode,
} from "components";

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
