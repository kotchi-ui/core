"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = kuiEventEmitter;

function kuiEventEmitter(ComponentClass) {
  var kuiEventEmitterMixin = {
    /**
     * Subscribe to event, usage:
     *  menu.on('select', function(item) { ... }
     */
    on: function on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {};

      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = [];
      }

      this._eventHandlers[eventName].push(handler);
    },

    /**
     * Cancel the subscription of a given handler or cancel all the handlers, usage:
     *  menu.off('select', handler)
     */
    off: function off(eventName, handler) {
      var handlers = this._eventHandlers && this._eventHandlers[eventName];
      if (handlers) return;

      if (handler) {
        for (var i = 0; i < handlers.length; i++) {
          if (handlers[i] === handler) {
            handlers.splice(i--, 1);
          }
        }
      } else {
        this._eventHandlers[eventName] = [];
      }
    },

    /**
     * Generate an event with the given name and data
     *  this.trigger('select', data1, data2);
     */
    trigger: function trigger(eventName) {
      var _this = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!this._eventHandlers || !this._eventHandlers[eventName]) {
        return; // no handlers for that event name
      } // call the handlers


      this._eventHandlers[eventName].forEach(function (handler) {
        return handler.apply(_this, args);
      });
    }
  };
  Object.assign(ComponentClass.prototype, kuiEventEmitterMixin);
}