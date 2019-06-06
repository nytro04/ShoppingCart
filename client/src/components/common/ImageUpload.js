import React from "react";

const ImageUpload = ({ imagesHandler }) => {
  return (
    <div>
      <div className="custom-file mb-4">
        <input
          type="file"
          id="customFile"
          className="custom-file-input"
          imagesHandler={imagesHandler}
        />
        <label class="custom-file-label" for="customFile">
          Choose file
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
