import { ADD_CART_ITEM, REMOVE_CART_ITEM, GET_CART } from "./types";

// Add TO Cart
export const addToCart = cartItem => dispatch => {
  dispatch({
    type: ADD_CART_ITEM,
    payload: cartItem
  });
};

export const getCart = () => dispatch => {
  dispatch({
    type: GET_CART,
    payload: JSON.parse(localStorage.getItem("Cart"))
  });
};

export const removeFromCart = id => dispatch => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id
  });
};
