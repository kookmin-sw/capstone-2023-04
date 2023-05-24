import React from "react";
import "./Appheader.css";
import { Link } from "react-router-dom";

function Appheader() {
  return (
    <Link
      to={"/"}
      style={{
        textDecoration: "none",
      }}
    >
      <div className="Appheader">
        <span>ALGOTA</span>
      </div>
    </Link>
  );
}
export default Appheader;
