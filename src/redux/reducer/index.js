
import {
  GET_PRODUCT,
  SEARCH_PRODUCT,
  ORDER_BY_NAME,
  ALL_PRODUCTS,
  GET_BRANDS,
  ORDER_BY_PRICE_HL,
  ORDER_BY_PRICE_LH
} from "../actions/actionNames"; //Para las action creators

const initialState = {
  products: [],
  product: [],
  brands: [],
  brand: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    case ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload
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
    case ORDER_BY_PRICE_HL:
      console.log('entra bien');
      const productsSortPriceDesc=state.products.sort(function(b,a){
        if(parseInt( a.price)>parseInt( b.price)){
          return 1;
        }
        if(parseInt( a.price)<parseInt( b.price)){
          return -1;
        }
        return 0;
        })
        console.log(productsSortPriceDesc);
      return{
        ...state,
        products:productsSortPriceDesc
      }
    case ORDER_BY_PRICE_LH:
      const productsSortPriceAsc=state.products.sort(function(a,b){
        if(parseInt( a.price)>parseInt( b.price)){
          return 1;
        }
        if(parseInt( a.price)<parseInt( b.price)){
          return -1;
        }
        return 0;
        })
        console.log(productsSortPriceAsc);
      return{
        ...state,
        products:productsSortPriceAsc
      }
    default:
      return state

  }
}

export default rootReducer;
