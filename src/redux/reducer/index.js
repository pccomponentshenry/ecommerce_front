
import { ALL_PRODUCTS} from "../actions/index"; //Para las action creators

import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
  ORDER_BY_NAME,
  GET_BRAND,
  GET_PRODUCTS,
  ALL_PRODUCTS
} from "../actions/actionNames"; //Para las action creators

const initialState = {
  allProducts: [],
  product: [],
  brand: [],
  allBrand: []

};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
            
            default:
              return state

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_BRAND:
      return {
        ...state,
        brand: action.payload
      }
    case ORDER_BY_NAME:
      let sortedArr =
        action.payload === "asc"
          ? state.product.sort(function (a, b) {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : state.product.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

  }
}

export default rootReducer;
