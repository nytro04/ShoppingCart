import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { auth, product } = this.props;
    return (
      <div className="container">
        <div className="row" id="ads">
          <div className="col-md-4">
            <div className="card rounded">
              <div className="card-image">
                <span className="card-notify-badge">{product.name}</span>
                {/* <span className="card-notify-year">2018</span> */}
                <img
                  className="img-fluid"
                  src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262"
                  // src={product.image}
                  alt="Alternate Text"
                />
              </div>
              <div className="card-image-overlay m-auto">
                {/* <span className="card-detail-badge">Used</span> */}
                <span className="card-detail-badge mx-1">{product.name}</span>
                <span className="card-detail-badge mx-1">
                  $ {product.price}
                </span>
              </div>
              <div className="card-body text-center">
                <div className="ad-title m-auto">
                  <h5>{product.description}...</h5>
                </div>
                <a className="ad-btn mx-1" href="#">
                  <i class="fas fa-shopping-cart" />
                </a>
                <a className="ad-btn mx-1" href="#">
                  <i class="fas fa-eye" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProductItem);
