(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return remCalc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createMediaQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getMarginsOrPaddings; });
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);
/* harmony import */ var _emotion_styled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_emotion_styled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _emotion_styled__WEBPACK_IMPORTED_MODULE_0___default.a; });
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* harmony import */ var emotion_theming__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(emotion_theming__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return emotion_theming__WEBPACK_IMPORTED_MODULE_1__["ThemeProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "f", function() { return emotion_theming__WEBPACK_IMPORTED_MODULE_1__["withTheme"]; });



/**
 * turns px into rem
 * @param pixels
 * @returns {string}
 */

var remCalc = function remCalc(pixels) {
  return "".concat((pixels / 16).toFixed(4), "rem");
};
var createMediaQuery = function createMediaQuery(breakpoint) {
  return "@media (min-width: ".concat(breakpoint, "px)");
};
var getMarginsOrPaddings = function getMarginsOrPaddings(values) {
  if (!Array.isArray(values)) {
    return String(values).split(' ').map(function (o) {
      return remCalc(o).join(' ');
    });
  }

  return "".concat(remCalc(values[0]), " ").concat(remCalc(values[1]), " ").concat(remCalc(values[2]), " ").concat(remCalc(values[3]));
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/taggedTemplateLiteral");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-react");

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(20);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var utils_analytics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(21);












/* harmony default export */ __webpack_exports__["a"] = (function (WrappedComponent) {
  var _temp;

  return _temp = /*#__PURE__*/function (_Component) {
    _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(Event, _Component);

    function Event() {
      var _getPrototypeOf2;

      var _this;

      _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, Event);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, (_getPrototypeOf2 = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Event)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "handleClick", function () {
        var _this$props = _this.props,
            action = _this$props.action,
            label = _this$props.label,
            onClick = _this$props.onClick;
        Object(utils_analytics__WEBPACK_IMPORTED_MODULE_11__[/* handleEvent */ "a"])(action, label);

        if (onClick) {
          onClick.apply(void 0, arguments);
        }
      });

      return _this;
    }

    _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(Event, [{
      key: "render",
      value: function render() {
        var _this$props2 = this.props,
            action = _this$props2.action,
            label = _this$props2.label,
            onClick = _this$props2.onClick,
            rest = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_this$props2, ["action", "label", "onClick"]);

        return react__WEBPACK_IMPORTED_MODULE_9___default.a.createElement(WrappedComponent, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, rest, {
          onClick: this.handleClick
        }));
      }
    }]);

    return Event;
  }(react__WEBPACK_IMPORTED_MODULE_9__["Component"]), _temp;
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Button"]; });



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var semantic_ui_react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return semantic_ui_react__WEBPACK_IMPORTED_MODULE_0__["Image"]; });



/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/universalImport");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(24);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _requireUniversalModule = __webpack_require__(49);

Object.defineProperty(exports, 'CHUNK_NAMES', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.CHUNK_NAMES;
  }
});
Object.defineProperty(exports, 'MODULE_IDS', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.MODULE_IDS;
  }
});

var _reportChunks = __webpack_require__(51);

Object.defineProperty(exports, 'ReportChunks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reportChunks)["default"];
  }
});
exports["default"] = universal;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(26);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = __webpack_require__(36);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _vm = __webpack_require__(52);

var _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);

var _utils = __webpack_require__(25);

var _helpers = __webpack_require__(53);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _objectWithoutProperties(obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
}

var hasBabelPlugin = false;

var isHMR = function isHMR() {
  return (// $FlowIgnore
    module.hot && (false)
  );
};

var setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {
  hasBabelPlugin = true;
};

function universal(asyncModule) {
  var _class, _temp;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var userRender = opts.render,
      _opts$loading = opts.loading,
      Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,
      _opts$error = opts.error,
      Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,
      _opts$minDelay = opts.minDelay,
      minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,
      _opts$alwaysDelay = opts.alwaysDelay,
      alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,
      _opts$testBabelPlugin = opts.testBabelPlugin,
      testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,
      _opts$loadingTransiti = opts.loadingTransition,
      loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,
      options = _objectWithoutProperties(opts, ['render', 'loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);

  var renderFunc = userRender || (0, _utils.createDefaultRender)(Loading, Err);
  var isDynamic = hasBabelPlugin || testBabelPlugin;
  options.isDynamic = isDynamic;
  options.usesBabelPlugin = hasBabelPlugin;
  options.modCache = {};
  options.promCache = {};
  return _temp = _class = function (_React$Component) {
    _inherits(UniversalComponent, _React$Component);

    _createClass(UniversalComponent, [{
      key: 'requireAsyncInner',
      value: function requireAsyncInner(requireAsync, props, state, context, isMount) {
        var _this2 = this;

        if (!state.mod && loadingTransition) {
          this.update({
            mod: null,
            props: props
          }); // display `loading` during componentWillReceiveProps
        }

        var time = new Date();
        requireAsync(props, context).then(function (mod) {
          var state = {
            mod: mod,
            props: props,
            context: context
          };
          var timeLapsed = new Date() - time;

          if (timeLapsed < minDelay) {
            var extraDelay = minDelay - timeLapsed;
            return setTimeout(function () {
              return _this2.update(state, isMount);
            }, extraDelay);
          }

          _this2.update(state, isMount);
        })["catch"](function (error) {
          return _this2.update({
            error: error,
            props: props,
            context: context
          });
        });
      }
    }, {
      key: 'handleBefore',
      value: function handleBefore(isMount, isSync) {
        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        if (this.props.onBefore) {
          var onBefore = this.props.onBefore;
          var info = {
            isMount: isMount,
            isSync: isSync,
            isServer: isServer
          };
          onBefore(info);
        }
      }
    }, {
      key: 'handleAfter',
      value: function handleAfter(state, isMount, isSync, isServer) {
        var mod = state.mod,
            error = state.error;

        if (mod && !error) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });

          if (this.props.onAfter) {
            var onAfter = this.props.onAfter;
            var info = {
              isMount: isMount,
              isSync: isSync,
              isServer: isServer
            };
            onAfter(info, mod);
          }
        } else if (error && this.props.onError) {
          this.props.onError(error);
        }

        this.setState(state);
      } // $FlowFixMe

    }, {
      key: 'init',
      value: function init(props, context) {
        var _req = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            addModule = _req.addModule,
            requireSync = _req.requireSync,
            requireAsync = _req.requireAsync,
            asyncOnly = _req.asyncOnly;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return (0, _helpers.__update)(props, {
            error: error,
            props: props,
            context: context
          }, this._initialized);
        }

        this._asyncOnly = asyncOnly;
        var chunkName = addModule(props); // record the module for SSR flushing :)

        if (context.report) {
          context.report(chunkName);
        }

        if (mod || _utils.isServer) {
          this.handleBefore(true, true, _utils.isServer);
          return (0, _helpers.__update)(props, {
            asyncOnly: asyncOnly,
            props: props,
            mod: mod,
            context: context
          }, this._initialized, true, true, _utils.isServer);
        }

        this.handleBefore(true, false);
        this.requireAsyncInner(requireAsync, props, {
          props: props,
          asyncOnly: asyncOnly,
          mod: mod,
          context: context
        }, context, true);
        return {
          mod: mod,
          asyncOnly: asyncOnly,
          context: context,
          props: props
        };
      }
    }], [{
      key: 'preload',

      /* eslint-enable react/sort-comp */
      value: function preload(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req2 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireAsync = _req2.requireAsync,
            requireSync = _req2.requireSync;

        var mod = void 0;

        try {
          mod = requireSync(props, context);
        } catch (error) {
          return Promise.reject(error);
        }

        return Promise.resolve().then(function () {
          if (mod) return mod;
          return requireAsync(props, context);
        }).then(function (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
          return mod;
        });
      }
      /* eslint-disable react/sort-comp */

    }, {
      key: 'preloadWeak',
      value: function preloadWeak(props) {
        var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        props = props || {};

        var _req3 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
            requireSync = _req3.requireSync;

        var mod = requireSync(props, context);

        if (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
        }

        return mod;
      }
    }]);

    function UniversalComponent(props, context) {
      _classCallCheck(this, UniversalComponent);

      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));

      _this.update = function (state) {
        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (!_this._initialized) return;
        if (!state.error) state.error = null;

        _this.handleAfter(state, isMount, isSync, isServer);
      };

      _this.state = _this.init(_this.props, _this.context); // $FlowFixMe

      _this.state.error = null;
      return _this;
    }

    _createClass(UniversalComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._initialized = true;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;

        if (isDynamic || this._asyncOnly) {
          var _req4 = (0, _requireUniversalModule2["default"])(asyncModule, options, this.props, prevProps),
              requireSync = _req4.requireSync,
              requireAsync = _req4.requireAsync,
              shouldUpdate = _req4.shouldUpdate;

          if (shouldUpdate(this.props, prevProps)) {
            var mod = void 0;

            try {
              mod = requireSync(this.props, this.context);
            } catch (error) {
              return this.update({
                error: error
              });
            }

            this.handleBefore(false, !!mod);

            if (!mod) {
              return this.requireAsyncInner(requireAsync, this.props, {
                mod: mod
              });
            }

            var state = {
              mod: mod
            };

            if (alwaysDelay) {
              if (loadingTransition) this.update({
                mod: null
              }); // display `loading` during componentWillReceiveProps

              setTimeout(function () {
                return _this3.update(state, false, true);
              }, minDelay);
              return;
            }

            this.update(state, false, true);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._initialized = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            isLoading = _props.isLoading,
            userError = _props.error,
            props = _objectWithoutProperties(_props, ['isLoading', 'error']);

        var _state = this.state,
            mod = _state.mod,
            error = _state.error;
        return renderFunc(props, mod, isLoading, userError || error);
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, currentState) {
        var _req5 = (0, _requireUniversalModule2["default"])(asyncModule, options, nextProps, currentState.props),
            requireSync = _req5.requireSync,
            shouldUpdate = _req5.shouldUpdate;

        if (isHMR() && shouldUpdate(currentState.props, nextProps)) {
          var mod = requireSync(nextProps, currentState.context);
          return _extends({}, currentState, {
            mod: mod
          });
        }

        return null;
      }
    }]);

    return UniversalComponent;
  }(_react2["default"].Component), _class.contextTypes = {
    store: _propTypes2["default"].object,
    report: _propTypes2["default"].func
  }, _temp;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("@reach/router");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(25);

