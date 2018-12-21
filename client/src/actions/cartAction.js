// Add TO Cart
export const addToCart = cartItem => {
  // axios call to backend goes here
  return {
    type: "ADD_TO_CART",
    payload: cartItem
  };
};

export const RemoveItem = id => {
  // axios call to backend goes here
  return {
    type: "REMOVE_ITEM",
    payload: id
  };
};
