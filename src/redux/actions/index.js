import axios from "axios";
export const ALL_PRODUCTS = "ALL_PRODUCTS";

const url = "http://localhost:3001";

export function allProducts() {
    return function (dispatch) {
        axios.get('http://localhost:3001/products')
            .then((resp) => {
                dispatch({
                    type: ALL_PRODUCTS,
                    payload: resp.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

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
