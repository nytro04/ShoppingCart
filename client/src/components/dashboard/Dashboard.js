import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "./ProfileActions";
// import Info from "./Info";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = e => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has a profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              {/* Welcome <Link to={`/profile/${profile.name}`}>{user.name}</Link>{" "} */}
              <p className="lead text-muted">Welcome {user.name}</p>
            </p>
            <ProfileActions />
            {/* TODO: Something must go here */}
            {/* <Info info={profile} /> */}
            <div className="info">
              <h3 className="text-info">Account Info</h3>
              <hr />
              <p>
                <strong className="text-muted">Name: </strong>
                {user.name}
              </p>
              <p>{user.email}</p>
              <hr />
              <h3 className="mt-4 text-info">Shipping Info</h3>
              <hr />
              {/* TODO: Add labels and style with bootstap */}
              <p>
                <strong className="text-muted">Country: </strong>
                {profile.country}
              </p>
              <p>
                <strong className="text-muted">Location: </strong>
                {profile.location}
              </p>
              <p>
                <strong className="text-muted">Address: </strong>
                {profile.address}
              </p>
              <p>
                <strong className="text-muted">Phone: </strong>
                {profile.phone}
              </p>
            </div>

            <hr className="mt-5" />
            <div style={{ marginBottom: "60px" }} />
            <button onClick={this.onDeleteClick} className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>Please set a profile to continue check out</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
