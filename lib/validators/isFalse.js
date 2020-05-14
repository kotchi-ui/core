"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isFalse;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isFalse(str) {
  return str === false || !!str && (0, _isString2["default"])(str) && str.toLowerCase() === "false";
}