var requireById = function requireById(id) {
  if (!(0, _utils.isWebpack)() && typeof id === 'string') {
    return __webpack_require__(50)("" + id);
  }

  return __webpack_require__('' + id);
};

exports["default"] = requireById;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleEvent; });
/* harmony import */ var config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30);
// import ua from "universal-analytics";
 // const visitor = ua(config.ga.uaId, { http: false });

/**
 * handles events
 * @param {string} action
 * @param {string} label
 */

var handleEvent = function handleEvent(action, label) {
  var _document = document,
      pathname = _document.location.pathname;
  var ec = pathname.split("/")[1];
  console.log({
    ec: ec === "" ? "landing" : ec,
    ea: action,
    el: label
  }); // visitor
  //     .event({
  //         ec: ec === "" ? "landing" : ec,
  //         ea: action,
  //         el: label
  //     })
  //     .send();
};

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-static"
var external_react_static_ = __webpack_require__(14);

// EXTERNAL MODULE: external "@reach/router"
var router_ = __webpack_require__(12);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Router/index.js

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/utils/style.js
var style = __webpack_require__(0);

// EXTERNAL MODULE: external "@babel/runtime/helpers/slicedToArray"
var slicedToArray_ = __webpack_require__(15);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/taggedTemplateLiteral"
var taggedTemplateLiteral_ = __webpack_require__(2);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral_);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/hoc/withAnalytics.js
var withAnalytics = __webpack_require__(4);

// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(3);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Menu/index.js

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Image/index.js
var Image = __webpack_require__(6);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Navigation/utils.js
var items = ['About Us', 'Services', 'Products', 'Sign Up'];
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Navigation/Navigation.js



function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n  max-width: ", " !important;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    font-family: ", " !important;\n    background-color: ", " !important;\n    color: ", " !important;\n    display: none !important;\n    margin: 0 !important;\n\n    a {\n        color: ", " !important;\n    }\n    \n    ", " {\n        display: flex !important;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}







var StyledMenu = Object(style["e" /* styled */])(external_semantic_ui_react_["Menu"])(_templateObject(), function (_ref) {
  var navigation = _ref.theme.navigation;
  return navigation.fontFamily;
}, function (_ref2) {
  var navigation = _ref2.theme.navigation;
  return navigation.backgroundColor;
}, function (_ref3) {
  var navigation = _ref3.theme.navigation;
  return navigation.color;
}, function (_ref4) {
  var navigation = _ref4.theme.navigation;
  return navigation.color;
}, function (_ref5) {
  var breakpoints = _ref5.theme.breakpoints;
  return Object(style["b" /* createMediaQuery */])(breakpoints.tablet);
});
var StyledImage = Object(style["e" /* styled */])(Image["a" /* Image */])(_templateObject2(), function (_ref6) {
  var navigation = _ref6.theme.navigation;
  return Object(style["d" /* remCalc */])(navigation.logoSize);
});
var AnalyticsMenuItem = Object(withAnalytics["a" /* default */])(external_semantic_ui_react_["MenuItem"]);
/* harmony default export */ var Navigation = (function (_ref7) {
  var navigation = _ref7.theme.navigation;

  var _useState = Object(external_react_["useState"])({
    activeItem: 'home'
  }),
      _useState2 = slicedToArray_default()(_useState, 2),
      activeItem = _useState2[0].activeItem,
      setState = _useState2[1];

  var handleItemClick = function handleItemClick(e, _ref8) {
    var name = _ref8.name;
    return setState({
      activeItem: name
    });
  };

  return external_react_default.a.createElement(StyledMenu, {
    secondary: true,
    size: navigation.size
  }, external_react_default.a.createElement(AnalyticsMenuItem, {
    name: "logo",
    active: activeItem === 'logo',
    onClick: handleItemClick,
    action: "navigation-logo-click",
    href: "/"
  }, external_react_default.a.createElement(StyledImage, {
    alt: "idea camels logo",
    src: navigation.logo
  })), external_react_default.a.createElement(external_semantic_ui_react_["MenuMenu"], {
    position: "right"
  }, items.map(function (o) {
    return external_react_default.a.createElement(AnalyticsMenuItem, {
      key: o,
      name: o,
      href: "/coming-soon",
      active: activeItem === o,
      onClick: handleItemClick,
      action: "".concat(o.replace(' ', '-'), "-click").toLowerCase()
    });
  })));
});
// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Button/index.js
var Button = __webpack_require__(5);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Navigation/Mobile.js



function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    background-color: ", " !important;\n    color: ", " !important;\n\n    &:hover {\n        filter: brightness(0.96)\n    }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function Mobile_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    text-align: center;\n    width: 100%;\n"]);

  Mobile_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function Mobile_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    font-family: ", " !important;\n    background-color: ", " !important;\n    color: ", " !important;\n\n    a {\n        color: ", " !important;\n    }\n    \n    ", " {\n        display: none !important;\n    }\n"]);

  Mobile_templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var Mobile_StyledMenu = Object(style["e" /* styled */])(external_semantic_ui_react_["Menu"])(Mobile_templateObject(), function (_ref) {
  var navigation = _ref.theme.navigation;
  return navigation.fontFamily;
}, function (_ref2) {
  var navigation = _ref2.theme.navigation;
  return navigation.backgroundColor;
}, function (_ref3) {
  var navigation = _ref3.theme.navigation;
  return navigation.color;
}, function (_ref4) {
  var navigation = _ref4.theme.navigation;
  return navigation.color;
}, function (_ref5) {
  var breakpoints = _ref5.theme.breakpoints;
  return Object(style["b" /* createMediaQuery */])(breakpoints.tablet);
});
var Item = style["e" /* styled */].div(Mobile_templateObject2());
var StyledButton = Object(style["e" /* styled */])(Button["a" /* Button */])(_templateObject3(), function (_ref6) {
  var navigation = _ref6.theme.navigation;
  return navigation.button.backgroundColor;
}, function (_ref7) {
  var navigation = _ref7.theme.navigation;
  return navigation.button.color;
});
/* harmony default export */ var Mobile = (function (_ref8) {
  var navigation = _ref8.theme.navigation;

  var _useState = Object(external_react_["useState"])({
    activeItem: 'home',
    isOpen: false
  }),
      _useState2 = slicedToArray_default()(_useState, 2),
      _useState2$ = _useState2[0],
      isOpen = _useState2$.isOpen,
      activeItem = _useState2$.activeItem,
      setState = _useState2[1];

  var handleItemClick = function handleItemClick(e, _ref9) {
    var name = _ref9.name;
    return setState({
      activeItem: name
    });
  };

  var handleMenuClick = function handleMenuClick() {
    return setState({
      isOpen: !isOpen
    });
  };

  return external_react_default.a.createElement(Mobile_StyledMenu, {
    secondary: true,
    size: navigation.size,
    stackable: true
  }, external_react_default.a.createElement(external_semantic_ui_react_["MenuItem"], null, external_react_default.a.createElement(StyledButton, {
    fluid: true,
    onClick: handleMenuClick,
    icon: "align justify"
  })), isOpen && items.map(function (o) {
    return external_react_default.a.createElement(external_semantic_ui_react_["MenuItem"], {
      key: o,
      name: o,
      active: activeItem === {
        o: o
      },
      onClick: handleItemClick
    }, external_react_default.a.createElement(Item, null, o));
  }));
});
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Navigation/index.js




/* harmony default export */ var components_Navigation = (Object(style["f" /* withTheme */])(function (_ref) {
  var theme = _ref.theme;
  return [external_react_default.a.createElement(Navigation, {
    theme: theme
  }), external_react_default.a.createElement(Mobile, {
    theme: theme
  })];
}));
// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/config/index.js + 2 modules
var config = __webpack_require__(30);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/App.js





 // Any routes that start with 'dynamic' will be treated as non-static routes

Object(external_react_static_["addPrefetchExcludes"])(['dynamic']);

function App() {
  return external_react_default.a.createElement(style["a" /* ThemeProvider */], {
    theme: config["a" /* theme */]
  }, external_react_default.a.createElement(external_react_static_["Root"], null, external_react_default.a.createElement(components_Navigation, null), typeof document !== 'undefined' && external_react_default.a.createElement("div", {
    className: "content"
  }, external_react_default.a.createElement(external_react_default.a.Suspense, {
    fallback: external_react_default.a.createElement("em", null, "Loading...")
  }, external_react_default.a.createElement(router_["Router"], null, external_react_default.a.createElement(external_react_static_["Routes"], {
    path: "*"
  }))))));
}

/* harmony default export */ var src_App = __webpack_exports__["a"] = (App);

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(24);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createDefaultRender = exports.createElement = exports.findExport = exports.resolveExport = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};

var _react = __webpack_require__(1);

var React = _interopRequireWildcard(_react);

var _requireById = __webpack_require__(13);

var _requireById2 = _interopRequireDefault(_requireById);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

var isTest = exports.isTest = "production" === 'test';
var isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

