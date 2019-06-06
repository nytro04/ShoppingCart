import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../actions/productActions";
import { addToCart } from "../../actions/cartAction";

class ProductItem extends Component {
  // adds cart item to cart list
  HandleAddToCart = () => {
    this.props.addToCart(this.props.product);
    // console.log(this.props.product);
  };

  onDeleteClick = id => {
    this.props.deleteProduct(id);
  };

  render() {
    const { auth, product } = this.props;
    // console.log(cart);
    return (
      <div className="container">
        <div className="row" id="ads">
          <div className="card rounded">
            <div className="card-image">
              {product.user === auth.user.id ? (
                <Link
                  className="card-notify-badge"
                  to={`/edit-product/${product._id}`}
                >
                  {/* <i class="fas fa-edit" /> */}
                  <i class="fas fa-pencil-alt" />
                </Link>
              ) : null}

              {product.user === auth.user.id ? (
                <span
                  onClick={this.onDeleteClick.bind(this)}
                  className="card-notify-delete"
                >
                  <i class="far fa-trash-alt" />
                </span>
              ) : null}

              <img
                className="img-fluid"
                src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262"
                // src={product.image}
                alt="Alternate Text"
              />
            </div>
            <div className="card-image-overlay m-auto">
              {/* <span className="card-detail-badge">Used</span> */}
              <span className="card-detail-badge">{product.name}</span>

              <span className="card-detail-badge mx-1">$ {product.price}</span>
            </div>
            <div className="card-body text-center">
              <div className="ad-title m-auto">
                <p>{product.description}...</p>
              </div>
              <span onClick={this.HandleAddToCart} className="ad-btn mx-1">
                <i class="fas fa-cart-plus" />
              </span>
              <Link className="ad-btn mx-1" to={`/product/${product._id}`}>
                <i className="fas fa-eye" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  deleteProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(
  mapStateToProps,
  { deleteProduct, addToCart }
)(ProductItem);
