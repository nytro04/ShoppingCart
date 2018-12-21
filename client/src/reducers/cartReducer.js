const initialState = {
  carts: [],
  cart: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        carts: [action.payload, ...state.carts]
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        carts: state.carts.filter(cartItem => cartItem._id !== action.payload)
      };
    default:
      return state;
  }
}
