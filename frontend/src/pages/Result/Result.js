import React ,{ useEffect, useState } from "react";
import { Appheader, Pathindex } from "components";
import { useLocation } from "react-router-dom";
import api from "../../api/mainApi";

export default function Result() {
  const location = useLocation();
  const data = location.state

  const [path, setPath] = useState([]);

  useEffect(() => {
    api.postFindRoute(data).then((res) => {
      setPath(res.data.route);
      console.log(path);
    })
  }, []);

  return (
    <div className="html">
      <div className="App">
        <Appheader />
{/* main.js 41줄 처럼 정보 받아오면 받아온 것 만큼 Pathindex를 만들어서 보여주면 됨  */}
          {
            path.map((item, index) => {
              return (
                  <Pathindex key={index} item={item}/>
              );
            })
          }
      </div>
    </div>
  );
}
