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
        <div className="react-md-preview-area">
          <div className="react-md-loader">Loading preview...</div>
        </div>
      )
    } else if (this.props.asHTML) {
      return (
        <div className="react-md-preview-area">
          {this.state.html}
        </div>
      )
    } else {
      return (
          <div
            className="react-md-preview-area"
            dangerouslySetInnerHTML={{__html: this.state.html}}>
          </div>
      )
    }
  }
}

MarkdownEditor.defaultProps = {
  markdown: "",
  asHTML: false
};

MarkdownEditor.propTypes = {
  markdown: PropTypes.string.isRequired,
  converter: PropTypes.func.isRequired,
  asHTML: PropTypes.bool.isRequired
}
