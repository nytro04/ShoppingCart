import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-2">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <a>
              <i className="fab fa-facebook mr-3" />
            </a>
            <a>
              <i className="fab fa-twitter mr-3" />
            </a>
            <a>
              <i className="fab fa-instagram mr-3" />
            </a>
          </div>
          <div className="col-md-4 mb-4">
            Copyright &copy; {new Date().getFullYear()}
            <a href="#"> ShopDemo</a>
          </div>
          <div className="col-md-4 mb-4">
            <a>
              <i className="fas fa-home mr-3" />
            </a>
            <a>
              <i className="fas fa-users mr-3" />
            </a>
            <a>
              <i className="fas fa-phone mr-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
