import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { editProduct, getCurrentProduct } from "../../actions/productActions";
import isEmpty from "../../validation/is-empty";

class ProductForm extends Component {
  state = {
    name: "",
    price: "",
    description: "",
    image: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProduct();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.product) {
      const product = nextProps.product;

      console.log(product);

      // if product field doesnt exist, make field empty string
      product.name = !isEmpty(product.name) ? product.name : "";
      product.description = !isEmpty(product.description)
        ? product.description
        : "";
      product.price = !isEmpty(product.price) ? product.price : "";
      product.image = !isEmpty(product.image) ? product.image : "";

      // set component fields state
      this.setState({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const editProduct = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image
    };

    const id = this.props.match.params.id;

    this.props.editProduct(editProduct, id, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="product-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Edit Product...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextFieldGroup
                  placeholder="name of product"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextAreaFieldGroup
                  placeholder="Brief description of the product"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <TextFieldGroup
                  placeholder="Picture of product"
                  name="image"
                  value={this.state.image}
                  onChange={this.onChange}
                  error={errors.image}
                />
              </div>
              <button className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  editProduct: PropTypes.func.isRequired,
  getCurrentProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  product: state.product,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editProduct, getCurrentProduct }
)(withRouter(ProductForm));
