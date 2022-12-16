import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
  ALL_PRODUCTS,
  GET_BRANDS,
  GET_CATEGORIES,
  POST_PRODUCT,
  SET_ERROR,
  SET_FILTERED,
  CLEAR_STATE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  CLEAR_ERROR,
  POST_USER,
} from "../actions/actionNames";

const initialState = {
  products: [],
  product: [],
  brands: [],
  categories: [],
  brand: [],
  error: [],
  filtered: [],
  cart: [],
  users:[],
};

initialState.cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : initialState.cart = [];

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case POST_PRODUCT: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    };

    case CLEAR_STATE: {
      return {
        ...state,
        filtered: [],
      };
    }

    case SET_FILTERED:
      return {
        ...state,
        filtered: action.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case CLEAR_ERROR:
      // return {
      //   ...state,
      //   products: AllBrands,
      // };
      return {
        ...state,
        error: [],
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: [],
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

      ////// USERS /////
    case POST_USER: {
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      };

    default:
      return state;
  }
}

export default rootReducer;
