import axios from "axios";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: "PROFILE_LOADING"
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: "CLEAR_CURRENT_PROFILE"
  };
};
