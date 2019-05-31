import React, { Component } from "react";
import PropTypes from "prop-types";
import CartItem from "./CartItem";

class AllCart extends Component {
  render() {
    const { cart } = this.props;

    return cart.map(itemInCart => (
      <CartItem key={itemInCart._id} itemInCart={itemInCart} />
    ));
  }
}

AllCart.propTypes = {
  cart: PropTypes.array.isRequired
};

export default AllCart;
