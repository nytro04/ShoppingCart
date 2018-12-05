const initialState = {
  products: [],
  product: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "PRODUCT_LOADING":
      return {
        ...state,
        loading: true
      };
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case "GET_PRODUCT":
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case "EDIT_PRODUCT":
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        )
      };
    default:
      return state;
  }
}
