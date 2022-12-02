export const GET_PRODUCTS = "GET_PRODUCTS";
export const POST_PRODUCT = "POST_PRODUCT";
const url = "http://localhost:3001";

export const getProducts = () => dispatch => {
  return fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(res => {
      dispatch({ type: GET_PRODUCTS, payload: res });
    })
    .catch(e => console.log(e));
};
