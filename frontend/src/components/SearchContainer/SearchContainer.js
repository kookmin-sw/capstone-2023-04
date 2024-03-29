import React from "react";
import Appbutton from "../Appbutton/Appbutton";
import "./SearchContainer.css";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { departureState, arrivalState } from "store";

function SearchContainer() {
  const navigate = useNavigate();
  const departure = useRecoilValue(departureState);
  const arrival = useRecoilValue(arrivalState);

  const navigatePostcode = (e) => {
    const { name } = e.target;
    navigate("/search", { state: name });
  };

  return (
    <div className="SearchContainer">
      <div>
        <input
          className="Waypoint"
          type="text"
          placeholder="출발지를 입력하세요"
          value={departure}
          name="departure"
          onClick={navigatePostcode}
        />
      </div>

      <div>
        <input
          className="Waypoint"
          type="text"
          placeholder="도착지를 입력하세요"
          name="arrival"
          value={arrival}
          onClick={navigatePostcode}
        />
      </div>
      <div>
        <Link
          to={"./Result"}
          state={{
            departure: departure,
            arrival: arrival,
          }}
        >
          <Appbutton message="찾아보자!" />
        </Link>
      </div>
    </div>
  );
}

export default SearchContainer;
