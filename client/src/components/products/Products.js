import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getProducts } from "../../actions/productActions";
import ProductItem from "./ProductItem";

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
      productContent = products.map(product => (
        <ProductItem key={product._id} product={product} />
      ));
    }

    return (
      <div className="products">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{productContent}</div>
          </div>
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
