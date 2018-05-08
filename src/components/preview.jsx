import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: "",
      loaded: false
    }
  }

  componentDidMount() {
    this.props.converter(this.props.markdown).
      then((html) => this.setState({html: html, loaded: true})).
      catch((err) => this.setState({html: `Error: ${err.toString()}`}))
  }

  render() {
    if (this.state.loaded === false) {
      return (
        <div className={`react-md-preview-area ${this.props.previewClass}`}>
          <div className="react-md-loader">Loading preview...</div>
        </div>
      )
    } else if (this.props.asHTML) {
      return (
        <div className={`react-md-preview-area ${this.props.previewClass}`}>
          {this.state.html}
        </div>
      )
    } else {
      return (
          <div
            className={`react-md-preview-area ${this.props.previewClass}`}
            dangerouslySetInnerHTML={{__html: this.state.html}}>
          </div>
      )
    }
  }
}

MarkdownEditor.defaultProps = {
  markdown: "",
  asHTML: false,
  previewClass: ""
};

MarkdownEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  converter: PropTypes.func.isRequired,
  asHTML: PropTypes.bool.isRequired
}
