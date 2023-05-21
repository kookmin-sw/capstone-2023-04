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
        <h1>ALGOTA</h1>
      </div>
    </Link>
  );
}
export default Appheader;
