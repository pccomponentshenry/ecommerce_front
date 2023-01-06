import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import {
  GET_PRODUCT,
  GET_BRANDS,
  ALL_PRODUCTS,
  GET_CATEGORIES,
  POST_PRODUCT,
  SET_FILTERED,
  SET_ERROR,
  CLEAR_STATE,
  UPDATE_CART,
  ADD_ONE_TO_CART,
  REMOVE_ONE_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  REMOVE_ALL_FROM_CART,
  CLEAR_CART,
  CLEAR_ERROR,
  ADD_TO_FAV,
  POST_USER,
  LOGOUT_USER,
  POST_CART_ITEM,
  GET_REVIEWS,
  GET_PRODUCTS_FOR_SALE,
  PUT_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_STOCK,
  GET_LOCATIONS,
  POST_ADDRESS,
  GET_USER,
  GET_USERS,
  GET_ADDRESSES,
  SET_FROM_STRIPE,
  GET_PURCHASES,
  GET_ADDRESS,
  UPDATE_ADDRESS,
  POST_REVIEW,
  GET_TOTAL_ORDERS,
  GET_ALL_ORDERS
} from "../actions/actionNames";

const URL = "http://localhost:3001";
// const URL = "https://playexpertback-production.up.railway.app";

export function allProducts() {
  return function (dispatch) {
    axios
      .get(`${URL}/products`)
      .then(resp => {
        dispatch({
          type: ALL_PRODUCTS,
          payload: resp.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getBrands() {
  return async dispatch => {
    const res = await axios.get(`${URL}/brands`);
    return dispatch({ type: GET_BRANDS, payload: res.data });
  };
}

export function getCategories() {
  return async dispatch => {
    const res = await axios.get(`${URL}/categories`);
    return dispatch({ type: GET_CATEGORIES, payload: res.data });
  };
}

export function getLocations() {
  return async dispatch => {
    const res = await axios.get(`${URL}/locations`);
    return dispatch({ type: GET_LOCATIONS, payload: res.data });
  };
}

export function clearState() {
  return { type: CLEAR_STATE };
}

export const setFiltered = payload => {
  return { type: SET_FILTERED, payload };
};

export function getProductDetail(id) {
  return async dispatch => {
    const res = await axios.get(`${URL}/products/${id}`);
    return dispatch({ type: GET_PRODUCT, payload: res.data });
  };
}

export function getProductsByUser(id) {
  return async dispatch => {
    const res = await axios.get(`${URL}/products/user/${id}`);
    return dispatch({ type: GET_PRODUCTS_FOR_SALE, payload: res.data });
  };
}

export async function populateDB() {
  await axios.get(`${URL}/populateDB`);
}

export function filterProducts(category, brand, price, name) {
  let urlFilter = `?category=${category}&brand=${brand}&min_price=${price.min}&max_price=${price.max}&name=${name}`;

  return async function (dispatch) {
    try {
      const json = await axios.get(`${URL}/products/filter/${urlFilter}`);
      dispatch(setFiltered(json.data));
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: e });
      dispatch(setFiltered([]));
    }
  };
}

export const postProduct = payload => async dispatch => {
  try {
    const res = await axios.post(`${URL}/products`, payload);
    return dispatch({ type: POST_PRODUCT, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

export function putProduct(id, payload) {
  return async dispatch => {
    const res = await axios.put(`${URL}/products/${id}`, payload);
    return dispatch({ type: PUT_PRODUCT, payload: res.data });
  };
}

export function deleteProduct(id) {
  return async dispatch => {
    const res = await axios.delete(`${URL}/products/${id}`);
    return dispatch({ type: DELETE_PRODUCT, payload: res.data });
  };
}

export const updateProductsStock = userId => async dispatch => {
  try {
    const res = await axios.put(`${URL}/products/stock/${userId}`);
    dispatch({ type: UPDATE_STOCK, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

//////////CART////////
export const postCartItem = payload => async dispatch => {
  try {
    await axios.post(`${URL}/cartItem`, payload);
  } catch (error) {
    console.log(error);
  }
};

export const getUserCartItem = email => async dispatch => {
  try {
    const response = await axios.get(`${URL}/cartItem/${email}`);
    dispatch({ type: UPDATE_CART, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (item, authenticated) => dispatch => {
  if (authenticated) {
    dispatch({ type: ADD_ONE_TO_CART, payload: item });
  } else {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const existingElementIdx = cart.findIndex(el => el.id === item.id);

    const newCart = [...cart];

    if (existingElementIdx !== -1) {
      newCart[existingElementIdx].quantity++;
    } else {
      const addElement = { ...item };
      addElement.quantity = 1;
      newCart.push(addElement);
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

    dispatch({ type: UPDATE_CART, payload: newCart });
  }
};

export const removeFromCart = (item, removeItem) => dispatch => {
  if (localStorage.cart) {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const elementIdx = cart.findIndex(el => el.id === item.id);

    const newCart = [...cart];

    if (removeItem || newCart[elementIdx].quantity === 1) {
      newCart.splice(elementIdx, 1);
    } else {
      newCart[elementIdx].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(newCart));

    dispatch({ type: UPDATE_CART, payload: newCart });
  } else {
    removeItem
      ? dispatch({ type: REMOVE_ITEM_FROM_CART, payload: item })
      : dispatch({ type: REMOVE_ONE_FROM_CART, payload: item });
  }
};

export const clearCart = email => async dispatch => {
  dispatch({ type: REMOVE_ALL_FROM_CART });
  if (localStorage.cart) {
    localStorage.setItem("cart", []);
  } else {
    try {
      await axios.put(`${URL}/cartItem/${email}`);
    } catch (error) {
      console.log(error);
    }
  }
};

//////////CHECKOUT-ORDER////////
export const checkout = products => async () => {
  try {
    const stripePromise = loadStripe(
      "pk_test_51MCUPjIxZNdfrxaORwUsMY8yxCPm4xhLtIsruiYWFCGr2xN6NzNOR984Z0gGfM8l8u2blkELjULUs1rbClLtmW9A00QbQXD9FC"
    );
    const stripe = await stripePromise;
    const response = await fetch(`${URL}/order/checkout`, {
      method: "POST",
      body: JSON.stringify(products),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (error) {
    alert(error);
  }
};

export const postOrder = (userId, addressId, items) => async () => {
  try {
    const order = await axios.post(`${URL}/order`, { userId, addressId });
    const postOrderItem = async (orderId, item) => {
      await axios.post(`${URL}/order/item`, { orderId, item });
    };
    items.forEach(item => postOrderItem(order.data.id, item));
  } catch (error) {
    console.log(error);
  }
};

export const changeOrderStatus = (userId, status) => async () => {
  try {
    await axios.put(`${URL}/order/`, { userId, status });
  } catch (error) {
    console.log(error);
  }
};

export function getOrders(userId) {
  return async dispatch => {
    const res = await axios.get(`${URL}/order/${userId}`);
    return dispatch({ type: GET_PURCHASES, payload: res.data });
  };
}

export const setFromStripe = () => dispatch => {
  return dispatch({ type: SET_FROM_STRIPE });
};

//////////FAVORITES////////
export const addToFav = item => dispatch => {
  const fav = localStorage.getItem("fav")
    ? JSON.parse(localStorage.getItem("fav"))
    : [];
  const favId = localStorage.getItem(item.id)
    ? JSON.parse(localStorage.getItem(item.id))
    : [];
  const existingInFav = fav.find(el => el.id === item.id);

  const newFav = [...fav];

  let isFav = false;

  if (!existingInFav) {
    const addFavElement = { ...item };
    newFav.push(addFavElement);
    isFav = true;
    localStorage.setItem(item.id, JSON.stringify(isFav));
  } else {
    const elementIdx = fav.findIndex(el => el.id === item.id);
    newFav.splice(elementIdx, 1);
    isFav = false;
    localStorage.setItem(item.id, JSON.stringify(isFav));
  }
  localStorage.setItem("fav", JSON.stringify(newFav));
  dispatch({ type: ADD_TO_FAV, payload: newFav });
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

//////////USERS////////
export const postUser = payload => async dispatch => {
  try {
    dispatch({ type: POST_USER, payload });
    await axios.post(`${URL}/users`, payload);
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

export function getUser(email) {
  return async dispatch => {
    const res = await axios.get(`${URL}/users/${email}`);
    return dispatch({ type: GET_USER, payload: res.data });
  };
}

export function getUsers() {
  return async dispatch => {
    const res = await axios.get(`${URL}/users/`);
    return dispatch({ type: GET_USERS, payload: res.data });
  };
}

export const logoutUser = () => dispatch => {
  return dispatch({ type: LOGOUT_USER });
};

//////ADDRESS///
export function getAddresses(id) {
  return async dispatch => {
    const res = await axios.get(`${URL}/address/${id}`);
    return dispatch({ type: GET_ADDRESSES, payload: res.data });
  };
}

export function getAddressById(id, userId) {
  return async dispatch => {
    const res = await axios.get(`${URL}/address/${userId}/${id}`);
    return dispatch({ type: GET_ADDRESS, payload: res.data });
  };
}

export const postAddress = payload => async dispatch => {
  try {
    const res = await axios.post(`${URL}/address`, payload);
    return dispatch({ type: POST_ADDRESS, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};

export function updateAddress(payload) {
  return async () => {
    await axios.put(`${URL}/address`, payload);
  };
}

export function deleteAddress(id) {
  return async () => {
    await axios.put(`${URL}/address/${id}`);
  };
}

//REVIEWS
export function getReviews() {
  return async dispatch => {
    const res = await axios.get(`${URL}/review`);
    return dispatch({ type: GET_REVIEWS, payload: res.data });
  };
}
export const postReview = payload => async dispatch => {
  try {
    const res = await axios.post(`${URL}/review`, payload);
    return dispatch({ type: POST_REVIEW, payload: res.data });
  } catch (e) {
    return dispatch({ type: SET_ERROR, payload: e });
  }
};
///////////DASHBOARD/////
export function getAllOrders() {
  return async dispatch => {
    const res = await axios.get(`${URL}/order/products`);
    return dispatch({ type: GET_TOTAL_ORDERS, payload: res.data });
  };
}
export function getAllOrdersOneByOne() {
  return async dispatch => {
    const res = await axios.get(`${URL}/order`);
    return dispatch({ type: GET_ALL_ORDERS, payload: res.data });
  };
}