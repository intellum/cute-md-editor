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
        icon: 'headers',
        tooltip: 'Choose header size',
        dropdownOptions: [
          (<li key={1} onClick={this.handleHeader.bind(this, "# ")} className="react-md-dropdown-option react-md-header-1">Header</li>),
          (<li key={2} onClick={this.handleHeader.bind(this, "## ")} className="react-md-dropdown-option react-md-header-2">Header</li>),
          (<li key={3} onClick={this.handleHeader.bind(this, "### ")} className="react-md-dropdown-option react-md-header-3">Header</li>)
        ]
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
    this.insertContent("\n```\n", "\n```");
  }

  insertContent(contentLeft, contentRight = "") {
    const cursorStart  = this.refs.textArea.selectionStart,
          cursorEnd    = this.refs.textArea.selectionEnd,
          { content }  = this.state,
          selectedWord = content.substr(cursorStart, cursorEnd - cursorStart)

    this.setState({
      content: content.slice(0, cursorStart) + contentLeft + selectedWord + contentRight + content.substr(cursorEnd)
    }, () => {
      this.refs.textArea.focus();
      if (selectedWord.length == 0) {
        this.refs.textArea.selectionEnd = cursorStart + contentLeft.length;
      } else {
        this.refs.textArea.selectionEnd = cursorEnd + contentLeft.length + contentRight.length;
      }
    });
  }

  handleFileUpload(path) {
    this.insertContent(`![](${path})`);
  }

  handleLinkButton() {
    const link = "[";
    this.insertContent("[", "](url)")
  }

  handleBoldButton() {
    this.insertContent("**", "**");
  }

  handleHeader(header) {
    this.insertContent(header);
  }

  handleItalicButton() {
    this.insertContent("*", "*");
  }

  handleQuoteButton() {
    this.insertContent("> ");
  }

  handleUnorderedList() {
    this.insertContent("- ");
  }

  handleOrderedList() {
    this.insertContent("1. ");
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
          onFileUpload={(files) => this.props.onFileUpload(files)}
          onFileRemoved={(path) => this.props.onFileRemoved(path)}
          onUploadComplete={(files) => this.handleFileUpload(files)}>
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
