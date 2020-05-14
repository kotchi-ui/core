"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiCustomElement;

var _camelCase2 = _interopRequireDefault(require("lodash/camelCase"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isNull2 = _interopRequireDefault(require("lodash/isNull"));

var _customElementData = require("../utils/customElementData");

var _customElementUtils = require("../utils/customElementUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var definedElements = {};

function kuiCustomElement(_ref) {
  var tagName = _ref.tagName,
      _ref$allowedChildren = _ref.allowedChildren,
      allowedChildren = _ref$allowedChildren === void 0 ? [] : _ref$allowedChildren,
      _ref$allowedParents = _ref.allowedParents,
      allowedParents = _ref$allowedParents === void 0 ? [] : _ref$allowedParents;
  return function (ComponentClass) {
    var KUICustomElement = /*#__PURE__*/function (_ComponentClass) {
      _inherits(KUICustomElement, _ComponentClass);

      var _super = _createSuper(KUICustomElement);

      function KUICustomElement() {
        var _this;

        _classCallCheck(this, KUICustomElement);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        _this.__kuiChildren = findKUIChildren.call({}, _assertThisInitialized(_this));
        _this.__handlersQueue = [];
        return _this;
      }

      _createClass(KUICustomElement, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          var _this2 = this;

          var _callback = function callback(children) {
            _this2.__kuiChildrenReady = true;

            if ((0, _isFunction2["default"])(ComponentClass.prototype.connectedCallback)) {
              _callback = ComponentClass.prototype.connectedCallback.call(_this2, children);
            }

            _this2.__handlersQueue.forEach(function (handler) {
              return handler.call(_this2);
            });
          };

          syncAttributes.call(this, tagName);
          handleChildren.call(this, {
            allowedChildren: allowedChildren,
            tagName: tagName,
            callback: _callback
          });
          handleParents.call(this, {
            allowedParents: allowedParents,
            tagName: tagName
          });
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback(attribute, oldValue, newValue) {
          var handler = "".concat((0, _camelCase2["default"])(attribute), "ChangeHandler");

          if (this.__kuiChildrenReady) {
            // logger.info(`Calling ${handler}`);
            this[handler].call(this, {
              attribute: attribute,
              oldValue: oldValue,
              newValue: newValue
            });
          } else {
            // logger.info(`adding ${handler} to handlers queue till children are ready`);
            this.__handlersQueue.push(this[handler].bind(this, {
              attribute: attribute,
              oldValue: oldValue,
              newValue: newValue
            }));
          }
        }
      }], [{
        key: "observedAttributes",
        get: function get() {
          var attrs = (0, _customElementData.getObservedAttributes)({
            tagName: tagName
          }); // logger.info(`Observing [${attrs.join(", ")}] for ${tagName}`);

          return attrs;
        }
      }]);

      return KUICustomElement;
    }(ComponentClass);

    defineCustomElement.call(this, {
      tagName: tagName,
      KUICustomElement: KUICustomElement
    });
    return KUICustomElement;
  };
} // searchs for all the kui-* elements under the container


function findKUIChildren(container) {
  var allNodes = _toConsumableArray(container.shadowRoot.querySelectorAll("*"));

  var kuiNodes = allNodes.filter(function (el) {
    return el.tagName.toLowerCase().startsWith("kui-");
  });

  var types = _toConsumableArray(new Set(kuiNodes.map(function (el) {
    return el.tagName.toLowerCase();
  })));

  return {
    nodes: kuiNodes,
    types: types
  };
}

function syncAttributes(tagName) {
  var _this3 = this;

  var attributes = (0, _customElementData.getObservedAttributes)({
    tagName: tagName
  });
  attributes.forEach(function (attr) {
    var defaultValue = (0, _customElementData.getAttributeDefault)({
      tagName: tagName,
      attribute: attr
    });

    if (_this3.getAttribute(attr) === null) {
      if ((0, _isUndefined2["default"])(defaultValue) || (0, _isNull2["default"])(defaultValue) || defaultValue === false) {
        _this3.attributeChangedCallback(attr, null, null);
      } else {
        _this3[(0, _camelCase2["default"])(attr)] = defaultValue;
      }
    }
  });
}

function handleParents(_ref2) {
  var tagName = _ref2.tagName,
      allowedParents = _ref2.allowedParents;

  if (allowedParents.length > 0) {// logger.info(tagName);
    // logger.info(allowedParents);
  }
}

function handleChildren(_ref3) {
  var tagName = _ref3.tagName,
      allowedChildren = _ref3.allowedChildren,
      callback = _ref3.callback;

  var types = _toConsumableArray(this.__kuiChildren.types);

  var nodes = _toConsumableArray(this.__kuiChildren.nodes);

  if (allowedChildren.length > 0) {
    if ((0, _isUndefined2["default"])(this.elements.contentsContainer)) {
      throw new Error("".concat(tagName, " class should have contentsContainer element"));
    }

    var _validateChildren = (0, _customElementUtils.validateChildren)({
      element: this.elements.contentsContainer,
      allowedChildren: allowedChildren,
      tagName: tagName
    }),
        childrenTypes = _validateChildren.childrenTypes,
        children = _validateChildren.children;

    types = _toConsumableArray(new Set([].concat(_toConsumableArray(types), _toConsumableArray(childrenTypes))));
    nodes = _toConsumableArray(new Set([].concat(_toConsumableArray(nodes), _toConsumableArray(children))));
  }

  if (types.length > 0 && nodes.length > 0) {
    (0, _customElementUtils.registerChildren)({
      childrenTypes: types,
      children: nodes,
      definedCallback: callback
    });
  } else {
    callback([]);
  }
}

function defineCustomElement(_ref4) {
  var tagName = _ref4.tagName,
      KUICustomElement = _ref4.KUICustomElement;

  // logger.info(`defining ${tagName} ... `);
  if (!definedElements[tagName]) {
    definedElements[tagName] = true; // logger.info(`Creating new instance of ${tagName} ... `);

    window.customElements.define(tagName, KUICustomElement); // logger.info(`${tagName} is now defined`);
  } else {// logger.info(`${tagName} is already defined`);
    }
}