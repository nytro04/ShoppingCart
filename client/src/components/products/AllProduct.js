import React, { Component } from "react";
import PropTypes from "prop-types";
import ProductItem from "./ProductItem";

class AllProduct extends Component {
  render() {
    const { products } = this.props;
    return products.map(product => (
      <ProductItem key={product._id} product={product} />
    ));
  }
}

AllProduct.propTypes = {
  products: PropTypes.array.isRequired
};

export default AllProduct;
