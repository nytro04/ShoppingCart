import React, { Component } from "react";
import { connect } from "react-redux";
import { getCart } from "../../actions/cartAction";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AllCart from "./AllCart";

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  onDeleteClick = id => {
    this.props.remoteItem(id);
  };

  render() {
    const { cart, loading } = this.props.cart;

    let cartContent;

    if (cart === null) {
      cartContent = <div>No items in Cart</div>;
    } else {
      cartContent = <AllCart cart={cart} />;
    }

    return (
      <div className="card shopping-cart">
        <div className="card-header bg-dark text-light">
          <i className="fa fa-shopping-cart" aria-hidden="true" /> Items In Cart
        </div>
        <div>{cartContent}</div>
        <hr />

        <div className="card-footer">
          <div className="mr-auto" style={{ margin: "10px" }}>
            <a href="" className="btn btn-success pull-right">
              Checkout
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  getCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { getCart }
)(Cart);
