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
} from "../actions/actionNames"; //Para las action creators

const initialState = {
  products: [],
  product: [],
  brands: [],
  categories: [],
  brand: [],
  error: [],
  filtered: [],
  searchBar: [],
};

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

    case FILTER_CATEGORIES:
      let FilterCat = [...state.filter];
      let AllType =
        action.payload === "ALLCAT"
          ? FilterCat
          : FilterCat?.filter(e => e.category.name == action.payload);

    // case GET_PRODUCTS_BY_NAME:
    //   return {
    //     ...state,
    //     products: action.payload,
    //   };

    case GET_PRODUCTS_BY_NAME:
      return {
        ...state,
        searchBar: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        products: AllBrands,
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

    default:
      return state;
  }
}

export default rootReducer;
