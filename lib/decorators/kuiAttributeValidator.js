"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiAttributeValidator;

var _kebabCase2 = _interopRequireDefault(require("lodash/kebabCase"));

var _customElementData = require("../utils/customElementData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function kuiAttributeValidator() {
  var validators = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function (target, propertyName, descriptor) {
    var tagName = target.getTagName();
    var attribute = (0, _kebabCase2["default"])(propertyName);
    (0, _customElementData.setAttributeValidators)({
      tagName: tagName,
      attribute: attribute,
      validators: validators
    });
    return descriptor;
  };
}