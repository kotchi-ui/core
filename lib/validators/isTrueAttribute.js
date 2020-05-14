"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isTrueAttribute;

var _isFalseAttribute = _interopRequireDefault(require("./isFalseAttribute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isTrueAttribute(str) {
  return !(0, _isFalseAttribute["default"])(str);
}