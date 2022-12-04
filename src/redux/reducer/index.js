import { ALL_PRODUCTS} from "../actions/index"; //Para las action creators

const initialState = {
  products: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };
            
            default:
              return state
  }
}

export default rootReducer;
