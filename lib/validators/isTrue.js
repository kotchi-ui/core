"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isTrue;

var _isString2 = _interopRequireDefault(require("lodash/isString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isTrue(str) {
  return str === true || !!str && (0, _isString2["default"])(str) && str.toLowerCase() === "true";
}