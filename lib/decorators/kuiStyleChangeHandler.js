"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiStyleChangeHandler;

var _validators = require("../validators");

var _customElementUtils = require("../utils/customElementUtils");

var _changeHandlerHelper = _interopRequireDefault(require("./changeHandlerHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A very basic style applier on the given element, adds/removes the className from the classList
 * Applies the newValue as the className or the given className parameter
 * Sets/Removes the given attributeName with the given attributeValue
 *
 * @param {String|Object} data
 */
function kuiStyleChangeHandler(data) {
  var _ref = {},
      _ref$element = _ref.element,
      element = _ref$element === void 0 ? "" : _ref$element,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _ref$attributeName = _ref.attributeName,
      attributeName = _ref$attributeName === void 0 ? "" : _ref$attributeName,
      _ref$attributeValue = _ref.attributeValue,
      attributeValue = _ref$attributeValue === void 0 ? "" : _ref$attributeValue;

  if (typeof data === "string") {
    element = data;
  } else {
    element = data.element;
    className = data.className;
    attributeName = data.attributeName || "";
    attributeValue = data.attributeValue || "";
  }

  return function (target, name, descriptor) {
    var handler = descriptor.value;

    var styleHandler = function styleHandler(_ref2) {
      var attribute = _ref2.attribute,
          oldValue = _ref2.oldValue,
          newValue = _ref2.newValue,
          defaultValue = _ref2.defaultValue;
      var el = this.elements[element];

      if (className) {
        if ((0, _validators.isTrueAttribute)(newValue)) {
          el.classList.add(className);
          if (attributeName) el.setAttribute(attributeName, attributeValue);
        } else {
          el.classList.remove(className);
          if (attributeName) el.removeAttribute(attributeName);
        }
      } else {
        (0, _customElementUtils.updateElementCssClass)({
          oldValue: oldValue,
          newValue: newValue,
          element: el,
          defaultValue: defaultValue
        });
      }

      handler.call(this, {
        attribute: attribute,
        oldValue: oldValue,
        newValue: newValue,
        defaultValue: defaultValue
      });
    };

    descriptor.value = (0, _changeHandlerHelper["default"])(target, styleHandler);
    return descriptor;
  };
}