//import {} from "../actions/index"; //Para las action creators

const initialState = {
  product: [],
  allProduct: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        product: action.payload,
        allProduct: action.payload,
      };
    case "SEARCH_PRODUCT":
      return {
        ...state,
        product: action.payload,
      };
    case "ORDER_BY_NAME":
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
  }
}

export default rootReducer;
