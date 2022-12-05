import axios from "axios";

import {
  //   GET_PRODUCT,
  //   SEARCH_PRODUCT,
  //   ORDER_BY_NAME,
  GET_BRANDS, ALL_PRODUCTS,
  GET_PRODUCTS_BY_NAME
} from "../actions/actionNames";

const URL = "http://localhost:3001";

export function allProducts() {
  return function (dispatch) {
    axios.get(`${URL}/products`)
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

export function getBrands() {
  return async (dispatch) => {
    const res = await axios.get(`${URL}/brands`);
    return dispatch({ type: GET_BRANDS, payload: res.data });
  };
}

export async function populateDB() {
  await axios.get(`${URL}/populateDB`);
}

export function getProductsByName(name){
  return async function (dispatch){
    try{
        var json = await axios.get (`http://localhost:3001/products?name=${name}`);
        return dispatch({
            type: GET_PRODUCTS_BY_NAME,
            payload: json.data,  
        })
    } catch (error){
        console.log (error.message)
        return alert('Sorry, product not found, try again.')
    }
};
}