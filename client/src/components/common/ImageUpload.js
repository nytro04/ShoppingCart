import React, { Component, Fragment } from "react";

class ImageUpload extends Component {
  render() {
    return (
      <Fragment>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">
            Choose file
          </label>
        </div>
      </Fragment>
    );
  }
}

export default ImageUpload;
