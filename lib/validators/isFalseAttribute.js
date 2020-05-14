"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isFalseAttribute;

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isFalseAttribute(str) {
  return str === false || (0, _isNull2["default"])(str) || (0, _isUndefined2["default"])(str);
}