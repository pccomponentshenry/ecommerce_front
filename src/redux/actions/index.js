import axios from "axios";
export const ALL_PRODUCTS = "ALL_PRODUCTS";

const url = "http://localhost:3001";

export function allProducts() {
    return function (dispatch) {
        axios.get('http://localhost:3001/products')
            .then((resp) => {
                dispatch({
                    type: ALL_PRODUCTS,
                    payload: resp.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
}