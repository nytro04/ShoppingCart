import React, { Fragment } from "react";

const ImageUpload = ({ imagesHandler }) => {
  return (
    <Fragment>
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          imagesHandler={imagesHandler}
        />
      </div>
    </Fragment>
  );
};

export default ImageUpload;
