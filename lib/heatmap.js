(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Heatmap"] = factory(require("react"));
	else
		root["Heatmap"] = factory(root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var optsDetails = ['radius', 'gradient', 'opacity', 'zooms'];

var Heatmap = function (_React$Component) {
  _inherits(Heatmap, _React$Component);

  function Heatmap(props) {
    _classCallCheck(this, Heatmap);

    var _this = _possibleConstructorReturn(this, (Heatmap.__proto__ || Object.getPrototypeOf(Heatmap)).call(this, props));

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Heatmap has to be a child of Map component');
      } else {
        _this.map = props.__map__;
        _this.element = props.__ele__;
        _this.resolveHeatmap(props).then(function () {
          _this.triggerCreated(props);
          // if visible is set to false on created, hide it
          if (typeof props.visible === 'boolean' && !props.visible) {
            _this.heatmap.hide();
          }
          if ('dataSet' in props) {
            _this.convertToAMap(props.dataSet);
          }
        });
      }
    }
    return _this;
  }

  _createClass(Heatmap, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      // compare nextProp and this.props determine
      // specify prop need to be refresh
      // alse, assure heatmap is loaded
      var currentProps = this.props;
      this.resolveHeatmap().then(function () {
        _this2.refreshHeatmap(nextProps, currentProps);
      });
    }
  }, {
    key: 'resolveHeatmap',
    value: function resolveHeatmap(props) {
      var _this3 = this;

      if (this.heatmap) {
        return new Promise(function (resolve) {
          resolve(_this3.heatmap);
        });
      } else {
        return new Promise(function (resolve) {
          _this3.map.plugin(['AMap.Heatmap'], function () {
            var heatmapOptions = _this3.buildInitOptions(props);
            _this3.heatmap = new window.AMap.Heatmap(_this3.map, heatmapOptions);
            resolve(_this3.heatmap);
          });
        });
      }
    }

    // 地图数据转换

  }, {
    key: 'convertToAMap',
    value: function convertToAMap(dataSet) {
      var points = dataSet.data.map(function (item) {
        return new AMap.LngLat(item.lng, item.lat);
      });

      AMap.convertFrom(points, 'baidu', function (status, result) {
        if (result.info === 'ok') {
          var lnglats = result.locations;
          var rData = lnglats.map(function (item, index) {
            return {
              count: dataSet.data[index].count,
              lng: item.getLng(),
              lat: item.getLat()
            };
          });
          this.heatmap.setDataSet({
            data: rData
          });
        }
      });
    }
  }, {
    key: 'triggerCreated',
    value: function triggerCreated(props) {
      var events = props.events || {};
      if ('created' in events && typeof events.created === 'function') {
        events.created(this.heatmap);
      }
    }
  }, {
    key: 'buildInitOptions',
    value: function buildInitOptions(props) {
      var opts = {};
      optsDetails.forEach(function (key) {
        if (key in props) {
          opts[key] = props[key];
        }
      });
      return opts;
    }
  }, {
    key: 'refreshHeatmap',
    value: function refreshHeatmap(nextProps, currentProps) {
      if ('visible' in nextProps) {
        if (nextProps.visible) {
          this.heatmap.show();
        } else {
          this.heatmap.hide();
        }
      }

      var opts = {};
      var optsRefresh = false;
      optsDetails.forEach(function (key) {
        if (nextProps[key] !== currentProps[key]) {
          optsRefresh = true;
          opts[key] = nextProps[key];
        }
      });
      if (optsRefresh) {
        this.heatmap.setOptions(opts);
      }

      if (nextProps.dataSet !== currentProps.dataSet) {
        this.convertToAMap(nextProps.dataSet);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.heatmap.hide();
      this.heatmap.setMap(null);
      delete this.heatmap;
    }
  }]);

  return Heatmap;
}(_react2.default.Component);

module.exports = Heatmap;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});