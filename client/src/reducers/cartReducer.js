import {
  CART_LOADING,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  GET_CART
} from "../actions/types";

const initialState = {
  cart: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    // case CART_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    case ADD_CART_ITEM:
      let cartState = JSON.parse(localStorage.getItem("Cart"));
      cartState = cartState ? cartState : [];

      localStorage.setItem(
        "Cart",
        JSON.stringify([...cartState, action.payload])
      );

      return {
        ...state,
        cart: JSON.parse(localStorage.getItem("Cart"))
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case REMOVE_CART_ITEM:
      return {
        cart: state.cart.filter(cartItem => cartItem._id !== action.payload)
      };
    default:
      return state;
  }
}