var isWebpack = exports.isWebpack = function isWebpack() {
  return typeof __webpack_require__ !== 'undefined';
};

var babelInterop = exports.babelInterop = function babelInterop(mod) {
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod["default"] : mod;
};

var DefaultLoading = exports.DefaultLoading = function DefaultLoading() {
  return React.createElement('div', null, 'Loading...');
};

var DefaultError = exports.DefaultError = function DefaultError(_ref) {
  var error = _ref.error;
  return React.createElement('div', null, 'Error: ', error && error.message);
};

var tryRequire = exports.tryRequire = function tryRequire(id) {
  try {
    return (0, _requireById2["default"])(id);
  } catch (err) {
    // warn if there was an error while requiring the chunk during development
    // this can sometimes lead the server to render the loading component.
    if (false) {}
  }

  return null;
};

var resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, context, modCache) {
  var isSync = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
  var exp = findExport(mod, key);

  if (onLoad && mod) {
    var _isServer = typeof window === 'undefined';

    var info = {
      isServer: _isServer,
      isSync: isSync
    };
    onLoad(mod, info, props, context);
  }

  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);
  return exp;
};

var findExport = exports.findExport = function findExport(mod, key) {
  if (typeof key === 'function') {
    return key(mod);
  } else if (key === null) {
    return mod;
  }

  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);
};

var createElement = exports.createElement = function createElement(Component, props) {
  return React.isValidElement(Component) ? React.cloneElement(Component, props) : React.createElement(Component, props);
};

var createDefaultRender = exports.createDefaultRender = function createDefaultRender(Loading, Err) {
  return function (props, mod, isLoading, error) {
    if (isLoading) {
      return createElement(Loading, props);
    } else if (error) {
      return createElement(Err, _extends({}, props, {
        error: error
      }));
    } else if (mod) {
      // primary usage (for async import loading + errors):
      return createElement(mod, props);
    }

    return createElement(Loading, props);
  };
};

var callForString = exports.callForString = function callForString(strFun, props) {
  return typeof strFun === 'function' ? strFun(props) : strFun;
};

var loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {
  return !isServer && modCache[callForString(chunkName, props)];
};

var cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {
  return modCache[callForString(chunkName, props)] = exp;
};

var loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)];
};

var cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)] = pr;
};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("emotion-theming");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ theme; });

// UNUSED EXPORTS: config

// EXTERNAL MODULE: external "@babel/runtime/helpers/defineProperty"
var defineProperty_ = __webpack_require__(7);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/static/logo.png
var logo = __webpack_require__(43);
var logo_default = /*#__PURE__*/__webpack_require__.n(logo);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/static/logoColor.png
var logoColor = __webpack_require__(32);
var logoColor_default = /*#__PURE__*/__webpack_require__.n(logoColor);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/static/block2Image.webp
var block2Image = __webpack_require__(44);
var block2Image_default = /*#__PURE__*/__webpack_require__.n(block2Image);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/static/block4FirstImage.png
var block4FirstImage = __webpack_require__(45);
var block4FirstImage_default = /*#__PURE__*/__webpack_require__.n(block4FirstImage);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/config/theme.js


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var MAIN_000 = '#f7c545';
var MAIN_001 = '#DEAC2C';
var TEXT_000 = '#2a2a2a';
var WHITE_000 = 'white';
var FONT_000 = "'Darker Grotesque', sans-serif";
var FONT_001 = "Cairo, 'Playfair Display', sans-serif";
var FONT_002 = "'Josefin Sans', 'Archivo Narrow', sans-serif";
var GRAY_000 = "#f4f4f2";
var GRAY_001 = "#686868";
var defaultFont = {
  color: TEXT_000,
  fontFamily: FONT_000
};
/* harmony default export */ var theme = ({
  breakpoints: {
    tablet: 768
  },
  navigation: {
    backgroundColor: MAIN_000,
    color: WHITE_000,
    fontFamily: defaultFont.fontFamily,
    size: 'huge',
    button: {
      backgroundColor: MAIN_001,
      color: WHITE_000
    },
    logoSize: 23,
    logo: logo_default.a
  },
  block1: _objectSpread({
    height: 700,
    width: 728,
    paddings: [0, 20, 0, 20],
    backgroundColor: WHITE_000,
    logo: logoColor_default.a,
    headingSize: 60,
    headingLineHeight: 66,
    headingMargins: [40, 0, 0, 0],
    subHeadingLineHeight: 27,
    subHeadingSize: 27,
    subHeadingMargins: [40, 0, 40, 0],
    buttonSize: 'huge'
  }, defaultFont),
  block2: {
    height: 700,
    image: block2Image_default.a
  },
  block3: _objectSpread({}, defaultFont, {
    height: 650,
    backgroundColor: WHITE_000,
    fontFamily: FONT_001,
    overlay: {
      backgroundColor: WHITE_000,
      width: 1000,
      minHeight: 500,
      top: -210,
      padding: 50,
      headingSize: 60,
      headingLineHeight: 66,
      headingMargins: [40, 0, 0, 0],
      headingWeight: 800,
      mainText: {
        fontSize: 22,
        lineHeight: 40,
        fontWeight: 400,
        margins: [40, 0, 0, 0]
      },
      button: {
        size: 'huge',
        margins: [40, 0, 0, 0]
      },
      features: {
        headerPadding: 10,
        headerFontFamily: FONT_002,
        headerMargins: [40, 0, 0, 0],
        headerBackgroundColor: MAIN_000,
        featuresMargins: [40, 0, 0, 0]
      }
    }
  }),
  block4: _objectSpread({}, defaultFont, {
    fontFamily: FONT_001,
    height: 700,
    backgroundColor: GRAY_000,
    paddings: [0, 20, 0, 20],
    heading: {
      size: 50,
      weight: 200,
      lineHeight: 57
    },
    subHeading: {
      size: 18,
      lineHeight: 25,
      weight: 400,
      color: GRAY_001,
      margins: [-10, 0, 0, 0]
    },
    cardContainer: {
      width: 1000,
      margins: [60, 0, 0, 0],
      paddings: [40, 40, 40, 40]
    },
    firstCard: {
      image: {
        src: block4FirstImage_default.a,
        size: 'small'
      }
    },
    button: {
      size: 'large',
      margins: [40, 0, 0, 0]
    }
  }),
  block5: _objectSpread({}, defaultFont, {
    fontFamily: FONT_001,
    height: 700,
    backgroundColor: WHITE_000,
    paddings: [0, 20, 0, 20],
    quoteContainerPaddings: [60, 0, 0, 0],
    card: {
      width: 1000
    },
    quote: {
      size: 50,
      weight: 200,
      lineHeight: 57
    },
    author: {
      size: 18,
      lineHeight: 25,
      weight: 400,
      color: GRAY_001,
      margins: [-10, 0, 0, 0]
    },
    cardContainer: {
      width: 1000,
      margins: [60, 0, 0, 0],
      paddings: [40, 40, 40, 40]
    },
    button: {
      size: 'huge',
      margins: [40, 0, 0, 0],
      backgroundColor: MAIN_000
    }
  }),
  footer: _objectSpread({}, defaultFont, {
    size: 20,
    height: 400,
    paddings: [60, 0, 0, 0],
    backgroundColor: GRAY_000,
    column1: {
      imageSrc: logoColor_default.a,
      imageSize: "mini"
    },
    column2: {
      color: TEXT_000,
      hoverColor: MAIN_000
    },
    column3: {
      iconColor: MAIN_000,
      iconSize: 'small'
    }
  }),
  comingSoon: _objectSpread({}, defaultFont, {
    width: 800,
    fontFamily: FONT_001,
    backgroundColor: GRAY_000,
    paddings: [0, 20, 0, 20],
    headingSize: 60,
    headingLineHeight: 66,
    headingMargins: [40, 0, 0, 0],
    subHeadingLineHeight: 27,
    subHeadingSize: 27,
    subHeadingMargins: [40, 0, 40, 0],
    signUpWidth: 500,
    button: {
      size: 'large',
      margins: [40, 0, 0, 0]
    }
  })
});
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/config/config.js
/* harmony default export */ var config = ({
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com"
  },
  ga: {
    uaId: "UA-120929027-2"
  }
});
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/config/index.js



/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f26a6fddde0823f2264bfb6462ec14fd.png";

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Users_noconnor1_Desktop_niall_template_website_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _Users_noconnor1_Desktop_niall_template_website_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Users_noconnor1_Desktop_niall_template_website_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports
 // Plugins

var plugins = [{
  location: "/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-source-filesystem",
  plugins: [],
  hooks: {}
}, {
  location: "/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-reach-router",
  plugins: [],
  hooks: _Users_noconnor1_Desktop_niall_template_website_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default()({})
}, {
  location: "/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static-plugin-sitemap/dist",
  plugins: [],
  hooks: {}
}, {
  location: "/Users/noconnor1/Desktop/niall/template-website",
  plugins: [],
  hooks: {}
}]; // Export em!

/* harmony default export */ __webpack_exports__["default"] = (plugins);

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static/lib/browser");

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFoundTemplate", function() { return notFoundTemplate; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__);








