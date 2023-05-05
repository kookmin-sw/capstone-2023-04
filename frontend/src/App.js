import React, { useEffect } from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import api from "./api/mainApi"
import MainRoute from "./route/MainRoute";



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
    <RecoilRoot>
      <MainRoute />
    </RecoilRoot>
  );
}

export default App;
