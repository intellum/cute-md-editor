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
          { onClick: this.handleHeader.bind(this, "# "), className: "react-md-header-1", text: "Header" },
          { onClick: this.handleHeader.bind(this, "## "), className: "react-md-header-2", text: "Header" },
          { onClick: this.handleHeader.bind(this, "### "), className: "react-md-header-3", text: "Header" }
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
    this.applyTag("\n```\n", "\n```");
  }

  applyTag(contentLeft, contentRight = "", options = {}) {
    const {applyAtLineStart = false, applyMultiline = false, toggle = false} = options;

    const cursorStart     = this.refs.textArea.selectionStart,
          { content }     = this.state,
          selectedContent = content.substr(cursorStart, this.refs.textArea.selectionEnd - cursorStart),
          scrollPosition  = this.refs.textArea.scrollTop;

    var newContent      = "",
        isRemoved       = false,
        previousContent = content.slice(0, cursorStart),
        cursorEnd       = this.refs.textArea.selectionEnd;

    if (toggle &&
      content.substr(cursorStart - contentLeft.length, contentLeft.length) == contentLeft &&
      content.substr(cursorEnd, contentRight.length) == contentRight) {
      previousContent = previousContent.substr(0, previousContent.length - contentLeft.length);
      cursorEnd = cursorEnd + contentRight.length;
      newContent = selectedContent;
      isRemoved = true;
    } else if (applyMultiline && selectedContent.length > 0 && (selectedContent.match(/\n/g) || []).length > 1) {
      var lines = selectedContent.split("\n");
      newContent = lines.map((l) => {
        return contentLeft + l + contentRight;
      }).join("\n");
    } else if (applyAtLineStart) {
      if (cursorStart > 0 && content.substr(cursorStart - 1, 1) != "\n") {
        const lastNewLineIndex = previousContent.lastIndexOf("\n");

        if (lastNewLineIndex > -1) {
          previousContent = content.slice(0, lastNewLineIndex + 1);
        } else {
          previousContent = "";
        }
        newContent = contentLeft + content.substr(lastNewLineIndex + 1, cursorStart) + selectedContent + contentRight;
      } else {
        newContent = contentLeft + selectedContent + contentRight;
      }
    } else {
      newContent = contentLeft + selectedContent + contentRight;
    }


    this.setState({
      content: previousContent + newContent + content.substr(cursorEnd)
    }, () => {
      this.refs.textArea.focus();
      this.refs.textArea.scrollTop = scrollPosition;
      if (selectedContent.length == 0) {
        this.refs.textArea.selectionEnd = previousContent.length + contentLeft.length;
      } else {
        this.refs.textArea.selectionStart = previousContent.length + (isRemoved ? 0 : contentLeft.length);
        this.refs.textArea.selectionEnd = previousContent.length + newContent.length - (isRemoved ? 0 : contentRight.length);
      }
    });
  }

  handleFileUpload(path, name, type) {
    // Images can be rendered inline
    if (type.split("/")[0] == "image") {
      this.applyTag(`![${name}](${path})`);
    } else {
      this.applyTag(`[${name}](${path})`);
    }
  }

  handleLinkButton() {
    const link = "[";
    this.applyTag("[", "](url)")
  }

  handleBoldButton() {
    this.applyTag("**", "**", {toggle: true});
  }

  handleHeader(header) {
    this.applyTag(header, "", {applyAtLineStart: true, toggle: false});
  }

  handleItalicButton() {
    this.applyTag("_", "_", {toggle: true});
  }

  handleQuoteButton() {
    this.applyTag("> ", "", {applyAtLineStart: true, applyMultiline: true});
  }

  handleUnorderedList() {
    this.applyTag("- ", "", {applyAtLineStart: true, applyMultiline: true});
  }

  handleOrderedList() {
    this.applyTag("1. ", "", {applyAtLineStart: true, applyMultiline: true});
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
          markdownGuideUrl={this.props.markdownGuideUrl}
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
  showUploadedFiles: true,
  markdownGuideUrl: "https://daringfireball.net/projects/markdown/syntax"
};

MarkdownEditor.propTypes = {
  content: PropTypes.string,
  previewClass: PropTypes.string,
  markdownGuideUrl: PropTypes.string,
  asMarkdown: PropTypes.bool,
  showUploadedFiles: PropTypes.bool,
  elementId: PropTypes.string,
  elementName: PropTypes.string,
  toolbarOptions: PropTypes.arrayOf(PropTypes.string),
  onFileRemoved: PropTypes.func,
  onFileUpload: PropTypes.func.isRequired,
  converter: PropTypes.func.isRequired,
};
