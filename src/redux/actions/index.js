//const url = "http://localhost:3001";
import axios from "axios";
import {
  //   GET_PRODUCT,
  //   SEARCH_PRODUCT,
  //   ORDER_BY_NAME,
  GET_BRAND, GET_PRODUCTS
} from "../actions/actionNames";

const URL = "http://localhost:3001";

export function getBrand() {
  return async (dispatch) => {
    const res = await axios.get(`${URL}/brands`);
    return dispatch({ type: GET_BRAND, payload: res.data });
  };
}

export function getProducts() {
  return async (dispatch) => {
    const res = await axios.get(`${URL}/products`);
    return dispatch({ type: GET_PRODUCTS, payload: res.data });
  };
}
