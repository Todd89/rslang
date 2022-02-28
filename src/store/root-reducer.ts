import { combineReducers } from "@reduxjs/toolkit";
import { data } from "./data/data";

export const NameSpace = {
  DATA: "DATA",
};

export default combineReducers({
  [NameSpace.DATA]: data,
});
