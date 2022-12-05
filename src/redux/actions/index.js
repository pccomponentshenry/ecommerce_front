import axios from "axios";

import {
  //   GET_PRODUCT,
  //   SEARCH_PRODUCT,
  //   ORDER_BY_NAME,
  GET_BRANDS, ALL_PRODUCTS, GET_CATEGORIES,
  FILTER_CATEGORIES, FILTER_BRANDS
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

export function getCategories() {
  return async (dispatch) => {
    const res = await axios.get(`${URL}/categories`);
    return dispatch({ type: GET_CATEGORIES, payload: res.data });
  };
}

export async function populateDB() {
  await axios.get(`${URL}/populateDB`);
}

export function filterCategories(filter) {
  return {
      type: FILTER_CATEGORIES,
      payload: filter
  }
}

export function filterBrands(filter) {
  return {
      type: FILTER_BRANDS,
      payload: filter
  }
}