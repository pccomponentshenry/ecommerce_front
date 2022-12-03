//const url = "http://localhost:3001";
//import axios from "axios";
import {
//   GET_PRODUCT,
//   SEARCH_PRODUCT,
//   ORDER_BY_NAME,
  GET_BRAND
} from "../actions/actionNames";

export function getBrand() {
  return async (dispatch) => {
    const res = await axios.get("http://localhost:3001/brand");
    //console.log(res);
    dispatch({ type: GET_BRAND, payload: res.data });
  };
}
