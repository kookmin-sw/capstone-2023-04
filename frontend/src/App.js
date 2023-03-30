import "./App.css";
import Appbutton from "./components/Appbutton";
import Appheader from "./components/Appheader";
import SearchContainer from "./components/SearchContainer";

function App() {
  return (
    <div className="html">
      <div className="App">
        <Appheader />
        <SearchContainer />

        <div className="InformationClass">
          <div className="Informationbox">
            <div>시위단체 : 전장연</div>
            <div>위치 : 혜화역</div>
          </div>
        </div>

        <Appbutton />
      </div>
    </div>
  );
}

export default App;
