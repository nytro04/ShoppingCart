import axios from "axios";

// Get Current Product
export const getCurrentProduct = () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get("/api/product")
    .then(res =>
      dispatch({
        type: "GET_PRODUCT",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PRODUCT",
        payload: {}
      })
    );
};

// Add Product
export const addProduct = (productData, history) => dispatch => {
  axios
    .post("api/products", productData)
    .then(res => history.push("/products"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

// Edit Product
export const editProduct = (productData, id, history) => dispatch => {
  axios
    .put(`api/products/${id}`, productData)
    .then(res => history.push("/products"))
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

// GET PRODUCT
export const getProduct = id => dispatch => {
  dispatch(setProductLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: "GET_PRODUCT",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PRODUCT",
        payload: null
      })
    );
};

// Delete Product
export const deleteProduct = id => dispatch => {
  if (window.confirm("Are you sure? This action CAN NOT be undone")) {
    axios
      .delete(`/api/products/${id}`)
      .then(res =>
        dispatch({
          type: "DELETE_PRODUCT",
          payload: id
        })
      )
      .catch(err =>
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        })
      );
  }
};

// Set Loading State
export const setProductLoading = () => {
  return {
    type: "PRODUCT_LOADING"
  };
};
