import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from './toolbar';
import FileUpload from './fileUpload';
import SvgDefinitions from './svgDefinitions';
import Preview from './preview';

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      asHTML: this.props.asHTML,
      asMarkdown: this.props.asMarkdown,
      content: this.props.content,
      htmlContent: "",
      toolbarOptions: this.props.toolbarOptions || ['preview-as-html', 'code', 'link', 'headers', 'italic', 'quote', 'unordered-list', 'ordered-list']
    };

    this.toolbarButtons = [
      {
        id: 'code',
        icon: 'embed2',
        callback: this.appendCodeBlock.bind(this),
        tooltip: 'Format as code block'
      },
      {
        id: 'link',
        icon: 'link',
        callback: this.handleLinkButton.bind(this),
        tooltip: 'Format as link'
      },
      {
        id: 'headers',
        icon: 'headers',
        tooltip: 'Choose header size',
        dropdownOptions: [
          { onClick: this.handleHeader.bind(this, "#"), className: "react-md-header-1", text: "Header" },
          { onClick: this.handleHeader.bind(this, "##"), className: "react-md-header-2", text: "Header" },
          { onClick: this.handleHeader.bind(this, "###"), className: "react-md-header-3", text: "Header" }
        ]
      },
      {
        id: 'bold',
        icon: 'bold',
        callback: this.handleBoldButton.bind(this),
        tooltip: 'Bold text'
      },
      {
        id: 'italic',
        icon: 'italic',
        callback: this.handleItalicButton.bind(this),
        tooltip: 'Italicised text'
      },
      {
        id: 'quote',
        icon: 'quotes-left',
        callback: this.handleQuoteButton.bind(this),
        tooltip: 'Format as quote'
      },
      {
        id: 'unordered-list',
        icon: 'list2',
        callback: this.handleUnorderedList.bind(this),
        tooltip: 'Format as unordered list'
      },
      {
        id: 'ordered-list',
        icon: 'list-numbered',
        callback: this.handleOrderedList.bind(this),
        tooltip: 'Format as ordered list'
      }
    ];
  }

  appendCodeBlock() {
    this.insertContent("\n```\n", "\n```");
  }

  insertContent(contentLeft, contentRight = "", applyToEachLine = false) {
    const cursorStart  = this.refs.textArea.selectionStart,
          cursorEnd    = this.refs.textArea.selectionEnd,
          { content }  = this.state,
          selectedContent = content.substr(cursorStart, cursorEnd - cursorStart);
    var newContent;

    if (applyToEachLine && selectedContent.length > 0 && (selectedContent.match(/\n/g) || []).length > 1) {
      var lines = selectedContent.split("\n");
      newContent = lines.map((l) => {
        return contentLeft + l + contentRight;
      }).join("\n");
    } else {
      newContent = contentLeft + selectedContent + contentRight;
    }

    this.setState({
      content: content.slice(0, cursorStart) + newContent + content.substr(cursorEnd)
    }, () => {
      this.refs.textArea.focus();
      if (selectedContent.length == 0) {
        this.refs.textArea.selectionEnd = cursorStart + contentLeft.length;
      } else {
        this.refs.textArea.selectionEnd = cursorEnd + contentLeft.length + contentRight.length;
      }
    });
  }

  handleFileUpload(path, name, type) {
    // Images can be rendered inline
    if (type.split("/")[0] == "image") {
      this.insertContent(`![${name}](${path})`);
    } else {
      this.insertContent(`[${name}](${path})`);
    }
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
    this.insertContent("> ", "", true);
  }

  handleUnorderedList() {
    this.insertContent("- ", "", true);
  }

  handleOrderedList() {
    this.insertContent("1. ", "", true);
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
          toolbarOptions={this.state.toolbarOptions}
          asHTML={asHTML} />

        {asMarkdown &&
        <Preview
          markdown={this.state.content}
          previewClass={this.props.previewClass}
          converter={this.props.converter}
          asHTML={asHTML} />
        }

        <FileUpload
          hidden={asMarkdown}
          showUploadedFiles={this.props.showUploadedFiles}
          onFileUpload={(files) => this.props.onFileUpload(files)}
          onFileRemoved={(path) => this.props.onFileRemoved(path)}
          onUploadComplete={(path, name, type) => this.handleFileUpload(path, name, type)}>
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
  elementName: "",
  asMarkdown: false,
  asHTML: false,
  previewClass: "",
  showUploadedFiles: true
};

MarkdownEditor.propTypes = {
  content: PropTypes.string,
  previewClass: PropTypes.string,
  asMarkdown: PropTypes.bool,
  showUploadedFiles: PropTypes.bool,
  elementId: PropTypes.string,
  elementName: PropTypes.string,
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  onFileRemoved: PropTypes.func,
  onFileUpload: PropTypes.func.isRequired,
  converter: PropTypes.func.isRequired,
};
