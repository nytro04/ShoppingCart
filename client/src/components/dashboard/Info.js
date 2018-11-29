import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Info extends Component {
  render() {
    const info = this.props.info;
    console.log(info);
    return (
      <div className="container">
        <div className="personal-info">
          <h3>{info.name}</h3>
        </div>
      </div>
    );
  }
}

export default connect(null)(Info);
