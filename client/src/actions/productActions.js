import axios from "axios";

// Add Product
export const addProduct = (productData, history) => dispatch => {
  axios
    .post("api/products", productData)
    .then(
      res => history.push("/products")
      // dispatch({
      //   type: "ADD_PRODUCT",
      //   payload: res.data
      // })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

// Get Products
export const getProducts = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("api/products")
    .then(res =>
      dispatch({
        type: "GET_PRODUCTS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PRODUCTS",
        payload: null
      })
    );
};

// Set Loading State
export const setProductLoading = () => {
  return {
    type: "PRODUCT_LOADING"
  };
};
