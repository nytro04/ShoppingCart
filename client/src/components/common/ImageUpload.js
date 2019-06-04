import React, { Component, Fragment } from "react";
import axios from "axios";

class ImageUpload extends Component {
  state = {
    file: "",
    filename: "Choose File",
    uploadedFile: {}
  };

  onChange = e => {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name
    });

    const formData = new FormData();
    const config = { headers: { "content-type": "multipart/form-data" } };
    formData.append("file", this.state.file);

    axios
      .post("api/image/upload", formData, config)
      .then(res => {
        const { fileName, filePath } = res.data;
        this.setState({ uploadedFile: { fileName, filePath } });
      })
      .catch(err => console.log(err));
  };

  // this.setState({})

  render() {
    return (
      <Fragment>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={this.onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {this.state.filename}
          </label>
        </div>
      </Fragment>
    );
  }
}

export default ImageUpload;
