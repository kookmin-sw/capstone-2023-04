import React from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { useSetRecoilState } from "recoil";
import { departureState, arrivalState } from "store";
import "./postcode.css";

const Postcode = (props) => {
  const navigate = useNavigate();
  const setDeparture = useSetRecoilState(departureState);
  const setArrival = useSetRecoilState(arrivalState);
  console.log(props.location);

  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (props.location === "departure") {
      setDeparture(fullAddress);
    } else {
      setArrival(fullAddress);
    }
    navigate("/");
  };

  return (
    <div>
      <DaumPostcode className="postmodal" autoClose onComplete={complete} />
    </div>
  );
};

export default Postcode;
