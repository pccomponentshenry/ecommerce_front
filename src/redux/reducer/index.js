
import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
  ORDER_BY_NAME,
  ALL_PRODUCTS,
  GET_BRANDS,
  GET_CATEGORIES,
  FILTER_CATEGORIES,
  FILTER_BRANDS
} from "../actions/actionNames"; //Para las action creators

const initialState = {
  products: [],
  product: [],
  brands: [],
  categories: [],
  brand: [],
  filter:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filter: action.payload
      };

    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload
      }
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
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

    case FILTER_CATEGORIES:
      let FilterCat= [...state.filter]
      let AllType = action.payload === 'ALLCAT' ? FilterCat : FilterCat?.filter(e => e.category.name == action.payload)

      return {
        ...state,
        products: AllType
      };

      case FILTER_BRANDS:
      let FilterBrand= [...state.filter]
      let AllBrands = action.payload === 'ALLBRAND' ? FilterBrand : FilterBrand?.filter(e => e.brand.name == action.payload)

      return {
        ...state,
        products: AllBrands
      }

    default:
      return state

  }
}

export default rootReducer;
