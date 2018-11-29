import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  state = {
    title: "",
    country: "",
    location: "",
    address: "",
    phone: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // if profile field doesnt exist, make empty string
      profile.title = !isEmpty(profile.title) ? profile.title : "";
      profile.country = !isEmpty(profile.country) ? profile.country : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.address = !isEmpty(profile.address) ? profile.address : "";
      profile.phone = !isEmpty(profile.phone) ? profile.phone : "";

      // set component fields state
      this.setState({
        title: profile.title,
        country: profile.country,
        location: profile.location,
        address: profile.address,
        phone: profile.phone
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      title: this.state.title,
      country: this.state.country,
      location: this.state.location,
      address: this.state.address,
      phone: this.state.phone
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    // Select options for title
    const options = [
      { label: "Select title", value: "title" },
      { label: "Mr", value: "Mr" },
      { label: "Ms", value: "Ms" },
      { label: "Mrs", value: "Mrs" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* required fields</small>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  options={options}
                  error={errors.title}
                  info="Title here"
                />
                <TextFieldGroup
                  placeholder="country"
                  name="country"
                  value={this.state.country}
                  onChange={this.onChange}
                  error={errors.country}
                  info="Please provide your country"
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City (eg. Adabraka, Circle ...)"
                />
                <TextFieldGroup
                  placeholder="* Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                  info="Address"
                />
                <TextFieldGroup
                  placeholder="* Phone number"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Phone number"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
