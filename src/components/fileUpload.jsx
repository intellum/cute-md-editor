import React, { Component }  from 'react';

const resetDropZoneStyles = (e) => {
  e.target.classList.remove("react-md-textarea-drag");
}

const noneShallPass = (e) => {
  e.stopPropagation();
  e.preventDefault();
};

const handleDragEnter = (e) => {
  noneShallPass(e);
  e.target.classList.add("react-md-textarea-drag");
}

const handleDragLeave = (e) => {
  noneShallPass(e);
  resetDropZoneStyles(e);
}

const handleDragOver = (e) => {
  noneShallPass(e);
};


class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: []
    };
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  addFile(path) {
    if (!this.state.uploadedFiles.find(p => p === path)) {
      this.setState({
        uploadedFiles: [...this.state.uploadedFiles, path]
      });
    }
  }

  removeFile(path) {
    this.props.onFileRemoved(path)
      .then(res => {
        if (res.status === 200) {
          const index = this.state.uploadedFiles.findIndex(p => path === p);

          this.setState({
            uploadedFiles: [
              ...this.state.uploadedFiles.slice(0, index),
              ...this.state.uploadedFiles.slice(index + 1)
            ]
          });
        }
      })
      .catch(error => this.setError(error));
  }

  handleDrop(e, uploadComplete) {
    noneShallPass(e);
    const files = e.dataTransfer.files;
    resetDropZoneStyles(e);
    this.uploadFileList(files);
  }

  uploadFileList(fileList) {
    this.props.onFileUpload(fileList)
      .then(res => {
        // Automatic compatibility with Axios
        if (res.data) {
          const path = res.data.replace(/"/g,"");
          this.addFile(path);
          this.props.onUploadComplete(path, fileList[0].name, fileList[0].type);
        } else {
          const path = res.replace(/"/g,"");
          this.addFile(path);
          this.props.onUploadComplete(path, fileList[0].name, fileList[0].type);
        }
      }).catch(error => this.setError(error));
  }

  setError(error) {
    this.setState({error: error.toString()});
    setTimeout(() => this.setState({error: null}), 15000);
  }

  onFileUploadedFromDialog(event) {
    this.uploadFileList(event.target.files);
  }

  showFileUploadDialog() {
    this.refs.fileInput.click();
  }

  render() {
    const { hidden, children, showUploadedFiles, onFileRemoved } = this.props;
    var uploadedFiles;

    if (showUploadedFiles) {
      uploadedFiles = this.state.uploadedFiles.map((f, i) =>
        <li key={i}>
          {f}&nbsp;
          {onFileRemoved &&
            <span className="react-md-remove-btn" onClick={() => this.removeFile(f)}>remove</span>
          }
        </li>
      );
    } else {
      uploadedFiles = [];
    }

    return (
      <div className="react-md-dropzone-wrap">
        <input type="file" ref="fileInput" onChange={this.onFileUploadedFromDialog.bind(this)} style={{display: "none"}} />
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => this.handleDrop(e)}>
          {children}
        </div>
        <div className="react-md-dropzone-info" style={{display: hidden ? "none" : "inherit"}}>
          <span>Add files by dragging and dropping into the editor, or <a href="#" onClick={this.showFileUploadDialog.bind(this)}>click to upload a file</a></span>
          {showUploadedFiles && this.state.uploadedFiles.length ? <ul>{uploadedFiles}</ul> : null}
          {this.state.error &&
              <div className="react-md-error">Error: {this.state.error}</div>
          }
        </div>
      </div>
    );
  }
}

export default FileUpload;
