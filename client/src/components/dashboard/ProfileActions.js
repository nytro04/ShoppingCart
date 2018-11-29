import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    //   TODO: This should go to admin dashboard to add new products
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Edit Profile
      </Link>
      <Link to="/add-product" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Add New Product
      </Link>
      <Link to="/add-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-info mr-1" /> Add Something
      </Link>
    </div>
  );
};

export default ProfileActions;
