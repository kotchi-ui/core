"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiChangeHandler;

var _changeHandlerHelper = _interopRequireDefault(require("./changeHandlerHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function kuiChangeHandler(target, name, descriptor) {
  var originalMethod = descriptor.value;
  descriptor.value = (0, _changeHandlerHelper["default"])(target, originalMethod);
  return descriptor;
}