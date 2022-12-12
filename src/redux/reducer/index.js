import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
  ORDER_BY_NAME,
  ALL_PRODUCTS,
  GET_BRANDS,
  GET_PRODUCTS_BY_NAME,
  GET_CATEGORIES,
  POST_PRODUCT,
  SET_ERROR,
  GET_FILTERED,
  CLEAR_STATE,
  FILTER_CATEGORIES,
  FILTER_BRANDS,
  SEARCH_BAR_FILTER,
  ADD_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  CLEAR_ERROR,
} from "../actions/actionNames";

const initialState = {
  products: [],
  product: [],
  brands: [],
  categories: [],
  brand: [],
  error: [],
  filtered: [],
  searchBar: [],
  cart: [],
};

if (localStorage.getItem("cart")) {
  initialState.cart = JSON.parse(localStorage.getItem("cart"));
} else {
  initialState.cart = [];
}

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
    }
    case CLEAR_STATE: {
      return {
        ...state,
        filtered: [],
      };
    }
    case GET_FILTERED:
      return {
        ...state,
        filtered: action.payload,
      };
    case SEARCH_BAR_FILTER:
      return {
        ...state,
        searchBar: action.payload,
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

    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        filtered: action.payload,
      };
    case SET_ERROR:
      // return {
      //   ...state,
      //   products: AllBrands,
      // };
      return {
        ...state,
        error: action.payload,
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
    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_TO_CART:
      let newItem = state.products.find(el => el.id === action.payload.id);
      let itemInCart = state.cart.find(item => item.id === newItem.id);
      return itemInCart
        ? {
            ...state,
            cart: state.cart.map(item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };

    case CLEAR_CART:
      localStorage.clear();
      return {
        ...state,
        cart: [],
      };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: [],
      };
    case REMOVE_ONE_FROM_CART:
      const filtered = state.cart.filter(i => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(filtered));

      return {
        ...state,
        cart: filtered,
      };

    default:
      return state;
  }
}

export default rootReducer;
