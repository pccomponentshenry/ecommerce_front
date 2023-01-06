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
  ADD_ONE_TO_CART,
  UPDATE_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ALL_FROM_CART,
  GET_PURCHASES,
  CLEAR_ERROR,
  ADD_TO_FAV,
  POST_USER,
  LOGOUT_USER,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  GET_REVIEWS,
  POST_REVIEW,
  GET_PRODUCTS_FOR_SALE,
  GET_LOCATIONS,
  POST_ADDRESS,
  GET_USER,
  GET_USERS,
  GET_ADDRESSES,
  SET_FROM_STRIPE,
  GET_ADDRESS,
  UPDATE_ADDRESS,
  GET_TOTAL_ORDERS,
  GET_ALL_ORDERS
} from "../actions/actionNames";

const initialState = {
  products: [],
  productsForSale: [],
  product: [],
  brands: [],
  categories: [],
  brand: [],
  error: [],
  filtered: [],
  cart: [],
  fav: [],
  locations: [],
  user: {},
  reviews: [],
  users: [],
  addresses: [],
  address: [],
  purchases: [],
  fromStripe: true,
  allOrders:[],
  allOrdersOneByOne:[],
};

initialState.cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : (initialState.cart = []);
initialState.fav = localStorage.getItem("fav")
  ? JSON.parse(localStorage.getItem("fav"))
  : (initialState.fav = []);

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
    case GET_ADDRESSES: {
      return {
        ...state,
        addresses: action.payload,
      };
    }
    case GET_ADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case POST_ADDRESS: {
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    }
    case PUT_PRODUCT: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case GET_LOCATIONS: {
      return {
        ...state,
        locations: action.payload,
      };
    }
    case DELETE_PRODUCT: {
      return {
        ...state,
      };
    }

    case GET_PRODUCTS_FOR_SALE: {
      return {
        ...state,
        productsForSale: action.payload,
      };
    }

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
      return {
        ...state,
        error: [],
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //////////CART////////
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: [],
      };

    case ADD_ONE_TO_CART:
      const cart = state.cart.map(item => {
        if (item.id === action.payload.id) {
          const quant = item.quantity + 1;
          return { ...item, quantity: quant };
        } else {
          return { ...item };
        }
      });

      if (!cart.find(item => item.id === action.payload.id)) {
        const newItem = { ...action.payload };
        newItem.quantity = 1;
        cart.push(newItem);
      }

      return {
        ...state,
        cart,
      };

    case REMOVE_ONE_FROM_CART:
      return {
        ...state,
        cart: state.cart
          .map(item => {
            if (item.id === action.payload.id) {
              const quant = item.quantity - 1;
              return { ...item, quantity: quant };
            } else {
              return { ...item };
            }
          })
          .filter(item => item.quantity !== 0),
      };

    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case GET_PURCHASES:
      return {
        ...state,
        purchases: action.payload,
      };

    case SET_FROM_STRIPE: {
      return { ...state, fromStripe: false };
    }

    case ADD_TO_FAV:
      return {
        ...state,
        fav: action.payload,
      };

    ////// USERS /////
    // case POST_USER: {
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    // }
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        user: {},
      };
    }
    ////REVIEWS////
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }
    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload]
      }
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
      ///////////dashboard////////
      case GET_TOTAL_ORDERS:
        return {
          ...state,
          allOrders: action.payload,
        };
        case GET_ALL_ORDERS:
          return {
            ...state,
            allOrdersOneByOne: action.payload,
          };

    default:
      return state;
  }
}

export default rootReducer;