Object(_Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3__["setHasBabelPlugin"])();
var universalOptions = {
  loading: function loading() {
    return null;
  },
  error: function error(props) {
    console.error(props.error);
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "An error occurred loading this page's template. More information is available in the console.");
  },
  ignoreBabelRename: true
};
var t_0 = _Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | Users/noconnor1/Desktop/niall/template-website/src/pages/404 */).then(__webpack_require__.bind(null, 38))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(38);
  },
  chunkName: function chunkName() {
    return "Users/noconnor1/Desktop/niall/template-website/src/pages/404";
  }
}), universalOptions);
t_0.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js';
var t_1 = _Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon */).then(__webpack_require__.bind(null, 40))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(40);
  },
  chunkName: function chunkName() {
    return "Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon";
  }
}), universalOptions);
t_1.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js';
var t_2 = _Users_noconnor1_Desktop_niall_template_website_node_modules_react_universal_component_dist_index_js__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | Users/noconnor1/Desktop/niall/template-website/src/pages/index */).then(__webpack_require__.bind(null, 39))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(39);
  },
  chunkName: function chunkName() {
    return "Users/noconnor1/Desktop/niall/template-website/src/pages/index";
  }
}), universalOptions);
t_2.template = '/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js'; // Template Map

/* harmony default export */ __webpack_exports__["default"] = ({
  '/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js': t_0,
  '/Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js': t_1,
  '/Users/noconnor1/Desktop/niall/template-website/src/pages/index.js': t_2
}); // Not Found Template

var notFoundTemplate = "/Users/noconnor1/Desktop/niall/template-website/src/pages/404.js";
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("@emotion/styled");

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 - Oh no's! We couldn't find that page :("));
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/taggedTemplateLiteral"
var taggedTemplateLiteral_ = __webpack_require__(2);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral_);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/utils/style.js
var style = __webpack_require__(0);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/hoc/withAnalytics.js
var withAnalytics = __webpack_require__(4);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Image/index.js
var Image = __webpack_require__(6);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Button/index.js
var Button = __webpack_require__(5);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Block1/index.js


function _templateObject6() {
  var data = taggedTemplateLiteral_default()(["\n    max-width: ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    line-height: ", ";\n    font-size: ", ";\n    margin: ", ";\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    line-height: ", ";\n    margin: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    max-width: ", ";\n    text-align: center;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    padding: ", ";\n    box-sizing: border-box;\n    background-color: ", ";\n    color: ", ";\n    font-family: ", ";\n    display: flex;\n    justify-content: center;\n    color: ", ";\n    font-family: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}






var Container = style["e" /* styled */].section(_templateObject(), function (_ref) {
  var height = _ref.theme.block1.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var paddings = _ref2.theme.block1.paddings;
  return "".concat(Object(style["d" /* remCalc */])(paddings[0]), " ").concat(Object(style["d" /* remCalc */])(paddings[1]), " ").concat(Object(style["d" /* remCalc */])(paddings[2]), " ").concat(Object(style["d" /* remCalc */])(paddings[3]));
}, function (_ref3) {
  var backgroundColor = _ref3.theme.block1.backgroundColor;
  return backgroundColor;
}, function (_ref4) {
  var color = _ref4.theme.block1.color;
  return color;
}, function (_ref5) {
  var fontFamily = _ref5.theme.block1.fontFamily;
  return fontFamily;
}, function (_ref6) {
  var color = _ref6.theme.block1.color;
  return color;
}, function (_ref7) {
  var fontFamily = _ref7.theme.block1.fontFamily;
  return fontFamily;
});
var InnerContainer = style["e" /* styled */].div(_templateObject2(), function (_ref8) {
  var width = _ref8.theme.block1.width;
  return Object(style["d" /* remCalc */])(width);
});
var ImageContainer = style["e" /* styled */].div(_templateObject3());
var Heading = style["e" /* styled */].h1(_templateObject4(), function (_ref9) {
  var headingSize = _ref9.theme.block1.headingSize;
  return Object(style["d" /* remCalc */])(headingSize);
}, function (_ref10) {
  var headingLineHeight = _ref10.theme.block1.headingLineHeight;
  return Object(style["d" /* remCalc */])(headingLineHeight);
}, function (_ref11) {
  var headingMargins = _ref11.theme.block1.headingMargins;
  return "".concat(Object(style["d" /* remCalc */])(headingMargins[0]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[1]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[2]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[3]));
});
var SubHeading = style["e" /* styled */].p(_templateObject5(), function (_ref12) {
  var subHeadingLineHeight = _ref12.theme.block1.subHeadingLineHeight;
  return Object(style["d" /* remCalc */])(subHeadingLineHeight);
}, function (_ref13) {
  var subHeadingSize = _ref13.theme.block1.subHeadingSize;
  return Object(style["d" /* remCalc */])(subHeadingSize);
}, function (_ref14) {
  var subHeadingMargins = _ref14.theme.block1.subHeadingMargins;
  return "".concat(Object(style["d" /* remCalc */])(subHeadingMargins[0]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[1]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[2]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[3]));
});
var ButtonContainer = style["e" /* styled */].div(_templateObject6(), function (_ref15) {
  var buttonWidth = _ref15.theme.block1.buttonWidth;
  return buttonWidth ? Object(style["d" /* remCalc */])(buttonWidth) : 'auto';
});
var AnalyticsImage = Object(withAnalytics["a" /* default */])(Image["a" /* Image */]);
var AnalyticsButton = Object(withAnalytics["a" /* default */])(Button["a" /* Button */]);
/* harmony default export */ var Block1 = (Object(style["f" /* withTheme */])(function (_ref16) {
  var block1 = _ref16.theme.block1;
  return external_react_default.a.createElement(Container, null, external_react_default.a.createElement(InnerContainer, null, external_react_default.a.createElement(ImageContainer, null, external_react_default.a.createElement(AnalyticsImage, {
    alt: "idea camels logo",
    size: "small",
    src: block1.logo,
    action: "block1-logo"
  })), external_react_default.a.createElement(Heading, null, "Have an idea? ", external_react_default.a.createElement("br", null), " Not sure if it's worth doing?"), external_react_default.a.createElement(SubHeading, null, "Find out are people searching for your idea. All in under 1 hour!!"), external_react_default.a.createElement(ButtonContainer, null, external_react_default.a.createElement(AnalyticsButton, {
    href: "/coming-soon",
    action: "block1-button",
    color: "black",
    size: block1.buttonSize,
    basic: true
  }, "Buy Now"))));
}));
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Block2/index.js


function Block2_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    background-image: url(", ");\n    background-position: center;\n    background-repeat: no-repeat;\n"]);

  Block2_templateObject = function _templateObject() {
    return data;
  };

  return data;
}



var Block2_Container = style["e" /* styled */].section(Block2_templateObject(), function (_ref) {
  var height = _ref.theme.block2.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var image = _ref2.theme.block2.image;
  return image;
});
/* harmony default export */ var Block2 = (function () {
  return external_react_default.a.createElement(Block2_Container, null);
});
// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(3);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Grid/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Card/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Block3/index.js


function _templateObject9() {
  var data = taggedTemplateLiteral_default()(["\n    margin: ", ";\n    background-color: ", ";\n    padding: ", ";\n    font-family: ", ";\n    display: flex;\n    justify-content: center;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = taggedTemplateLiteral_default()(["\n    width: 100% !important;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = taggedTemplateLiteral_default()(["\n    margin: ", ";\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function Block3_templateObject6() {
  var data = taggedTemplateLiteral_default()(["\n    padding: ", ";\n"]);

  Block3_templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function Block3_templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n    max-width: ", ";\n    margin: ", ";\n"]);

  Block3_templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function Block3_templateObject4() {
  var data = taggedTemplateLiteral_default()(["\n    font-size: ", ";\n    line-height: ", ";\n    font-weight: ", ";\n    margin: ", ";\n"]);

  Block3_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function Block3_templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    font-weight: ", ";\n    line-height: ", ";\n    margin: ", ";\n"]);

  Block3_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function Block3_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    position: relative;\n    box-sizing: border-box;\n    top: ", ";\n    min-height: ", ";\n    background-color: ", ";\n    max-width: ", ";\n\n    ", " {\n        position: absolute;\n    }\n"]);

  Block3_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function Block3_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    background-color: ", ";\n    display: flex;\n    justify-content: center;\n    position: relative;\n    font-family: ", ";\n"]);

  Block3_templateObject = function _templateObject() {
    return data;
  };

  return data;
}







var Block3_Container = style["e" /* styled */].section(Block3_templateObject(), function (_ref) {
  var height = _ref.theme.block3.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var backgroundColor = _ref2.theme.block3.backgroundColor;
  return backgroundColor;
}, function (_ref3) {
  var fontFamily = _ref3.theme.block3.fontFamily;
  return fontFamily;
});
var Overlay = style["e" /* styled */].div(Block3_templateObject2(), function (_ref4) {
  var overlay = _ref4.theme.block3.overlay;
  return "".concat(overlay.top, "px");
}, function (_ref5) {
  var overlay = _ref5.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.minHeight);
}, function (_ref6) {
  var overlay = _ref6.theme.block3.overlay;
  return overlay.backgroundColor;
}, function (_ref7) {
  var overlay = _ref7.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.width);
}, function (_ref8) {
  var breakpoints = _ref8.theme.breakpoints;
  return Object(style["b" /* createMediaQuery */])(breakpoints.tablet);
});
var Block3_Heading = style["e" /* styled */].h1(Block3_templateObject3(), function (_ref9) {
  var overlay = _ref9.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.headingSize);
}, function (_ref10) {
  var overlay = _ref10.theme.block3.overlay;
  return overlay.headingWeight;
}, function (_ref11) {
  var overlay = _ref11.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.headingLineHeight);
}, function (_ref12) {
  var overlay = _ref12.theme.block3.overlay;
  return Object(style["c" /* getMarginsOrPaddings */])(overlay.headingMargins);
});
var MainText = style["e" /* styled */].p(Block3_templateObject4(), function (_ref13) {
  var overlay = _ref13.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.mainText.fontSize);
}, function (_ref14) {
  var overlay = _ref14.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.mainText.lineHeight);
}, function (_ref15) {
  var overlay = _ref15.theme.block3.overlay;
  return overlay.mainText.fontWeight;
}, function (_ref16) {
  var overlay = _ref16.theme.block3.overlay;
  return Object(style["c" /* getMarginsOrPaddings */])(overlay.mainText.margins);
});
var Block3_ButtonContainer = style["e" /* styled */].div(Block3_templateObject5(), function (_ref17) {
  var overlay = _ref17.theme.block3.overlay;
  return overlay.button.width ? Object(style["d" /* remCalc */])(overlay.button.width) : 'auto';
}, function (_ref18) {
  var overlay = _ref18.theme.block3.overlay;
  return Object(style["c" /* getMarginsOrPaddings */])(overlay.button.margins);
});
var TextContainer = style["e" /* styled */].div(Block3_templateObject6(), function (_ref19) {
  var overlay = _ref19.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.padding);
});
var FeaturesContainer = style["e" /* styled */].div(_templateObject7(), function (_ref20) {
  var overlay = _ref20.theme.block3.overlay;
  return Object(style["c" /* getMarginsOrPaddings */])(overlay.features.featuresMargins);
});
var StyleCard = Object(style["e" /* styled */])(external_semantic_ui_react_["Card"])(_templateObject8());
var FeatureHeader = style["e" /* styled */].h1(_templateObject9(), function (_ref21) {
  var overlay = _ref21.theme.block3.overlay;
  return Object(style["c" /* getMarginsOrPaddings */])(overlay.features.headerMargins);
}, function (_ref22) {
  var overlay = _ref22.theme.block3.overlay;
  return overlay.features.headerBackgroundColor;
}, function (_ref23) {
  var overlay = _ref23.theme.block3.overlay;
  return Object(style["d" /* remCalc */])(overlay.features.headerPadding);
}, function (_ref24) {
  var overlay = _ref24.theme.block3.overlay;
  return overlay.features.headerFontFamily;
});
var features = [{
  header: 'Validation',
  description: "Idea Camels combines paid search with simplified landing pages to tell you are people searching for your answer to their problem. By providing reports and a list of emails of people who interacted with your idea page you can be sure your idea is one worth doing."
}, {
  header: 'Simple',
  description: "SEO, Development, Paid Search. A never ending list of hoops to jump through and all you want is to know 'is it worth doing?'. Idea Camels simplifies all of this by providing one seamless experience to provide feedback on your idea as soon as possible."
}, {
  header: 'Fast',
  description: "Whether you are a developer, marketing exec, or any other are of the business who wants to wait months to know if people even want your product? Idea Camels can provide your with the validation you need to move your idea into development."
}];
var Block3_AnalyticsButton = Object(withAnalytics["a" /* default */])(Button["a" /* Button */]);
/* harmony default export */ var Block3 = (Object(style["f" /* withTheme */])(function (_ref25) {
  var block3 = _ref25.theme.block3;
  return external_react_default.a.createElement(Block3_Container, null, external_react_default.a.createElement(Overlay, null, external_react_default.a.createElement(TextContainer, null, external_react_default.a.createElement(Block3_Heading, null, "Welcome to Idea Camels"), external_react_default.a.createElement(MainText, null, "Combining a super modern UI with paid search to create a landing page and drive traffic to it based on other internet users search keywords. Don't spend time creating a fully fleged site when all you want to know is it worth the development time. Instead you can know in a matter of days if your new idea is worth persuing."), external_react_default.a.createElement(Block3_ButtonContainer, null, external_react_default.a.createElement(Block3_AnalyticsButton, {
    href: "/coming-soon",
    color: "black",
    size: block3.overlay.button.size,
    basic: true,
    action: "block3-button"
  }, "Learn More"))), external_react_default.a.createElement(FeatureHeader, null, "FEATURES"), external_react_default.a.createElement(FeaturesContainer, null, external_react_default.a.createElement(external_semantic_ui_react_["Grid"], {
    centered: true,
    columns: 3,
    stretched: true,
    stackable: true
  }, features.map(function (o) {
    return external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], {
      key: o.header
    }, external_react_default.a.createElement(StyleCard, o));
  })))));
}));
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Segment/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Divider/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Block4/index.js


