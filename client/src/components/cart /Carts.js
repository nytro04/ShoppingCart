import React, { Component } from "react";
import { connect } from "react-redux";

class Cart extends Component {
  // onDeleteClick = id => {
  //   this.props.deleteProduct(id);
  // };
  render() {
    return (
      <div className="card card-body">
        <div className="row">
          <div className="col-md-2">
            <h5>image goes here</h5>
          </div>
          <div className="col md-4">
            <h3>Name and Description goes</h3>
          </div>
          <div className="col md-1">
            <h3>Price goes here</h3>
          </div>
          <div className="col md-1">
            <h3>Quantity input goes here</h3>
          </div>
          <div className="col md-1">
            <h3>Total of Price and quantity goes here</h3>
          </div>
          <div
            className="col md-1"
            // onClick={this.onDeleteClick.bind(this, cart._id)}
          >
            <i class="far fa-trash-alt" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(
  mapStateToProps,
  {}
)(Cart);
