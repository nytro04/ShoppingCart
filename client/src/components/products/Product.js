import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getProduct } from "../../actions/productActions";
// import ProductItem from "./ProductItem";

class Product extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product, loading } = this.props;
    let productContent;

    if (product === null || loading || Object.keys(product).length === 0) {
      productContent = <Spinner />;
    } else {
      productContent = (
        <div>
          <section className="section-content bg padding-y-sm">
            <div className="container">
              <div className="row">
                <div className="col-xl-10 col-md-9 col-sm-12">
                  <main className="card">
                    <div className="row no-gutters">
                      <aside className="col-sm-6 border-right">
                        <article className="gallery-wrap">
                          <div className="img-big-wrap">
                            <div>
                              {" "}
                              <img
                                className="img-fluid"
                                src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262"
                                // src={product.image}
                                alt="Alternate Text"
                              />
                            </div>
                          </div>
                        </article>
                      </aside>
                      <aside className="col-sm-6">
                        <article className="card-body">
                          <h3 className="title mb-3">
                            {product.products.name}
                          </h3>

                          <div className="mb-3">
                            <var className="price h3 text-primary">
                              US $ {product.products.price}
                            </var>
                          </div>
                          <dl>
                            <dt>Description</dt>
                            <dd>
                              <p>{product.products.description} </p>
                            </dd>
                          </dl>
                          <hr />
                          <div className="row">
                            <div className="col-sm-5">
                              <dl className="dlist-inline">
                                <dt>Quantity: </dt>
                                <dd>
                                  <select
                                    className="form-control form-control-sm"
                                    style={{ width: "70px" }}
                                  />
                                </dd>
                              </dl>
                            </div>
                          </div>
                          <hr />

                          <Link to="/carts" className="btn  btn-outline-dark">
                            {" "}
                            Add To Cart{" "}
                          </Link>
                          <Link to="#" className="btn  btn-outline-dark mx-3">
                            CheckOut{" "}
                          </Link>
                        </article>
                      </aside>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

    return (
      <div className="product">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/products" className="btn btn-light mb-3">
                Back to Products
              </Link>
              {productContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProduct }
)(Product);