function Block4_templateObject9() {
  var data = taggedTemplateLiteral_default()(["\n    margin: ", ";\n    max-width: ", ";\n"]);

  Block4_templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function Block4_templateObject8() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n    flex-direction: row;\n"]);

  Block4_templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function Block4_templateObject7() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    padding: ", ";\n"]);

  Block4_templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function Block4_templateObject6() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n    margin: ", ";\n"]);

  Block4_templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function Block4_templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    flex-direction: column;\n    max-width: ", ";\n"]);

  Block4_templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function Block4_templateObject4() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    color: ", ";\n    font-weight: ", ";\n    line-height: ", ";\n    margin: ", ";\n"]);

  Block4_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function Block4_templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    font-weight: ", ";\n    line-height: ", ";\n"]);

  Block4_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function Block4_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    width: 100%;\n    text-align: center;\n"]);

  Block4_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function Block4_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    padding: ", ";\n    background-color: ", ";\n    font-family: ", ";\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n"]);

  Block4_templateObject = function _templateObject() {
    return data;
  };

  return data;
}









var Block4_AnalyticsButton = Object(withAnalytics["a" /* default */])(Button["a" /* Button */]);
var Block4_Container = style["e" /* styled */].section(Block4_templateObject(), function (_ref) {
  var height = _ref.theme.block4.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var paddings = _ref2.theme.block4.paddings;
  return Object(style["c" /* getMarginsOrPaddings */])(paddings);
}, function (_ref3) {
  var backgroundColor = _ref3.theme.block4.backgroundColor;
  return backgroundColor;
}, function (_ref4) {
  var fontFamily = _ref4.theme.block4.fontFamily;
  return fontFamily;
});
var HeadingContainer = style["e" /* styled */].div(Block4_templateObject2());
var Block4_Heading = style["e" /* styled */].h1(Block4_templateObject3(), function (_ref5) {
  var heading = _ref5.theme.block4.heading;
  return Object(style["d" /* remCalc */])(heading.size);
}, function (_ref6) {
  var heading = _ref6.theme.block4.heading;
  return heading.weight;
}, function (_ref7) {
  var heading = _ref7.theme.block4.heading;
  return Object(style["d" /* remCalc */])(heading.lineHeight);
});
var Block4_SubHeading = style["e" /* styled */].p(Block4_templateObject4(), function (_ref8) {
  var subHeading = _ref8.theme.block4.subHeading;
  return Object(style["d" /* remCalc */])(subHeading.size);
}, function (_ref9) {
  var subHeading = _ref9.theme.block4.subHeading;
  return subHeading.color;
}, function (_ref10) {
  var subHeading = _ref10.theme.block4.subHeading;
  return subHeading.weight;
}, function (_ref11) {
  var subHeading = _ref11.theme.block4.subHeading;
  return Object(style["d" /* remCalc */])(subHeading.lineHeight);
}, function (_ref12) {
  var subHeading = _ref12.theme.block4.subHeading;
  return Object(style["c" /* getMarginsOrPaddings */])(subHeading.margins);
});
var SplitCard = style["e" /* styled */].div(Block4_templateObject5(), function (_ref13) {
  var cardContainer = _ref13.theme.block4.cardContainer;
  return Object(style["d" /* remCalc */])(cardContainer.width);
});
var CardContainer = style["e" /* styled */].div(Block4_templateObject6(), function (_ref14) {
  var cardContainer = _ref14.theme.block4.cardContainer;
  return Object(style["c" /* getMarginsOrPaddings */])(cardContainer.margins);
});
var Block4_ImageContainer = style["e" /* styled */].div(Block4_templateObject7(), function (_ref15) {
  var cardContainer = _ref15.theme.block4.cardContainer;
  return Object(style["c" /* getMarginsOrPaddings */])(cardContainer.paddings);
});
var ImageInnerContainer = style["e" /* styled */].div(Block4_templateObject8());
var Block4_ButtonContainer = style["e" /* styled */].div(Block4_templateObject9(), function (_ref16) {
  var button = _ref16.theme.block4.button;
  return Object(style["c" /* getMarginsOrPaddings */])(button.margins);
}, function (_ref17) {
  var button = _ref17.theme.block4.button;
  return button.width ? Object(style["d" /* remCalc */])(button.width) : 'auto';
});
/* harmony default export */ var Block4 = (Object(style["f" /* withTheme */])(function (_ref18) {
  var block4 = _ref18.theme.block4;
  return external_react_default.a.createElement(Block4_Container, null, external_react_default.a.createElement(HeadingContainer, null, external_react_default.a.createElement(Block4_Heading, null, "Start Creating!"), external_react_default.a.createElement(Block4_SubHeading, null, "Don't waste time on development and validate your idea now.")), external_react_default.a.createElement(CardContainer, null, external_react_default.a.createElement(SplitCard, null, external_react_default.a.createElement(external_semantic_ui_react_["Segment"], null, external_react_default.a.createElement(external_semantic_ui_react_["Grid"], {
    columns: 2,
    stackable: true,
    textAlign: "center"
  }, external_react_default.a.createElement(external_semantic_ui_react_["Divider"], {
    vertical: true
  }), external_react_default.a.createElement(external_semantic_ui_react_["GridRow"], {
    verticalAlign: "middle"
  }, external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], null, external_react_default.a.createElement(Block4_ImageContainer, null, external_react_default.a.createElement(ImageInnerContainer, null, external_react_default.a.createElement(Image["a" /* Image */], {
    size: block4.firstCard.image.size,
    src: block4.firstCard.image.src
  })))), external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], null, external_react_default.a.createElement(Block4_Heading, null, "Test your ideas"), external_react_default.a.createElement(Block4_SubHeading, null, "Rapidly test an idea by creating a landing page and testing adwords to see if it is worth continuing. All in one place."), external_react_default.a.createElement(Block4_ButtonContainer, null, external_react_default.a.createElement(Block4_AnalyticsButton, {
    href: "/coming-soon",
    color: "black",
    size: block4.button.size,
    basic: true,
    action: "block4-button"
  }, "Get Started")))))))));
}));
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Block5/index.js


