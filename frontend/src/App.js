import "./App.css";
import Appbutton from "./components/Appbutton";
import Appheader from "./components/Appheader";
import SearchBoxes from "./components/SearchBoxes";

function App() {
  return (
    <div className="html">
      <div className="App">
        <Appheader />
        <SearchBoxes />


        <div className="Informationbox">
          <div>시위단체 : 전장연</div>
          <div>위치 : 혜화역</div>
        </div>
        <Appbutton />
      </div>
    </div>
  );
}

export default App;
