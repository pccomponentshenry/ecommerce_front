import { GET_PRODUCTS } from "../actions/index"; //Para las action creators

const initialState = {
  getProducts: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        getProducts: action.payload,
      };
  }
}

export default rootReducer;