function Block5_templateObject7() {
  var data = taggedTemplateLiteral_default()(["\n    background-color: ", " !important;\n    color: ", " !important;\n"]);

  Block5_templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function Block5_templateObject6() {
  var data = taggedTemplateLiteral_default()(["\n    margin: ", ";\n    \n    display: flex;\n    justify-content: center;\n"]);

  Block5_templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function Block5_templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    color: ", ";\n    font-weight: ", ";\n    line-height: ", ";\n    margin: ", ";\n"]);

  Block5_templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function Block5_templateObject4() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    font-weight: ", ";\n    line-height: ", ";\n"]);

  Block5_templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function Block5_templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    width: 100%;\n    text-align: center;\n    padding: ", ";\n"]);

  Block5_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function Block5_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    max-width: ", ";\n"]);

  Block5_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function Block5_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    padding: ", ";\n    background-color: ", ";\n    font-family: ", ";\n    display: flex;\n    justify-content: center;\n"]);

  Block5_templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var Block5_Container = style["e" /* styled */].section(Block5_templateObject(), function (_ref) {
  var height = _ref.theme.block5.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var paddings = _ref2.theme.block5.paddings;
  return Object(style["c" /* getMarginsOrPaddings */])(paddings);
}, function (_ref3) {
  var backgroundColor = _ref3.theme.block5.backgroundColor;
  return backgroundColor;
}, function (_ref4) {
  var fontFamily = _ref4.theme.block5.fontFamily;
  return fontFamily;
});
var Block5_InnerContainer = style["e" /* styled */].div(Block5_templateObject2(), function (_ref5) {
  var block5 = _ref5.theme.block5;
  return Object(style["d" /* remCalc */])(block5.card.width);
});
var QuoteContainer = style["e" /* styled */].div(Block5_templateObject3(), function (_ref6) {
  var block5 = _ref6.theme.block5;
  return Object(style["c" /* getMarginsOrPaddings */])(block5.quoteContainerPaddings);
});
var Quote = style["e" /* styled */].h1(Block5_templateObject4(), function (_ref7) {
  var quote = _ref7.theme.block5.quote;
  return Object(style["d" /* remCalc */])(quote.size);
}, function (_ref8) {
  var quote = _ref8.theme.block5.quote;
  return quote.weight;
}, function (_ref9) {
  var quote = _ref9.theme.block5.quote;
  return Object(style["d" /* remCalc */])(quote.lineHeight);
});
var Author = style["e" /* styled */].p(Block5_templateObject5(), function (_ref10) {
  var author = _ref10.theme.block5.author;
  return Object(style["d" /* remCalc */])(author.size);
}, function (_ref11) {
  var author = _ref11.theme.block5.author;
  return author.color;
}, function (_ref12) {
  var author = _ref12.theme.block5.author;
  return author.weight;
}, function (_ref13) {
  var author = _ref13.theme.block5.author;
  return Object(style["d" /* remCalc */])(author.lineHeight);
}, function (_ref14) {
  var author = _ref14.theme.block5.author;
  return Object(style["c" /* getMarginsOrPaddings */])(author.margins);
});
var Block5_ButtonContainer = style["e" /* styled */].div(Block5_templateObject6(), function (_ref15) {
  var button = _ref15.theme.block5.button;
  return Object(style["c" /* getMarginsOrPaddings */])(button.margins);
});
var StyledButton = Object(style["e" /* styled */])(Button["a" /* Button */])(Block5_templateObject7(), function (_ref16) {
  var button = _ref16.theme.block5.button;
  return button.backgroundColor;
}, function (_ref17) {
  var button = _ref17.theme.block5.button;
  return button.color;
});
var Block5_AnalyticsButton = Object(withAnalytics["a" /* default */])(StyledButton);
/* harmony default export */ var Block5 = (Object(style["f" /* withTheme */])(function (_ref18) {
  var block5 = _ref18.theme.block5;
  return external_react_default.a.createElement(Block5_Container, null, external_react_default.a.createElement(Block5_InnerContainer, null, external_react_default.a.createElement(QuoteContainer, null, external_react_default.a.createElement(Quote, null, "\"Gut feelings have no place in a world where data driven assumptions can be made.\""), external_react_default.a.createElement(Author, null, "- Seamus O' Connor, Senior Engineering Manager")), external_react_default.a.createElement(Block5_ButtonContainer, null, external_react_default.a.createElement(Block5_AnalyticsButton, {
    href: "/coming-soon",
    size: block5.button.size,
    action: "block5-button"
  }, "JOIN US"))));
}));
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/List/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Icon/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Footer/index.js


function Footer_templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    color: ", " !important;\n    text-decoration: none;\n\n    &:hover {\n        text-decoration: underline;\n        color: ", " !important;\n    }\n"]);

  Footer_templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function Footer_templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    color: ", ";\n"]);

  Footer_templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function Footer_templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: ", ";\n    padding: ", ";\n    box-sizing: border-box;\n    background-color: ", ";\n    color: ", ";\n    font-family: ", ";\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    color: ", ";\n    font-size: ", ";\n"]);

  Footer_templateObject = function _templateObject() {
    return data;
  };

  return data;
}








var Footer_Container = style["e" /* styled */].section(Footer_templateObject(), function (_ref) {
  var height = _ref.theme.footer.height;
  return Object(style["d" /* remCalc */])(height);
}, function (_ref2) {
  var paddings = _ref2.theme.footer.paddings;
  return "".concat(Object(style["d" /* remCalc */])(paddings[0]), " ").concat(Object(style["d" /* remCalc */])(paddings[1]), " ").concat(Object(style["d" /* remCalc */])(paddings[2]), " ").concat(Object(style["d" /* remCalc */])(paddings[3]));
}, function (_ref3) {
  var backgroundColor = _ref3.theme.footer.backgroundColor;
  return backgroundColor;
}, function (_ref4) {
  var color = _ref4.theme.footer.color;
  return color;
}, function (_ref5) {
  var fontFamily = _ref5.theme.footer.fontFamily;
  return fontFamily;
}, function (_ref6) {
  var color = _ref6.theme.footer.color;
  return color;
}, function (_ref7) {
  var size = _ref7.theme.footer.size;
  return Object(style["d" /* remCalc */])(size);
});
var StyledIcon = Object(style["e" /* styled */])(external_semantic_ui_react_["Icon"])(Footer_templateObject2(), function (_ref8) {
  var iconColor = _ref8.theme.footer.column3.iconColor;
  return iconColor;
});
var StyledListItem = Object(style["e" /* styled */])(external_semantic_ui_react_["ListItem"])(Footer_templateObject3(), function (_ref9) {
  var color = _ref9.theme.footer.column2.color;
  return color;
}, function (_ref10) {
  var hoverColor = _ref10.theme.footer.column2.hoverColor;
  return hoverColor;
});
var AnalyticsIcon = Object(withAnalytics["a" /* default */])(StyledIcon);
var AnalyticsListItem = Object(withAnalytics["a" /* default */])(StyledListItem);
/* harmony default export */ var Footer = (Object(style["f" /* withTheme */])(function (_ref11) {
  var _ref11$theme$footer = _ref11.theme.footer,
      _ref11$theme$footer$c = _ref11$theme$footer.column1,
      imageSrc = _ref11$theme$footer$c.imageSrc,
      imageSize = _ref11$theme$footer$c.imageSize,
      iconSize = _ref11$theme$footer.column3.iconSize;
  return external_react_default.a.createElement(Footer_Container, null, external_react_default.a.createElement(external_semantic_ui_react_["Grid"], {
    stackable: true,
    container: true,
    columns: 3
  }, external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], null, external_react_default.a.createElement(Image["a" /* Image */], {
    src: imageSrc,
    size: imageSize,
    avatar: true
  }), external_react_default.a.createElement("span", null, "Idea Camels")), external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], null, external_react_default.a.createElement(external_semantic_ui_react_["List"], null, external_react_default.a.createElement(AnalyticsListItem, {
    as: "a",
    href: "/coming-soon",
    action: "footer-contact"
  }, "Contact Us"), external_react_default.a.createElement(AnalyticsListItem, {
    as: "a",
    href: "/coming-soon",
    action: "footer-taq"
  }, "Terms And Conditions"), external_react_default.a.createElement(AnalyticsListItem, {
    as: "a",
    href: "/coming-soon",
    action: "footer-privacy"
  }, "Privacy Policy"), external_react_default.a.createElement(AnalyticsListItem, {
    as: "a",
    href: "/coming-soon",
    action: "footer-cookies"
  }, "Cookies Policy"))), external_react_default.a.createElement(external_semantic_ui_react_["GridColumn"], null, external_react_default.a.createElement("a", {
    href: "/coming-soon"
  }, external_react_default.a.createElement(AnalyticsIcon, {
    action: "footer-facebook",
    bordered: true,
    size: iconSize,
    name: "facebook"
  })), external_react_default.a.createElement("a", {
    href: "/coming-soon"
  }, external_react_default.a.createElement(AnalyticsIcon, {
    action: "footer-facebook",
    bordered: true,
    size: iconSize,
    name: "twitter"
  })), external_react_default.a.createElement("a", {
    href: "/coming-soon"
  }, external_react_default.a.createElement(AnalyticsIcon, {
    action: "footer-facebook",
    bordered: true,
    size: iconSize,
    name: "linkedin"
  })))));
}));
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/pages/index.js







