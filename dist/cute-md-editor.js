(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["cute-md-editor"] = factory(require("react"));
	else
		root["cute-md-editor"] = factory(root["react"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(19)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(18)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _toolbar = __webpack_require__(12);

var _toolbar2 = _interopRequireDefault(_toolbar);

var _fileUpload = __webpack_require__(9);

var _fileUpload2 = _interopRequireDefault(_fileUpload);

var _svgDefinitions = __webpack_require__(11);

var _svgDefinitions2 = _interopRequireDefault(_svgDefinitions);

var _preview = __webpack_require__(10);

var _preview2 = _interopRequireDefault(_preview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownEditor = function (_Component) {
  _inherits(MarkdownEditor, _Component);

  function MarkdownEditor(props) {
    _classCallCheck(this, MarkdownEditor);

    var _this = _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).call(this, props));

    _this.state = {
      asHTML: _this.props.asHTML,
      asMarkdown: _this.props.asMarkdown,
      content: _this.props.content,
      contentHistory: {
        past: [],
        future: []
      },
      htmlContent: "",
      toolbarOptions: _this.props.toolbarOptions || ['preview-as-html', 'code', 'link', 'headers', 'italic', 'quote', 'unordered-list', 'ordered-list']
    };

    _this.toolbarButtons = [{
      id: 'code',
      icon: 'embed2',
      callback: _this.appendCodeBlock.bind(_this),
      tooltip: 'Format as code block'
    }, {
      id: 'link',
      icon: 'link',
      callback: _this.handleLinkButton.bind(_this),
      tooltip: 'Format as link'
    }, {
      id: 'headers',
      icon: 'headers',
      tooltip: 'Choose header size',
      dropdownOptions: [{ onClick: _this.handleHeader.bind(_this, "# "), className: "react-md-header-1", text: "Header" }, { onClick: _this.handleHeader.bind(_this, "## "), className: "react-md-header-2", text: "Header" }, { onClick: _this.handleHeader.bind(_this, "### "), className: "react-md-header-3", text: "Header" }]
    }, {
      id: 'bold',
      icon: 'bold',
      callback: _this.handleBoldButton.bind(_this),
      tooltip: 'Bold text'
    }, {
      id: 'italic',
      icon: 'italic',
      callback: _this.handleItalicButton.bind(_this),
      tooltip: 'Italicised text'
    }, {
      id: 'quote',
      icon: 'quotes-left',
      callback: _this.handleQuoteButton.bind(_this),
      tooltip: 'Format as quote'
    }, {
      id: 'unordered-list',
      icon: 'list2',
      callback: _this.handleUnorderedList.bind(_this),
      tooltip: 'Format as unordered list'
    }, {
      id: 'ordered-list',
      icon: 'list-numbered',
      callback: _this.handleOrderedList.bind(_this),
      tooltip: 'Format as ordered list'
    }];
    return _this;
  }

  _createClass(MarkdownEditor, [{
    key: 'appendCodeBlock',
    value: function appendCodeBlock() {
      this.applyTag("\n```\n", "\n```");
    }
  }, {
    key: 'applyTag',
    value: function applyTag(contentLeft) {
      var _this2 = this;

      var contentRight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var _options$applyAtLineS = options.applyAtLineStart,
          applyAtLineStart = _options$applyAtLineS === undefined ? false : _options$applyAtLineS,
          _options$applyMultili = options.applyMultiline,
          applyMultiline = _options$applyMultili === undefined ? false : _options$applyMultili,
          _options$toggle = options.toggle,
          toggle = _options$toggle === undefined ? false : _options$toggle;
      var cursorStart = this.refs.textArea.selectionStart,
          content = this.state.content,
          selectedContent = content.substr(cursorStart, this.refs.textArea.selectionEnd - cursorStart),
          scrollPosition = this.refs.textArea.scrollTop;


      var newContent = "",
          isRemoved = false,
          previousContent = content.slice(0, cursorStart),
          cursorEnd = this.refs.textArea.selectionEnd;

      if (toggle && content.substr(cursorStart - contentLeft.length, contentLeft.length) == contentLeft && content.substr(cursorEnd, contentRight.length) == contentRight) {
        previousContent = previousContent.substr(0, previousContent.length - contentLeft.length);
        cursorEnd = cursorEnd + contentRight.length;
        newContent = selectedContent;
        isRemoved = true;
      } else if (applyMultiline && selectedContent.length > 0 && (selectedContent.match(/\n/g) || []).length > 1) {
        var lines = selectedContent.split("\n");
        newContent = lines.map(function (l) {
          return contentLeft + l + contentRight;
        }).join("\n");
      } else if (applyAtLineStart) {
        if (cursorStart > 0 && content.substr(cursorStart - 1, 1) != "\n") {
          var lastNewLineIndex = previousContent.lastIndexOf("\n");

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
      }, function () {
        _this2.registerTextAreaChange(_this2.state.content, true);
        _this2.refs.textArea.focus();
        _this2.refs.textArea.scrollTop = scrollPosition;
        if (selectedContent.length == 0) {
          _this2.refs.textArea.selectionEnd = previousContent.length + contentLeft.length;
        } else {
          _this2.refs.textArea.selectionStart = previousContent.length + (isRemoved ? 0 : contentLeft.length);
          _this2.refs.textArea.selectionEnd = previousContent.length + newContent.length - (isRemoved ? 0 : contentRight.length);
        }
      });
    }
  }, {
    key: 'handleFileUpload',
    value: function handleFileUpload(path, name, type) {
      // Images can be rendered inline
      if (type.split("/")[0] == "image") {
        this.applyTag('![' + name + '](' + path + ')');
      } else {
        this.applyTag('[' + name + '](' + path + ')');
      }
    }
  }, {
    key: 'handleLinkButton',
    value: function handleLinkButton() {
      var link = "[";
      this.applyTag("[", "](url)");
    }
  }, {
    key: 'handleBoldButton',
    value: function handleBoldButton() {
      this.applyTag("**", "**", { toggle: true });
    }
  }, {
    key: 'handleHeader',
    value: function handleHeader(header) {
      this.applyTag(header, "", { applyAtLineStart: true, toggle: false });
    }
  }, {
    key: 'handleItalicButton',
    value: function handleItalicButton() {
      this.applyTag("_", "_", { toggle: true });
    }
  }, {
    key: 'handleQuoteButton',
    value: function handleQuoteButton() {
      this.applyTag("> ", "", { applyAtLineStart: true, applyMultiline: true });
    }
  }, {
    key: 'handleUnorderedList',
    value: function handleUnorderedList() {
      this.applyTag("- ", "", { applyAtLineStart: true, applyMultiline: true });
    }
  }, {
    key: 'handleOrderedList',
    value: function handleOrderedList() {
      this.applyTag("1. ", "", { applyAtLineStart: true, applyMultiline: true });
    }
  }, {
    key: 'handleUndoMixinKeyDown',
    value: function handleUndoMixinKeyDown(ev) {
      if (document.activeElement == this.refs.textArea) {
        if (ev.which === 90 && ev.shiftKey && (ev.ctrlKey || ev.altKey || ev.metaKey)) {
          ev.preventDefault();
          this.handleRedo();
        } else if (ev.which === 90 && (ev.ctrlKey || ev.altKey || ev.metaKey)) {
          ev.preventDefault();
          this.handleUndo();
        }
      }
    }
  }, {
    key: 'handleUndo',
    value: function handleUndo() {
      if (this.state.contentHistory.past.length === 0) {
        return;
      }
      var _state$contentHistory = this.state.contentHistory,
          past = _state$contentHistory.past,
          future = _state$contentHistory.future;

      future.unshift(this.state.content);

      var nextState = {
        content: past.pop(),
        contentHistory: {
          past: past,
          future: future
        }
      };
      this.setState(nextState);
    }
  }, {
    key: 'handleRedo',
    value: function handleRedo() {
      if (this.state.contentHistory.future.length === 0) {
        return;
      }
      var _state$contentHistory2 = this.state.contentHistory,
          past = _state$contentHistory2.past,
          future = _state$contentHistory2.future;

      past.push(this.state.content);

      var nextState = {
        content: future.shift(),
        contentHistory: {
          past: past,
          future: future
        }
      };
      this.setState(nextState);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keydown', this.handleUndoMixinKeyDown.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.handleUndoMixinKeyDown.bind(this));
    }
  }, {
    key: 'onTextAreaChange',
    value: function onTextAreaChange(event) {
      this.setState({ content: event.target.value });
      this.registerTextAreaChange(event.target.value);
    }
  }, {
    key: 'registerTextAreaChange',
    value: function registerTextAreaChange(content) {
      var forceHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!forceHistory && this.lastHistoryRegistered && this.lastHistoryRegistered > Date.now() - 3000) {
        return;
      }

      this.lastHistoryRegistered = Date.now();
      var past = this.state.contentHistory.past.slice(Math.max(this.state.contentHistory.past.length - 10, 0)).concat([content]);
      this.setState({
        contentHistory: {
          past: past,
          future: []
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          asHTML = _state.asHTML,
          asMarkdown = _state.asMarkdown,
          content = _state.content;


      return _react2.default.createElement(
        'div',
        { className: 'react-md-container' },
        _react2.default.createElement(_svgDefinitions2.default, null),
        _react2.default.createElement(_toolbar2.default, {
          isPreview: !asMarkdown,
          showMarkdown: function showMarkdown(asMarkdown) {
            return _this3.setState({ asMarkdown: asMarkdown });
          },
          handleCheck: function handleCheck() {
            return _this3.setState({ asHTML: !_this3.state.asHTML });
          },
          toolbarButtons: this.toolbarButtons,
          toolbarOptions: this.state.toolbarOptions,
          asHTML: asHTML }),
        asMarkdown && _react2.default.createElement(_preview2.default, {
          markdown: this.state.content,
          previewClass: this.props.previewClass,
          converter: this.props.converter,
          asHTML: asHTML }),
        _react2.default.createElement(
          _fileUpload2.default,
          {
            hidden: asMarkdown,
            markdownGuideUrl: this.props.markdownGuideUrl,
            showUploadedFiles: this.props.showUploadedFiles,
            onFileUpload: function onFileUpload(files) {
              return _this3.props.onFileUpload(files);
            },
            onFileRemoved: function onFileRemoved(path) {
              return _this3.props.onFileRemoved(path);
            },
            onUploadComplete: function onUploadComplete(path, name, type) {
              return _this3.handleFileUpload(path, name, type);
            } },
          _react2.default.createElement('textarea', {
            hidden: asMarkdown,
            ref: 'textArea',
            className: 'react-md-textarea',
            onChange: function onChange(event) {
              return _this3.onTextAreaChange(event);
            },
            value: content })
        ),
        _react2.default.createElement('textarea', {
          readOnly: true,
          id: this.props.elementId,
          name: this.props.elementName,
          hidden: true,
          value: content })
      );
    }
  }]);

  return MarkdownEditor;
}(_react.Component);

exports.default = MarkdownEditor;


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
  content: _propTypes2.default.string,
  previewClass: _propTypes2.default.string,
  markdownGuideUrl: _propTypes2.default.string,
  asMarkdown: _propTypes2.default.bool,
  showUploadedFiles: _propTypes2.default.bool,
  elementId: _propTypes2.default.string,
  elementName: _propTypes2.default.string,
  toolbarOptions: _propTypes2.default.arrayOf(_propTypes2.default.string),
  onFileRemoved: _propTypes2.default.func,
  onFileUpload: _propTypes2.default.func.isRequired,
  converter: _propTypes2.default.func.isRequired
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(14);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(20)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./styles.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./styles.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var resetDropZoneStyles = function resetDropZoneStyles(e) {
  e.target.classList.remove("react-md-textarea-drag");
};

var noneShallPass = function noneShallPass(e) {
  e.stopPropagation();
  e.preventDefault();
};

var handleDragEnter = function handleDragEnter(e) {
  noneShallPass(e);
  e.target.classList.add("react-md-textarea-drag");
};

var handleDragLeave = function handleDragLeave(e) {
  noneShallPass(e);
  resetDropZoneStyles(e);
};

var handleDragOver = function handleDragOver(e) {
  noneShallPass(e);
};

var FileUpload = function (_Component) {
  _inherits(FileUpload, _Component);

  function FileUpload(props) {
    _classCallCheck(this, FileUpload);

    var _this = _possibleConstructorReturn(this, (FileUpload.__proto__ || Object.getPrototypeOf(FileUpload)).call(this, props));

    _this.state = {
      uploadedFiles: []
    };
    _this.addFile = _this.addFile.bind(_this);
    _this.removeFile = _this.removeFile.bind(_this);
    return _this;
  }

  _createClass(FileUpload, [{
    key: "addFile",
    value: function addFile(path) {
      if (!this.state.uploadedFiles.find(function (p) {
        return p === path;
      })) {
        this.setState({
          uploadedFiles: [].concat(_toConsumableArray(this.state.uploadedFiles), [path])
        });
      }
    }
  }, {
    key: "removeFile",
    value: function removeFile(path) {
      var _this2 = this;

      this.props.onFileRemoved(path).then(function (res) {
        if (res.status === 200) {
          var index = _this2.state.uploadedFiles.findIndex(function (p) {
            return path === p;
          });

          _this2.setState({
            uploadedFiles: [].concat(_toConsumableArray(_this2.state.uploadedFiles.slice(0, index)), _toConsumableArray(_this2.state.uploadedFiles.slice(index + 1)))
          });
        }
      }).catch(function (error) {
        return _this2.setError(error);
      });
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(e, uploadComplete) {
      noneShallPass(e);
      var files = e.dataTransfer.files;
      resetDropZoneStyles(e);
      this.uploadFileList(files);
    }
  }, {
    key: "uploadFileList",
    value: function uploadFileList(fileList) {
      var _this3 = this;

      this.props.onFileUpload(fileList).then(function (res) {
        // Automatic compatibility with Axios
        if (res.data) {
          var path = res.data.replace(/"/g, "");
          _this3.addFile(path);
          _this3.props.onUploadComplete(path, fileList[0].name, fileList[0].type);
        } else {
          var _path = res.replace(/"/g, "");
          _this3.addFile(_path);
          _this3.props.onUploadComplete(_path, fileList[0].name, fileList[0].type);
        }
      }).catch(function (error) {
        return _this3.setError(error);
      });
    }
  }, {
    key: "setError",
    value: function setError(error) {
      var _this4 = this;

      this.setState({ error: error.toString().replace(/error: /i, "") });
      setTimeout(function () {
        return _this4.setState({ error: null });
      }, 15000);
    }
  }, {
    key: "onFileUploadedFromDialog",
    value: function onFileUploadedFromDialog(event) {
      this.uploadFileList(event.target.files);
    }
  }, {
    key: "showFileUploadDialog",
    value: function showFileUploadDialog() {
      this.refs.fileInput.click();
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _props = this.props,
          hidden = _props.hidden,
          children = _props.children,
          showUploadedFiles = _props.showUploadedFiles,
          onFileRemoved = _props.onFileRemoved,
          markdownGuideUrl = _props.markdownGuideUrl;

      var uploadedFiles;

      if (showUploadedFiles) {
        uploadedFiles = this.state.uploadedFiles.map(function (f, i) {
          return _react2.default.createElement(
            "li",
            { key: i },
            f,
            "\xA0",
            onFileRemoved && _react2.default.createElement(
              "span",
              { className: "react-md-remove-btn", onClick: function onClick() {
                  return _this5.removeFile(f);
                } },
              "remove"
            )
          );
        });
      } else {
        uploadedFiles = [];
      }

      return _react2.default.createElement(
        "div",
        { className: "react-md-dropzone-wrap" },
        _react2.default.createElement("input", { type: "file", ref: "fileInput", onChange: this.onFileUploadedFromDialog.bind(this), style: { display: "none" } }),
        _react2.default.createElement(
          "div",
          {
            onDragEnter: handleDragEnter,
            onDragLeave: handleDragLeave,
            onDragOver: handleDragOver,
            onDrop: function onDrop(e) {
              return _this5.handleDrop(e);
            } },
          children
        ),
        _react2.default.createElement(
          "div",
          { className: "react-md-dropzone-info", style: { display: hidden ? "none" : "inherit" } },
          _react2.default.createElement(
            "div",
            { className: "react-md-info-text" },
            _react2.default.createElement(
              "span",
              { className: "react-md-file-guide" },
              "Add files by dragging and dropping into the editor, or ",
              _react2.default.createElement(
                "a",
                { href: "#", onClick: this.showFileUploadDialog.bind(this) },
                "click to upload a file"
              )
            ),
            _react2.default.createElement(
              "a",
              { className: "react-md-markdown-guide", href: markdownGuideUrl, target: "_blank" },
              "markdown guide"
            )
          ),
          showUploadedFiles && this.state.uploadedFiles.length ? _react2.default.createElement(
            "ul",
            null,
            uploadedFiles
          ) : null,
          this.state.error && _react2.default.createElement(
            "div",
            { className: "react-md-error" },
            "Error: ",
            this.state.error
          )
        )
      );
    }
  }]);

  return FileUpload;
}(_react.Component);

exports.default = FileUpload;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MarkdownEditor = function (_Component) {
  _inherits(MarkdownEditor, _Component);

  function MarkdownEditor(props) {
    _classCallCheck(this, MarkdownEditor);

    var _this = _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).call(this, props));

    _this.state = {
      html: "",
      loaded: false
    };
    return _this;
  }

  _createClass(MarkdownEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.converter(this.props.markdown).then(function (html) {
        return _this2.setState({ html: html, loaded: true });
      }).catch(function (err) {
        return _this2.setState({ html: 'Error: ' + err.toString() });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.loaded === false) {
        return _react2.default.createElement(
          'div',
          { className: 'react-md-preview-area ' + this.props.previewClass },
          _react2.default.createElement(
            'div',
            { className: 'react-md-loader' },
            'Loading preview...'
          )
        );
      } else if (this.props.asHTML) {
        return _react2.default.createElement(
          'div',
          { className: 'react-md-preview-area ' + this.props.previewClass },
          this.state.html
        );
      } else {
        return _react2.default.createElement('div', {
          className: 'react-md-preview-area ' + this.props.previewClass,
          dangerouslySetInnerHTML: { __html: this.state.html } });
      }
    }
  }]);

  return MarkdownEditor;
}(_react.Component);

exports.default = MarkdownEditor;


MarkdownEditor.defaultProps = {
  markdown: "",
  asHTML: false,
  previewClass: ""
};

MarkdownEditor.propTypes = {
  markdown: _propTypes2.default.string.isRequired,
  converter: _propTypes2.default.func.isRequired,
  asHTML: _propTypes2.default.bool.isRequired
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgDefinitions = function SvgDefinitions() {
  return _react2.default.createElement(
    "svg",
    { style: { position: "absolute", width: 0, height: 0, overflow: "hidden" }, version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
    _react2.default.createElement(
      "defs",
      null,
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-quotes-left", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "quotes-left"
        ),
        _react2.default.createElement("path", { d: "M7.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.357-0.056 0.724-0.086 1.097-0.086zM25.031 14c3.866 0 7 3.134 7 7s-3.134 7-7 7-7-3.134-7-7l-0.031-1c0-7.732 6.268-14 14-14v4c-2.671 0-5.182 1.040-7.071 2.929-0.364 0.364-0.695 0.751-0.995 1.157 0.358-0.056 0.724-0.086 1.097-0.086z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-list-numbered", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "list-numbered"
        ),
        _react2.default.createElement("path", { d: "M12 26h20v4h-20zM12 14h20v4h-20zM12 2h20v4h-20zM6 0v8h-2v-6h-2v-2zM4 16.438v1.563h4v2h-6v-4.563l4-1.875v-1.563h-4v-2h6v4.563zM8 22v10h-6v-2h4v-2h-4v-2h4v-2h-4v-2z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-list2", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "list2"
        ),
        _react2.default.createElement("path", { d: "M12 2h20v4h-20v-4zM12 14h20v4h-20v-4zM12 26h20v4h-20v-4zM0 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 16c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM0 28c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-link", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "link"
        ),
        _react2.default.createElement("path", { d: "M13.757 19.868c-0.416 0-0.832-0.159-1.149-0.476-2.973-2.973-2.973-7.81 0-10.783l6-6c1.44-1.44 3.355-2.233 5.392-2.233s3.951 0.793 5.392 2.233c2.973 2.973 2.973 7.81 0 10.783l-2.743 2.743c-0.635 0.635-1.663 0.635-2.298 0s-0.635-1.663 0-2.298l2.743-2.743c1.706-1.706 1.706-4.481 0-6.187-0.826-0.826-1.925-1.281-3.094-1.281s-2.267 0.455-3.094 1.281l-6 6c-1.706 1.706-1.706 4.481 0 6.187 0.635 0.635 0.635 1.663 0 2.298-0.317 0.317-0.733 0.476-1.149 0.476z" }),
        _react2.default.createElement("path", { d: "M8 31.625c-2.037 0-3.952-0.793-5.392-2.233-2.973-2.973-2.973-7.81 0-10.783l2.743-2.743c0.635-0.635 1.664-0.635 2.298 0s0.635 1.663 0 2.298l-2.743 2.743c-1.706 1.706-1.706 4.481 0 6.187 0.826 0.826 1.925 1.281 3.094 1.281s2.267-0.455 3.094-1.281l6-6c1.706-1.706 1.706-4.481 0-6.187-0.635-0.635-0.635-1.663 0-2.298s1.663-0.635 2.298 0c2.973 2.973 2.973 7.81 0 10.783l-6 6c-1.44 1.44-3.355 2.233-5.392 2.233z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-bold", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "bold"
        ),
        _react2.default.createElement("path", { d: "M22.121 15.145c1.172-1.392 1.879-3.188 1.879-5.145 0-4.411-3.589-8-8-8h-10v28h12c4.411 0 8-3.589 8-8 0-2.905-1.556-5.453-3.879-6.855zM12 6h3.172c1.749 0 3.172 1.794 3.172 4s-1.423 4-3.172 4h-3.172v-8zM16.969 26h-4.969v-8h4.969c1.827 0 3.313 1.794 3.313 4s-1.486 4-3.313 4z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-italic", viewBox: "0 0 32 32" },
        _react2.default.createElement(
          "title",
          null,
          "italic"
        ),
        _react2.default.createElement("path", { d: "M28 2v2h-4l-10 24h4v2h-14v-2h4l10-24h-4v-2z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-embed2", viewBox: "0 0 40 32" },
        _react2.default.createElement(
          "title",
          null,
          "embed2"
        ),
        _react2.default.createElement("path", { d: "M26 23l3 3 10-10-10-10-3 3 7 7z" }),
        _react2.default.createElement("path", { d: "M14 9l-3-3-10 10 10 10 3-3-7-7z" }),
        _react2.default.createElement("path", { d: "M21.916 4.704l2.171 0.592-6 22.001-2.171-0.592 6-22.001z" })
      ),
      _react2.default.createElement(
        "symbol",
        { id: "react-md-icon-headers", viewBox: "0 0 18 16" },
        _react2.default.createElement("path", { fillRule: "evenodd", d: "M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z" })
      )
    )
  );
};

exports.default = SvgDefinitions;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'handleDropdown',
    value: function handleDropdown(button, obj) {
      var dropdown = this.refs["dropdown-" + obj.id];
      if (dropdown.style.display != "block") {
        dropdown.style.display = "block";
        dropdown.style.left = button.offsetLeft + parseInt(button.offsetWidth / 2) - parseInt(dropdown.offsetWidth / 2) + "px";
        dropdown.style.top = button.offsetTop + button.offsetHeight + "px";

        var outsideClickListener = function outsideClickListener(event) {
          dropdown.style.display = 'none';
          document.removeEventListener('click', outsideClickListener);
        };

        document.addEventListener('click', outsideClickListener);
      } else {
        dropdown.style.display = "none";
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var buttons = this.props.toolbarButtons.filter(function (obj) {
        return _this2.props.toolbarOptions.includes(obj.id);
      }).map(function (obj, i) {
        return _react2.default.createElement(
          'button',
          {
            key: i,
            type: 'button',
            title: obj.tooltip,
            onClick: function onClick(event) {
              obj.dropdownOptions ? _this2.handleDropdown(event.currentTarget, obj) : obj.callback();
            },
            className: "react-md-toolbar-button" + (obj.dropdownOptions ? " react-md-toolbar-dropdown-button" : "") },
          _react2.default.createElement(
            'svg',
            { className: 'react-md-icon react-md-icon-' + obj.icon },
            _react2.default.createElement('use', { xlinkHref: '#react-md-icon-' + obj.icon })
          ),
          obj.dropdownOptions && _react2.default.createElement('span', { className: 'react-md-toolbar-caret' })
        );
      });

      var dropdowns = this.props.toolbarButtons.filter(function (obj) {
        return obj.dropdownOptions;
      }).map(function (obj, i) {
        var dropdownOptions = obj.dropdownOptions.map(function (opt, i) {
          return _react2.default.createElement(
            'li',
            { key: i, onClick: opt.onClick, className: "react-md-dropdown-option " + opt.className },
            opt.text
          );
        });
        return _react2.default.createElement(
          'div',
          { key: i, ref: "dropdown-" + obj.id, className: 'react-md-dropdown' },
          _react2.default.createElement(
            'ul',
            null,
            dropdownOptions
          )
        );
      });

      return _react2.default.createElement(
        'nav',
        { className: 'react-md-toolbar' },
        _react2.default.createElement(
          'div',
          { className: 'react-md-tab' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: this.props.isPreview ? "react-md-tablinks active" : "react-md-tablinks",
              onClick: function onClick() {
                return _this2.props.showMarkdown(false);
              } },
            'Write'
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: this.props.isPreview ? "react-md-tablinks" : "react-md-tablinks active",
              onClick: function onClick() {
                return _this2.props.showMarkdown(true);
              } },
            'Preview'
          )
        ),
        this.props.toolbarOptions.includes("preview-as-html") && _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('input', {
            name: 'Preview as HTML',
            type: 'checkbox',
            checked: this.props.asHTML,
            onChange: this.props.handleCheck }),
          _react2.default.createElement(
            'span',
            { className: 'react-md-toolbar-item' },
            'Preview as HTML'
          )
        ),
        this.props.isPreview && buttons,
        this.props.isPreview && dropdowns
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

;

Toolbar.propTypes = {
  showMarkdown: _propTypes2.default.func.isRequired,
  handleCheck: _propTypes2.default.func.isRequired,
  toolbarButtons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    icon: _propTypes2.default.string.isRequired,
    tooltip: _propTypes2.default.string
  })),
  asHTML: _propTypes2.default.bool.isRequired,
  isPreview: _propTypes2.default.bool.isRequired
};

exports.default = Toolbar;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _markdownEditor = __webpack_require__(7);

var _markdownEditor2 = _interopRequireDefault(_markdownEditor);

__webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _markdownEditor2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(15)(false);
// imports


// module
exports.push([module.i, ".react-md-textarea {\n  box-sizing: border-box;\n  max-width: 100%;\n  resize: none;\n  margin: 0;\n  padding: 1em;\n  width: 100%;\n  height: 25em;\n  border: 1px solid #ddd;\n  border-top: none;\n  border-radius: 2px;\n}\n\n.react-md-textarea-drag {\n  border: 2px dashed #8ed091;\n  background: aliceblue;\n}\n\n.react-md-toolbar {\n  font-size: 9pt;\n  height: 29px;\n  margin-bottom: 0;\n  border-bottom: 1px solid #ddd;\n}\n\ndiv.react-md-tab {\n  background: #fff;\n}\n\ndiv.react-md-tab button {\n  margin: 2px;\n  margin-top: 0;\n  margin-bottom: 0;\n\n  border-top-left-radius: 2px;\n  border-top-right-radius: 2px;\n  border: none;\n  border-bottom: 1px solid #ddd;\n\n  background: inherit;\n  float: left;\n  outline: none;\n  cursor: pointer;\n  height: 30px;\n  min-width: 5em;\n}\n\n.react-md-tab button.active {\n  box-shadow: none;\n}\n\ndiv.react-md-tab button:first-child {\n  margin-left: 0;\n}\n\ndiv.react-md-tab button.active {\n  border: 1px solid #ddd;\n  border-bottom: none;\n  box-shadow: 4px 0 8px -4px #ddd, -4px 0 8px -4px #ddd;\n}\n\n.react-md-toolbar-item {\n  line-height: 30px;\n}\n\n.react-md-toolbar-button {\n  width: 25px;\n  border: none;\n  background: inherit;\n  cursor: pointer;\n  padding: 4px;\n  margin-left: 7px;\n  border-radius: 2px;\n  margin-top: 2px;\n}\n\n.react-md-toolbar-button:hover {\n box-shadow: 0 1px 10px #ddd;\n}\n\n.react-md-preview-area {\n  border: 1px solid #ddd;\n  border-top: none;\n  min-height: 15em;\n  padding: 1em;\n  position: relative;\n}\n\n.react-md-preview-area img {\n  max-width: 100%;\n}\n\n.react-md-dropzone-wrap .react-md-remove-btn {\n  cursor: pointer;\n  color: #2196f3;\n}\n\n.react-md-dropzone-wrap .react-md-dropzone-info {\n  background: #f7f7f7;\n  color: #92a1ad;\n  font-size: 12px;\n  margin-top: -4px;\n  padding: 0.5rem;\n  border-bottom: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n}\n\n.react-md-dropzone-info a {\n  text-decoration: underline;\n  color: blue;\n}\n\n.react-md-dropzone-info a:hover,\n.react-md-dropzone-info a:active,\n.react-md-dropzone-info a:visited {\n  color: blue;\n}\n\n.react-md-info-text {\n  display: flex;\n  flex-direction: row;\n}\n\n.react-md-file-guide {\n  order: 0;\n  flex-basis: 100%;\n}\n\n.react-md-markdown-guide {\n  order: 1;\n  margin-left: 10px;\n  flex-basis: auto;\n  flex-shrink: 0;\n}\n\n.react-md-icon {\n  display: inline-block;\n  width: 1.3em;\n  height: 1.3em;\n  stroke-width: 0;\n  stroke: #545454;\n  fill: #545454;\n}\n\n\n.react-md-toolbar-dropdown-button {\n  padding: 4px 0;\n}\n\n.react-md-toolbar-caret {\n    display: inline-block;\n    width: 0;\n    height: 0;\n    vertical-align: middle;\n    content: \"\";\n    border: 4px solid;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    border-left-color: transparent;\n}\n\n.react-md-dropdown {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 100;\n  padding: 10px 16px;\n  margin-top: 2px;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(27,31,35,0.15);\n  border-radius: 4px;\n  box-shadow: 0 3px 12px rgba(27,31,35,0.15);\n}\n\n.react-md-dropdown ul {\n  margin: 0;\n  padding: 0;\n}\n\n.react-md-dropdown ul {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n}\n\n.react-md-dropdown-option {\n  cursor: pointer;\n}\n\n.react-md-dropdown-option:hover {\n  color: #020298;\n}\n\n.react-md-header-1 {\n  font-weight: bold;\n  font-size: 22px;\n}\n\n.react-md-header-2 {\n  font-weight: bold;\n  font-size: 18px;\n}\n\n.react-md-header-3 {\n  font-weight: bold;\n  font-size: 15px;\n}\n\n.react-md-error {\n  color: red;\n  font-weight: bold;\n}\n\n.react-md-loader,\n.react-md-loader:after {\n  border-radius: 50%;\n  width: 3em;\n  height: 3em;\n}\n\n.react-md-loader {\n  margin: 30px auto;\n  font-size: 10px;\n  position: relative;\n  text-indent: -9999em;\n  border-top: 0.8em solid rgba(0,17,22, 0.2);\n  border-right: 0.8em solid rgba(0,17,22, 0.2);\n  border-bottom: 0.8em solid rgba(0,17,22, 0.2);\n  border-left: 0.8em solid #001116;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n  -webkit-animation: load8 1.1s infinite linear;\n  animation: load8 1.1s infinite linear;\n}\n\n@-webkit-keyframes load8 {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes load8 {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(6);
  var ReactPropTypesSecret = __webpack_require__(5);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var ReactPropTypesSecret = __webpack_require__(5);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(6);
var assign = __webpack_require__(16);

var ReactPropTypesSecret = __webpack_require__(5);
var checkPropTypes = __webpack_require__(17);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(21);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});