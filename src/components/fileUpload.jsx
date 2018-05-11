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
      uploadedFiles: [],
      uploadingFiles: []
    };
    this.addFile = this.addFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.fileId = 0;
  }

  componentDidMount() {
    this.props.pasteHandler.onPaste((event) => {
      let clipboardData = event.clipboardData || window.clipboardData;
      if (clipboardData && clipboardData.files.length > 0) {
        this.uploadFileList(clipboardData.files);
      }
    });
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
    this.fileId++;
    const fileId = this.fileId;

    this.uploadProgressUpdate(fileId, 0, fileList[0].name);

    this.props.onFileUpload(fileList, this.uploadProgressUpdate.bind(this, fileId))
      .then(res => {
        this.markUploadAsStopped(fileId);
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
      }).catch(error => {
        this.markUploadAsStopped(fileId);
        this.setError(error)
      });
  }

  markUploadAsStopped(id) {
    var { uploadingFiles } = this.state;
    this.setState({uploadingFiles: uploadingFiles.filter((f) => f.id != id)});
  }

  uploadProgressUpdate(id, progress, name = null) {
    var { uploadingFiles } = this.state,
        file = uploadingFiles.find((f) => f.id == id);
    if (file) {
      file.progress = progress;
    } else {
      uploadingFiles.push({id: id, name: name, progress: progress});
    }

    this.setState({uploadingFiles: uploadingFiles});
  }

  setError(error) {
    this.setState({error: error.toString().replace(/error: /i, "")});
    setTimeout(() => this.setState({error: null}), 15000);
  }

  onFileUploadedFromDialog(event) {
    this.uploadFileList(event.target.files);
  }

  showFileUploadDialog() {
    this.refs.fileInput.click();
  }

  render() {
    const { hidden, children, showUploadedFiles, onFileRemoved, markdownGuideUrl } = this.props;
    var uploadedFiles, uploadingFiles;

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

    uploadingFiles = this.state.uploadingFiles.map((f, i) =>
      <li key={i}>
        Uploading {f.name}
        <span className="react-md-progress">
          <span className="react-md-progress-value" style={{width: f.progress + "%"}}></span>
        </span>
        {f.progress}%
      </li>
    );

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
          <div className="react-md-info-text">
            <span className="react-md-file-guide">Add files by dragging and dropping into the editor, or <a href="#" onClick={this.showFileUploadDialog.bind(this)}>click to upload a file</a></span>
            <a className="react-md-markdown-guide" href={markdownGuideUrl} target="_blank">markdown guide</a>
          </div>
          {uploadingFiles && uploadingFiles.length > 0 &&
              <ul>{uploadingFiles}</ul>
          }
          {showUploadedFiles && showUploadedFiles.length > 0 &&
              <ul>{uploadedFiles}</ul>
          }
          {this.state.error &&
              <div className="react-md-error">Error: {this.state.error}</div>
          }
        </div>
      </div>
    );
  }
}

export default FileUpload;
