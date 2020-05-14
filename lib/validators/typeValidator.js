"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = typeValidator;

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _isString2 = _interopRequireDefault(require("lodash/isString"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function typeValidator(allowedType) {
  return function (value) {
    var isValid = true;

    if (typeof allowedType === "string") {
      isValid = (0, _isNull2["default"])(value) || validatePremitiveType(allowedType, value);
    } else if (_typeof(allowedType) === "object") {
      isValid = (0, _isNull2["default"])(value) || validateEnumType(allowedType, value);
    } else {
      // logger.error(`${allowedType} has no supported validator`);
      isValid = false;
    }

    return isValid;
  };
}

function validatePremitiveType(allowedType, value) {
  switch (allowedType) {
    case _.Types.Boolean:
      return (0, _.isTrueAttribute)(value) || (0, _.isFalseAttribute)(value);

    case _.Types.Number:
      return (0, _isNumber2["default"])(Number.parseInt(value));

    case _.Types.String:
      return (0, _isString2["default"])(value);

    default:
      // logger.error(`${allowedType} has no supported validator`);
      return false;
  }
}

function validateEnumType(allowedType, value) {
  return Object.entries(allowedType).filter(function (pair) {
    return pair[1] === value;
  }).length === 1;
}