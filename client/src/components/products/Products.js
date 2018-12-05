import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProducts } from "../../actions/productActions";
import ProductItem from "./ProductItem";
import AllProduct from "./AllProduct";

class Products extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;
    let productContent;

    if (products === null || loading) {
      productContent = <Spinner />;
    } else {
      productContent = <AllProduct products={products} />;
    }

    return (
      <div className="products">
        <div className="container">
          <div className="row">{productContent}</div>
        </div>
      </div>
    );
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(Products);
