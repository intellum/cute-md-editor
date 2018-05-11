import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Toolbar from './toolbar';
import FileUpload from './fileUpload';
import SvgDefinitions from './svgDefinitions';
import Preview from './preview';

class PasteHandler {
  onPaste(func) {
    this.onPasteCallback = func;
  }

  pasteTriggered(event) {
    if (this.onPasteCallback) {
      this.onPasteCallback(event);
    }
  }
}

export default class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.pasteHandler = new PasteHandler();

    this.state = {
      asHTML: this.props.asHTML,
      asMarkdown: this.props.asMarkdown,
      content: this.props.content,
      contentHistory: {
        past: [],
        future: []
      },
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
    this.addTextAreaHistory(this.state.content);

    const {applyAtLineStart = false, applyMultiline = false, toggle = false, selectionEndOffset = null, selectionLength = null} = options;

    const cursorStart     = this.refs.textArea.selectionStart,
          { content }     = this.state,
          scrollPosition  = this.refs.textArea.scrollTop;

    var newContent      = "",
        isRemoved       = false,
        previousContent = content.slice(0, cursorStart),
        selectedContent = content.substr(cursorStart, this.refs.textArea.selectionEnd - cursorStart),
        cursorEnd       = this.refs.textArea.selectionEnd;

    if (selectedContent.match(/\n$/ig)) {
      selectedContent = selectedContent.replace(/\n$/ig, "");
      cursorEnd -= 1;
    }

    if (toggle &&
      content.substr(cursorStart - contentLeft.length, contentLeft.length) == contentLeft &&
      content.substr(cursorEnd, contentRight.length) == contentRight) {
      previousContent = previousContent.substr(0, previousContent.length - contentLeft.length);
      cursorEnd = cursorEnd + contentRight.length;
      newContent = selectedContent;
      isRemoved = true;
    } else if (applyAtLineStart) {
      var innerContent = "";

      if (cursorStart > 0 && content.substr(cursorStart - 1, 1) != "\n") {
        const lastNewLineIndex = previousContent.lastIndexOf("\n");

        if (lastNewLineIndex > -1) {
          previousContent = content.slice(0, lastNewLineIndex + 1);
        } else {
          previousContent = "";
        }
        innerContent = content.slice(lastNewLineIndex + 1, cursorStart) + selectedContent;
      } else {
        innerContent = selectedContent;
      }

      if (applyMultiline && innerContent.length > 0 && (innerContent.match(/\n/g) || []).length >= 1) {
        newContent = innerContent.split("\n").map((l) => {
          return contentLeft + l + contentRight;
        }).join("\n");
      } else {
        newContent = contentLeft + innerContent + contentRight;
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
        var selectionStart = previousContent.length + (isRemoved ? 0 : contentLeft.length),
            selectionEnd = previousContent.length + newContent.length - (isRemoved ? 0 : contentRight.length);

        if (selectionEndOffset && selectionLength) {
          selectionStart = selectionEnd + selectionEndOffset;
          selectionEnd = selectionStart + selectionLength;
        }
        this.refs.textArea.selectionStart = selectionStart;
        this.refs.textArea.selectionEnd = selectionEnd;
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
    this.applyTag("[", "](url)", {selectionEndOffset: 2, selectionLength: 3})
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

  handleKeyDown(ev) {
    if ((ev.which === 90 && ev.shiftKey && (ev.ctrlKey || ev.altKey || ev.metaKey))) {
      ev.preventDefault();
      this.handleRedo();
    } else if ((ev.which === 90 && (ev.ctrlKey || ev.altKey || ev.metaKey))) {
      ev.preventDefault();
      this.handleUndo();
    } else if ((ev.which === 66 && (ev.ctrlKey || ev.metaKey))) {
      ev.preventDefault();
      this.handleBoldButton();
    } else if ((ev.which === 73 && (ev.ctrlKey || ev.metaKey))) {
      ev.preventDefault();
      this.handleItalicButton();
    } else if ((ev.which === 75 && (ev.ctrlKey || ev.metaKey))) {
      ev.preventDefault();
      this.handleLinkButton();
    }
  }

  handlePaste(event) {
    this.pasteHandler.pasteTriggered(event);
  }

  handleUndo() {
    if (this.state.contentHistory.past.length === 0) {
      return;
    }
    var { past, future } = this.state.contentHistory;
    future.unshift(this.state.content);

    var nextState = {
      content: past.pop(),
      contentHistory: {
        past: past,
        future: future
      }
    }
    this.setState(nextState);
  }

  handleRedo() {
    if (this.state.contentHistory.future.length === 0) {
      return;
    }
    var { past, future } = this.state.contentHistory;
    past.push(this.state.content);

    var nextState = {
      content: future.shift(),
      contentHistory: {
        past: past,
        future: future
      }
    }
    this.setState(nextState);
  }


  componentDidMount() {
    this.refs.textArea.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.refs.textArea.addEventListener('paste', this.handlePaste.bind(this));
  }

  componentWillUnmount() {
    this.refs.textArea.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.refs.textArea.removeEventListener('paste', this.handlePaste.bind(this));
  }

  onTextAreaChange(event) {
    this.setState({ content: event.target.value });

    if (this.lastRegisteredHistory === undefined || this.lastRegisteredHistory < Date.now() - 3000) {
      this.addTextAreaHistory(this.state.content);
    }
  }

  addTextAreaHistory(content) {
    this.lastRegisteredHistory = Date.now();
    const past = this.state.contentHistory.past.slice(Math.max(this.state.contentHistory.past.length - 10, 0)).concat([content]);
    this.setState({
      contentHistory: {
        past: past,
        future: []
      }
    });
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
          pasteHandler={this.pasteHandler}
          hidden={asMarkdown}
          markdownGuideUrl={this.props.markdownGuideUrl}
          showUploadedFiles={this.props.showUploadedFiles}
          onFileUpload={(files, callback) => this.props.onFileUpload(files, callback)}
          onFileRemoved={(path) => this.props.onFileRemoved(path)}
          onUploadComplete={(path, name, type) => this.handleFileUpload(path, name, type)}>
          {/* Always keeping this mounted so that undo/redo works with ctrl-z */}
          <textarea
            hidden={asMarkdown}
            ref="textArea"
            className="react-md-textarea"
            onChange={(event) => this.onTextAreaChange(event)}
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
