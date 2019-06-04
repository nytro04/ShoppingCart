import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart } from "../../actions/cartAction";

class CartItem extends Component {
  onDeleteClick = id => {
    console.log(id);
    this.props.removeFromCart(id);
  };

  render() {
    const { itemInCart } = this.props;

    return (
      <div
        className="card-body"
        style={{ paddingTop: "5px", paddingBottom: "5px" }}
      >
        <div className="row">
          <div className="col-12 col-sm-12 col-md-2 text-center">
            <img
              className="img-responsive"
              src="http://placehold.it/120x80"
              alt="prewiew"
              width="120"
              height="80"
            />
          </div>
          <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
            <h6 className="product-name">
              <strong>{itemInCart.name}</strong>
            </h6>
            <p>
              <small>{itemInCart.description}</small>
            </p>
          </div>
          <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div
              className="col-3 col-sm-3 col-md-6 text-md-right"
              style={{ paddingTop: "5px" }}
            >
              <h6>
                <strong>
                  {itemInCart.price} <span className="text-muted">x</span>
                </strong>
              </h6>
            </div>
            <div className="col-4 col-sm-4 col-md-4">
              <div className="quantity">
                <input type="button" value="+" className="plus" />
                <input
                  type="number"
                  step="1"
                  max="99"
                  min="1"
                  value="1"
                  title="Qty"
                  className="qty"
                  size="4"
                />
                <input type="button" value="-" className="minus" />
              </div>
            </div>
            <div className="col-2 col-sm-2 col-md-2 text-right">
              <button
                onClick={this.onDeleteClick.bind(this, itemInCart._id)}
                type="button"
                className="btn btn-outline-danger btn-xs"
              >
                <i className="fa fa-trash" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

CartItem.propTypes = {
  itemInCart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { removeFromCart }
)(CartItem);

// export default CartItem;
