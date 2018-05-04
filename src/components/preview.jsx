import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      html: ""
    }
  }

  componentDidMount() {
    this.props.converter(this.props.markdown).
      then((html) => this.setState({html: html})).
      catch((err) => this.setState({html: `Error: ${err.toString()}`}))
  }

  render() {
    if (this.props.asHTML) {
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
