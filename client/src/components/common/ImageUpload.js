import React from "react";

const ImageUpload = ({ imagesHandler }) => {
  return (
    <div>
      <div className="custom-file mb-4">
        <input
          type="file"
          id="customFile"
          className="custom-file-input"
          onChange={imagesHandler}
        />
        <label class="custom-file-label" for="customFile">
          Choose image
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
