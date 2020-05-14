"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.attributeToProperty = attributeToProperty;
exports.propertyToAttribute = propertyToAttribute;

var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function attributeToProperty(attribute) {
  return (0, _camelCase2["default"])(attribute);
}

function propertyToAttribute(property) {
  return (0, _kebabCase2["default"])(property);
}