/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return external_react_default.a.createElement(external_react_["Fragment"], null, external_react_default.a.createElement(Block1, null), external_react_default.a.createElement(Block2, null), external_react_default.a.createElement(Block3, null), external_react_default.a.createElement(Block4, null), external_react_default.a.createElement(Block5, null), external_react_default.a.createElement(Footer, null));
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(1);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/taggedTemplateLiteral"
var taggedTemplateLiteral_ = __webpack_require__(2);
var taggedTemplateLiteral_default = /*#__PURE__*/__webpack_require__.n(taggedTemplateLiteral_);

// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/utils/style.js
var style = __webpack_require__(0);

// EXTERNAL MODULE: external "@babel/runtime/helpers/classCallCheck"
var classCallCheck_ = __webpack_require__(16);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/createClass"
var createClass_ = __webpack_require__(17);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
var possibleConstructorReturn_ = __webpack_require__(18);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/getPrototypeOf"
var getPrototypeOf_ = __webpack_require__(19);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/assertThisInitialized"
var assertThisInitialized_ = __webpack_require__(11);
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/inherits"
var inherits_ = __webpack_require__(20);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_);

// EXTERNAL MODULE: external "@babel/runtime/helpers/defineProperty"
var defineProperty_ = __webpack_require__(7);
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_);

// EXTERNAL MODULE: external "semantic-ui-react"
var external_semantic_ui_react_ = __webpack_require__(3);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/Input/index.js

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/utils/utils.js
/**
 * @description calls the callback if enter key has been pressed
 * @param {*} value
 * @param {func} callback
 * @returns {void}
 */
var withEnterKey = function withEnterKey(value, callback) {
  return function (e) {
    if (e.key === "Enter" && e.shiftKey === false && value && value !== "") {
      e.preventDefault();
      callback(value);
    }
  };
};
// EXTERNAL MODULE: /Users/noconnor1/Desktop/niall/template-website/src/utils/analytics.js
var analytics = __webpack_require__(21);

// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/EmailSignUp/index.js












var EmailSignUp_EmailSignUp = /*#__PURE__*/function (_Component) {
  inherits_default()(EmailSignUp, _Component);

  function EmailSignUp() {
    var _getPrototypeOf2;

    var _this;

    classCallCheck_default()(this, EmailSignUp);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = possibleConstructorReturn_default()(this, (_getPrototypeOf2 = getPrototypeOf_default()(EmailSignUp)).call.apply(_getPrototypeOf2, [this].concat(args)));

    defineProperty_default()(assertThisInitialized_default()(_this), "state", {
      email: ""
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "handleChange", function (e, _ref) {
      var value = _ref.value;
      return _this.setState({
        email: value
      });
    });

    defineProperty_default()(assertThisInitialized_default()(_this), "handleClick", function () {
      var email = _this.state.email;
      console.log(email);
      Object(analytics["a" /* handleEvent */])("email-sign-up");
    });

    return _this;
  }

  createClass_default()(EmailSignUp, [{
    key: "render",
    value: function render() {
      return external_react_default.a.createElement(external_semantic_ui_react_["Input"], {
        fluid: true,
        placeholder: "Enter your email",
        type: "email",
        onChange: this.handleChange,
        onKeyUp: withEnterKey(this.state.email, this.handleClick),
        action: {
          type: "button",
          content: "Sign up",
          onClick: this.handleClick
        }
      });
    }
  }]);

  return EmailSignUp;
}(external_react_["Component"]);


// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/components/ComingSoon/index.js


function _templateObject5() {
  var data = taggedTemplateLiteral_default()(["\n    ", " {\n        max-width: ", ";\n    }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    line-height: ", ";\n    font-size: ", ";\n    margin: ", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = taggedTemplateLiteral_default()(["\n    display: block;\n    font-size: ", ";\n    line-height: ", ";\n    margin: ", ";\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = taggedTemplateLiteral_default()(["\n    display: flex;\n    justify-content: center;\n    flex-direction: column;\n    max-width: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = taggedTemplateLiteral_default()(["\n    min-height: 100vh;\n    padding: ", ";\n    background-color: ", ";\n    font-family: ", ";\n    display: flex;\n    justify-content: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}




var Container = style["e" /* styled */].section(_templateObject(), function (_ref) {
  var paddings = _ref.theme.comingSoon.paddings;
  return Object(style["c" /* getMarginsOrPaddings */])(paddings);
}, function (_ref2) {
  var backgroundColor = _ref2.theme.comingSoon.backgroundColor;
  return backgroundColor;
}, function (_ref3) {
  var fontFamily = _ref3.theme.comingSoon.fontFamily;
  return fontFamily;
});
var InnerContainer = style["e" /* styled */].div(_templateObject2(), function (_ref4) {
  var comingSoon = _ref4.theme.comingSoon;
  return Object(style["d" /* remCalc */])(comingSoon.width);
});
var Heading = style["e" /* styled */].h1(_templateObject3(), function (_ref5) {
  var headingSize = _ref5.theme.comingSoon.headingSize;
  return Object(style["d" /* remCalc */])(headingSize);
}, function (_ref6) {
  var headingLineHeight = _ref6.theme.comingSoon.headingLineHeight;
  return Object(style["d" /* remCalc */])(headingLineHeight);
}, function (_ref7) {
  var headingMargins = _ref7.theme.comingSoon.headingMargins;
  return "".concat(Object(style["d" /* remCalc */])(headingMargins[0]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[1]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[2]), " ").concat(Object(style["d" /* remCalc */])(headingMargins[3]));
});
var SubHeading = style["e" /* styled */].p(_templateObject4(), function (_ref8) {
  var subHeadingLineHeight = _ref8.theme.comingSoon.subHeadingLineHeight;
  return Object(style["d" /* remCalc */])(subHeadingLineHeight);
}, function (_ref9) {
  var subHeadingSize = _ref9.theme.comingSoon.subHeadingSize;
  return Object(style["d" /* remCalc */])(subHeadingSize);
}, function (_ref10) {
  var subHeadingMargins = _ref10.theme.comingSoon.subHeadingMargins;
  return "".concat(Object(style["d" /* remCalc */])(subHeadingMargins[0]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[1]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[2]), " ").concat(Object(style["d" /* remCalc */])(subHeadingMargins[3]));
});
var SignUpContainer = style["e" /* styled */].div(_templateObject5(), function (_ref11) {
  var breakpoints = _ref11.theme.breakpoints;
  return Object(style["b" /* createMediaQuery */])(breakpoints.tablet);
}, function (_ref12) {
  var comingSoon = _ref12.theme.comingSoon;
  return Object(style["d" /* remCalc */])(comingSoon.signUpWidth);
});
/* harmony default export */ var ComingSoon = (function () {
  return external_react_default.a.createElement(Container, null, external_react_default.a.createElement(InnerContainer, null, external_react_default.a.createElement(Heading, null, "Coming Soon"), external_react_default.a.createElement(SubHeading, null, "Sign up now to the upcoming Idea Camels release and receive an early bird discount."), external_react_default.a.createElement(SignUpContainer, null, external_react_default.a.createElement(EmailSignUp_EmailSignUp, null))));
});
// CONCATENATED MODULE: /Users/noconnor1/Desktop/niall/template-website/src/pages/coming-soon.js


/* harmony default export */ var coming_soon = __webpack_exports__["default"] = (function () {
  return external_react_default.a.createElement(ComingSoon, null);
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(__webpack_require__(1));

var _reactStatic = __webpack_require__(14);

var _router = __webpack_require__(12);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _default = function _default(_ref) {
  var _ref$RouterProps = _ref.RouterProps,
      userRouterProps = _ref$RouterProps === void 0 ? {} : _ref$RouterProps;
  return {
    Root: function Root(PreviousRoot) {
      return function (_ref2) {
        var children = _ref2.children,
            rest = _objectWithoutProperties(_ref2, ["children"]);

        var basepath = (0, _reactStatic.useBasepath)();
        var staticInfo = (0, _reactStatic.useStaticInfo)();

        var RouteHandler = function RouteHandler(props) {
          return _react["default"].createElement(PreviousRoot, _extends({}, rest, props), children);
        };

        var renderedChildren = // Place a top-level router inside the root
        // This will give proper context to Link and other reach components
        _react["default"].createElement(_router.Router, _extends({}, basepath ? {
          basepath: basepath
        } : {}, userRouterProps), _react["default"].createElement(RouteHandler, {
          path: "/*"
        })); // If we're in SSR, use a manual server location


        return typeof document === 'undefined' ? _react["default"].createElement(_router.ServerLocation, {
          url: (0, _reactStatic.makePathAbsolute)("".concat(basepath, "/").concat(staticInfo.path))
        }, renderedChildren) : renderedChildren;
      };
    },
    Routes: function Routes(PreviousRoutes) {
      return function (props) {
        return (// Wrap Routes in location
          _react["default"].createElement(_router.Location, null, function (location) {
            return _react["default"].createElement(PreviousRoutes, _extends({
              path: "/*"
            }, props, {
              location: location
            }));
          })
        );
      };
    }
  };
};

exports["default"] = _default;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8080d4cafe7b013b830f00661ad84fb2.png";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fb85441af99c1947f1e1ee2fa21d4268.webp";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1a0aa49efef1efd47a6250fbc69cd189.png";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(47);
__webpack_require__(48);
module.exports = __webpack_require__(54);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var plugins = __webpack_require__(33)["default"];

var _require = __webpack_require__(34),
    registerPlugins = _require.registerPlugins;

registerPlugins(plugins);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("/Users/noconnor1/Desktop/niall/template-website/artifacts/react-static-browser-plugins.js", function () {
    registerPlugins(__webpack_require__(33)["default"]);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)(module)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
/* eslint-disable import/no-dynamic-require */

var _require = __webpack_require__(34),
    registerTemplates = _require.registerTemplates;

var _require2 = __webpack_require__(35),
    templates = _require2["default"],
    notFoundTemplate = _require2.notFoundTemplate;

registerTemplates(templates, notFoundTemplate);

if (typeof document !== 'undefined' && module && module.hot) {
  module.hot.accept("/Users/noconnor1/Desktop/niall/template-website/artifacts/react-static-templates.js", function () {
    var _require3 = __webpack_require__(35),
        templates = _require3["default"],
        notFoundTemplate = _require3.notFoundTemplate;

    registerTemplates(templates, notFoundTemplate);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)(module)))

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports["default"] = requireUniversalModule;

var _utils = __webpack_require__(25);

var CHUNK_NAMES = exports.CHUNK_NAMES = new Set();
var MODULE_IDS = exports.MODULE_IDS = new Set();

function requireUniversalModule(universalConfig, options, props, prevProps) {
  var key = options.key,
      _options$timeout = options.timeout,
      timeout = _options$timeout === undefined ? 15000 : _options$timeout,
      onLoad = options.onLoad,
      onError = options.onError,
      isDynamic = options.isDynamic,
      modCache = options.modCache,
      promCache = options.promCache,
      usesBabelPlugin = options.usesBabelPlugin;
  var config = getConfig(isDynamic, universalConfig, options, props);
  var chunkName = config.chunkName,
      path = config.path,
      resolve = config.resolve,
      load = config.load;
  var asyncOnly = !path && !resolve || typeof chunkName === 'function';

  var requireSync = function requireSync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);

    if (!exp) {
      var mod = void 0;

      if (!(0, _utils.isWebpack)() && path) {
        var modulePath = (0, _utils.callForString)(path, props) || '';
        mod = (0, _utils.tryRequire)(modulePath);
      } else if ((0, _utils.isWebpack)() && resolve) {
        var weakId = (0, _utils.callForString)(resolve, props);

        if (__webpack_require__.m[weakId]) {
          mod = (0, _utils.tryRequire)(weakId);
        }
      }

      if (mod) {
        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache, true);
      }
    }

    return exp;
  };

  var requireAsync = function requireAsync(props, context) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (exp) return Promise.resolve(exp);
    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);
    if (cachedPromise) return cachedPromise;
    var prom = new Promise(function (res, rej) {
      var reject = function reject(error) {
        error = error || new Error('timeout exceeded');
        clearTimeout(timer);

        if (onError) {
          var _isServer = typeof window === 'undefined';

          var info = {
            isServer: _isServer
          };
          onError(error, info);
        }

        rej(error);
      }; // const timer = timeout && setTimeout(reject, timeout)


      var timer = timeout && setTimeout(reject, timeout);

      var resolve = function resolve(mod) {
        clearTimeout(timer);
        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, context, modCache);
        if (exp) return res(exp);
        reject(new Error('export not found'));
      };

      var request = load(props, {
        resolve: resolve,
        reject: reject
      }); // if load doesn't return a promise, it must call resolveImport
      // itself. Most common is the promise implementation below.

      if (!request || typeof request.then !== 'function') return;
      request.then(resolve)["catch"](reject);
    });
    (0, _utils.cacheProm)(prom, chunkName, props, promCache);
    return prom;
  };

  var addModule = function addModule(props) {
    if (_utils.isServer || _utils.isTest) {
      if (chunkName) {
        var name = (0, _utils.callForString)(chunkName, props);

        if (usesBabelPlugin) {
          // if ignoreBabelRename is true, don't apply regex
          var shouldKeepName = options && !!options.ignoreBabelRename;

          if (!shouldKeepName) {
            name = name.replace(/\//g, '-');
          }
        }

        if (name) CHUNK_NAMES.add(name);
        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds
      }

      if ((0, _utils.isWebpack)()) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (weakId) MODULE_IDS.add(weakId);
        return weakId;
      }

      if (!(0, _utils.isWebpack)()) {
        var modulePath = (0, _utils.callForString)(path, props);
        if (modulePath) MODULE_IDS.add(modulePath);
        return modulePath;
      }
    }
  };

  var shouldUpdate = function shouldUpdate(next, prev) {
    var cacheKey = (0, _utils.callForString)(chunkName, next);
    var config = getConfig(isDynamic, universalConfig, options, prev);
    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);
    return cacheKey !== prevCacheKey;
  };

  return {
    requireSync: requireSync,
    requireAsync: requireAsync,
    addModule: addModule,
    shouldUpdate: shouldUpdate,
    asyncOnly: asyncOnly
  };
}

var flushChunkNames = exports.flushChunkNames = function flushChunkNames() {
  var chunks = Array.from(CHUNK_NAMES);
  CHUNK_NAMES.clear();
  return chunks;
};

var flushModuleIds = exports.flushModuleIds = function flushModuleIds() {
  var ids = Array.from(MODULE_IDS);
  MODULE_IDS.clear();
  return ids;
};

var clearChunks = exports.clearChunks = function clearChunks() {
  CHUNK_NAMES.clear();
  MODULE_IDS.clear();
};

var getConfig = function getConfig(isDynamic, universalConfig, options, props) {
  if (isDynamic) {
    var resultingConfig = typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;

    if (options) {
      resultingConfig = _extends({}, resultingConfig, options);
    }

    return resultingConfig;
  }

  var load = typeof universalConfig === 'function' ? universalConfig : // $FlowIssue
  function () {
    return universalConfig;
  };
  return {
    file: 'default',
    id: options.id || 'default',
    chunkName: options.chunkName || 'default',
    resolve: options.resolve || '',
    path: options.path || '',
    load: load,
    ignoreBabelRename: true
  };
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	".": 13,
	"./": 13,
	"./index": 13,
	"./index.js": 13
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 50;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(24);

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(26);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReportChunks = function (_React$Component) {
  _inherits(ReportChunks, _React$Component);

  function ReportChunks() {
    _classCallCheck(this, ReportChunks);

    return _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).apply(this, arguments));
  }

  _createClass(ReportChunks, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        report: this.props.report
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2["default"].Children.only(this.props.children);
    }
  }]);

  return ReportChunks;
}(_react2["default"].Component);

