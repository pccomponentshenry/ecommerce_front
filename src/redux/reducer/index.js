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
  UPDATE_FAVS,
  POST_USER,
  LOGOUT_USER,
  PUT_PRODUCT,
  CHANGE_PRODUCT_STATUS,
  GET_REVIEWS,
  POST_REVIEW,
  GET_PRODUCTS_FOR_SALE,
  GET_LOCATIONS,
  GET_USER,
  GET_USERS,
  SET_FROM_STRIPE,
  GET_ADDRESSES,
  GET_ADDRESS,
  POST_ADDRESS,
  UPDATE_ADDRESS,
  CHANGE_ADDRESS,
  CHANGE_DEFAULT_ADDRESS,
  DELETE_ADDRESS,
  GET_TOTAL_ORDERS,
  GET_ALL_ORDERS,
  GET_DETAIL_PURCHASES,
  PUT_USER,
  DARK_MODE,
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
  favs: [],
  locations: [],
  user: {},
  reviews: [],
  users: [],
  addresses: [],
  address: [],
  purchases: [],
  fromStripe: true,
  isDarkMode: true,
  allOrders: [],
  allOrdersOneByOne: [],
  detailsOrders: [],
};

initialState.cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : (initialState.cart = []);
initialState.favs = localStorage.getItem("favs")
  ? JSON.parse(localStorage.getItem("favs"))
  : (initialState.favs = []);

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

    case SEARCH_PRODUCT:
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

    case PUT_PRODUCT: {
      return {
        ...state,
        product: action.payload,
      };
    }

    case CHANGE_PRODUCT_STATUS: {
      return {
        ...state,
        productsForSale: state.productsForSale
          .map(prod => {
            if (Number(prod.id) === Number(action.payload.id)) {
              return { ...prod, status: action.payload.status };
            } else {
              return { ...prod };
            }
          })
          .sort((a, b) => {
            let fa = a.status,
              fb = b.status;

            if (fa === "active" && fb === "inactive") {
              return -1;
            }
            if (fa === "inactive" && fb === "active") {
              return 1;
            }
            if (fa === "active" && fb === "deleted") {
              return -1;
            }
            if (fa === "deleted" && fb === "active") {
              return 1;
            }
            if (fa === "inactive" && fb === "deleted") {
              return -1;
            }
            if (fa === "deleted" && fb === "inactive") {
              return 1;
            }
            return 0;
          }),
      };
    }

    case GET_PRODUCTS_FOR_SALE: {
      return {
        ...state,
        productsForSale: action.payload.sort((a, b) => {
          let fa = a.status,
            fb = b.status;

          if (fa === "active" && fb === "inactive") {
            return -1;
          }
          if (fa === "inactive" && fb === "active") {
            return 1;
          }
          if (fa === "active" && fb === "deleted") {
            return -1;
          }
          if (fa === "deleted" && fb === "active") {
            return 1;
          }
          if (fa === "inactive" && fb === "deleted") {
            return -1;
          }
          if (fa === "deleted" && fb === "inactive") {
            return 1;
          }
          return 0;
        }),
      };
    }

    //////////ADDRESSES////////
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

    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };

    case CHANGE_DEFAULT_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(a => {
          if (a.id === action.payload.id) {
            return { ...a, isDefault: true };
          } else {
            return { ...a, isDefault: false };
          }
        }),
      };

    case CHANGE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(a => {
          if (Number(a.id) === Number(action.payload.id)) {
            return { ...a, ...action.payload };
          } else {
            return { ...a };
          }
        }),
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(a => a.id !== action.payload),
      };

    case GET_LOCATIONS: {
      return {
        ...state,
        locations: action.payload,
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
        purchases: action.payload.sort((a, b) => {
          let fa = a.status,
            fb = b.status;

          if (fa === "completed" && fb === "cancelled") {
            return -1;
          }
          if (fa === "cancelled" && fb === "completed") {
            return 1;
          }
          return 0;
        }),
      };

    case SET_FROM_STRIPE: {
      return { ...state, fromStripe: false };
    }

    case UPDATE_FAVS:
      return {
        ...state,
        favs: action.payload,
      };

    ////// USERS /////
    case POST_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

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
        reviews: action.payload,
      };
    case POST_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
      };

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
    case GET_DETAIL_PURCHASES:
      return {
        ...state,
        detailsOrders: action.payload,
      };
    case PUT_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case DARK_MODE: {
      return { ...state, isDarkMode: action.payload };
    }

    default:
      return state;
  }
}

export default rootReducer;
