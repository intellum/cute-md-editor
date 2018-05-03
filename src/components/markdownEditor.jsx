import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Showdown, { Converter } from 'showdown';

import Toolbar from './toolbar';
import FileUpload from './fileUpload';
import SvgDefinitions from './svgDefinitions';


export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asHTML: this.props.asHTML,
      asMarkdodwn: this.props.asMarkdown,
      content: this.props.content
    };
    this.converter = new Converter();
    this.toolbarButtons = [
      {
        icon: 'embed2',
        callback: this.appendCodeBlock.bind(this),
        tooltip: 'Format as code block'
      },
      {
        icon: 'link',
        callback: this.handleLinkButton.bind(this),
        tooltip: 'Format as link'
      },
      {
        icon: 'bold',
        callback: this.handleBoldButton.bind(this),
        tooltip: 'Bold text'
      },
      {
        icon: 'italic',
        callback: this.handleItalicButton.bind(this),
        tooltip: 'Italicised text'
      },
      {
        icon: 'quotes-left',
        callback: this.handleQuoteButton.bind(this),
        tooltip: 'Format as quote'
      },
      {
        icon: 'list2',
        callback: this.handleUnorderedList.bind(this),
        tooltip: 'Format as unordered list'
      },
      {
        icon: 'list-numbered',
        callback: this.handleOrderedList.bind(this),
        tooltip: 'Format as ordered list'
      }
    ];
  }

  renderedHTML(content) {
    return {
      __html: this.converter.makeHtml(content)
    };
  }

  appendCodeBlock() {
    const codeBlock = "\n```\n\n```";
    this.insertContent(codeBlock, 5);
  }

  insertContent(newContent, cursorEndPosition = null) {
    const cursorPosition = this.refs.textArea.selectionStart;
    const { content } = this.state;

    this.setState({
      content: content.slice(0, cursorPosition) + newContent + content.substr(cursorPosition)
    }, () => {
      this.refs.textArea.focus();
      this.refs.textArea.selectionEnd = cursorPosition + (cursorEndPosition || newContent.length);
    });
  }

  handleFileUpload(path) {
    this.insertContent(`![](${path})`);
  }

  handleLinkButton() {
    const link = "[](url)";
    this.insertContent(link)
  }

  handleBoldButton() {
    const boldText = "****";
    this.insertContent(boldText, 2);
  }
  
  handleItalicButton() {
    const italicText = "**";
    this.insertContent(italicText, 1);
  }

  handleQuoteButton() {
    this.insertContent("> ");
  }

  handleUnorderedList() {
    const ul = "- item1\n- item2\n- item3";
    this.insertContent(ul);
  }
  
  handleOrderedList() {
    const ol = "1. item1\n2. item2\n3. item3";
    this.insertContent(ol);
  }

  render() {
    const { asHTML, asMarkdown, content } = this.state;

    return (
      <div className="react-md-container" >
        <SvgDefinitions />
        <Toolbar
          isPreview={!asMarkdown}
          showMarkdown={(asMarkdown) => this.setState({ asMarkdown: asMarkdown })}
          handleCheck={() => this.setState({ asHTML: !this.state.asHTML })}
          toolbarButtons={this.toolbarButtons}
          asHTML={asHTML} />

        {
          asMarkdown &&
          asHTML &&
          <div className="react-md-preview-area">
            {this.converter.makeHtml(content)}
          </div>
        }
        {
          asMarkdown &&
          !asHTML &&
          <div
            className="react-md-preview-area"
            dangerouslySetInnerHTML={this.renderedHTML(content)}>
          </div>
        }
        <FileUpload
          hidden={asMarkdown}
          callback={(files) => this.props.onFileUpload(files)}
          removeCallback={(path) => this.props.onFileRemoved(path)}
          uploadComplete={(files) => this.handleFileUpload(files)}>
          {/* Always keeping this mounted so that undo/redo works with ctrl-z */}
          <textarea
            hidden={asMarkdown}
            ref="textArea"
            className="react-md-textarea"
            onChange={(event) => this.setState({ content: event.target.value }) }
            value={content} />
        </FileUpload>
        <textarea
          readOnly
          id={this.props.elementId}
          name={this.props.elementName}
          hidden={true}
          value={content} />
      </div>
    );
  }
}

MarkdownEditor.defaultProps = {
  content: "",
  elementId: "",
  elementId: "",
  asMarkdown: false,
  asHTML: false
};

MarkdownEditor.propTypes = {
  content: PropTypes.string,
  asMarkdown: PropTypes.bool,
  asMarkdown: PropTypes.bool,
  elementId: PropTypes.string,
  elementName: PropTypes.string,
  uploadCallback: PropTypes.func,
  removeCallback: PropTypes.func
};