ReportChunks.propTypes = {
  report: _propTypes2["default"].func.isRequired
};
ReportChunks.childContextTypes = {
  report: _propTypes2["default"].func.isRequired
};
exports["default"] = ReportChunks;

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__handleAfter = exports.__update = undefined;

var _hoistNonReactStatics = __webpack_require__(36);

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _index = __webpack_require__(10);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

var __update = exports.__update = function __update(props, state, isInitialized) {
  var isMount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isSync = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var isServer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (!isInitialized) return state;

  if (!state.error) {
    state.error = null;
  }

  return __handleAfter(props, state, isMount, isSync, isServer);
};
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__handleAfter"] }] */


var __handleAfter = exports.__handleAfter = function __handleAfter(props, state, isMount, isSync, isServer) {
  var mod = state.mod,
      error = state.error;

  if (mod && !error) {
    (0, _hoistNonReactStatics2["default"])(_index2["default"], mod, {
      preload: true,
      preloadWeak: true
    });

    if (props.onAfter) {
      var onAfter = props.onAfter;
      var info = {
        isMount: isMount,
        isSync: isSync,
        isServer: isServer
      };
      onAfter(info, mod);
    }
  } else if (error && props.onError) {
    props.onError(error);
  }

  return state;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(55);

var _interopRequireDefault = __webpack_require__(56);

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(28));

var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(29));

var React = _interopRequireWildcard(__webpack_require__(1));

var _useStaticInfo = __webpack_require__(57);
/* eslint-disable import/no-dynamic-require */


var OriginalSuspense = React.Suspense;

function Suspense(_ref) {
  var key = _ref.key,
      children = _ref.children,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["key", "children"]);
  return typeof document !== 'undefined' ? React.createElement(OriginalSuspense, (0, _extends2["default"])({
    key: key
  }, rest), children) : React.createElement(React.Fragment, {
    key: key
  }, children);
} // Override the suspense module to be our own


React.Suspense = Suspense;
React["default"].Suspense = Suspense;

var App = __webpack_require__(58)["default"];

var _default = function _default(staticInfo) {
  return function (props) {
    return React.createElement(_useStaticInfo.staticInfoContext.Provider, {
      value: staticInfo
    }, React.createElement(App, props));
  };
};

exports["default"] = _default;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("/Users/noconnor1/Desktop/niall/template-website/node_modules/react-static/lib/browser/hooks/useStaticInfo");

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(60);
/* harmony import */ var semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(semantic_ui_css_semantic_min_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);



 // Your top level component

 // Export your top level component as JSX (for static rendering)

/* harmony default export */ __webpack_exports__["default"] = (_App__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]); // Render your app

if (typeof document !== 'undefined') {
  var target = document.getElementById('root');
  var renderMethod = target.hasChildNodes() ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate : react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;

  var render = function render(Comp) {
    renderMethod(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["AppContainer"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comp, null)), target);
  }; // Render!


  render(_App__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]); // Hot Module Replacement

  if (module && module.hot) {
    module.hot.accept('./App', function () {
      render(_App__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(59)(module)))

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule); // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("semantic-ui-css/semantic.min.css");

/***/ })
/******/ ]);
});