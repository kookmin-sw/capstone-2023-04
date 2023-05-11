import { atom } from "recoil";

export const departureState = atom({
  key: "departureState",
  default: "",
});
export const arrivalState = atom({
  key: "arrivalState",
  default: "",
});
