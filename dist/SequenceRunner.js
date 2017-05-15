"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Leandro Silva
 * @copyright 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @classdesc Create unique loading text, HTML sequences, and even sprite animations.
*/

//jshint esversion: 6, node: true, browser: true

var SequenceRunner = function () {

  /**
   * Creates a new SequenceRunner instance.
   * @throws {Error} Throws if you attempt to define a setting that does not exist.
   * @param  {Object}       [settings]                             The sequence settings.
   * @param  {String}       [settings.selector=".sequence-runner"] The HTML container to write your content to. It can be an id, class, tag, etc.
   * @param  {String|Array} [settings.content="."]                 The content to add to your selected HTML container(s). If set to a string, the
   *                                                               content will be duplicated based on the amount set in the 'duplicate' settings
   *                                                               property. If set to an array, the duplicate property will be auto set based on
   *                                                               the length of the array.
   * @param  {Number}       [settings.duplicate=3]                 The number of times to duplicate your content.
   * @param  {Number}       [settings.delay=500]                   The delay between changes.
   * @param  {Number}       [settings.loop=null]                   The amount of times to loop between changes. If set to 'null,' the loop will
   *                                                               be infinite.
   * @returns {SequenceRunner}
   */
  function SequenceRunner(settings) {
    _classCallCheck(this, SequenceRunner);

    var defaults = {
      selector: ".sequence-runner",
      content: ".",
      duplicate: 3,
      delay: 500,
      loop: null
    };

    for (var key in settings) {
      if (!defaults.hasOwnProperty(key)) {
        throw new Error("You're attempting to define a setting that does not exist.");
      }
    }

    this._settings = Object.assign(defaults, settings);
    this._elements = document.querySelectorAll(this._settings.selector);

    if (this._settings.content instanceof Array) {
      if (settings.duplicate) {
        console.warn("The 'duplicate' property should not be used when 'content' is an array.");
      }

      this._isArray = true;
      this._settings.duplicate = this._settings.content.length;
    }

    this.stop();

    return this;
  }

  /**
   * Gets the current settings.
   * @type {Object}
   */


  _createClass(SequenceRunner, [{
    key: "start",


    /**
     * Starts the sequence.
     * @returns {SequenceRunner}
     */
    value: function start() {
      this._currContent = "";
      this._count = 0;
      this._loop = 0;

      this.stop();
      this._onInterate();

      this._intr = setInterval(this._onInterate.bind(this), this._settings.delay);

      return this;
    }
  }, {
    key: "_onInterate",
    value: function _onInterate() {
      var _this = this;

      if (this._count >= this._settings.duplicate) {
        this._count = 0;

        if (!this._isArray) {
          this._currContent = "";
        }
      }

      if (this._isArray) {
        this._currContent = this._settings.content[this._count];
      } else {
        this._currContent += this._settings.content;
      }

      this._elements.forEach(function (el) {
        return el.innerHTML = _this._currContent;
      });

      if (this._onChangeFn) {
        this._onChangeFn(this._currContent, this._count, this._loop);
      }

      if (this._settings.loop) {
        if (this._count >= this._settings.duplicate - 1) {
          this._loop++;
        }

        if (this._loop >= this._settings.loop) {
          this.pause();

          if (this._onCompleteFn) {
            this._onCompleteFn(this._currContent, this._count, this._loop);
          }
        }
      }

      this._count++;
    }

    /**
     * Pauses the sequence. This method clears the interval, but does not empty the HTML container(s).
     * @returns {SequenceRunner}
     */

  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this._intr);

      return this;
    }

    /**
     * Stops the sequence. This method clears the interval and empties the HTML container(s).
     * @returns {SequenceRunner}
     */

  }, {
    key: "stop",
    value: function stop() {
      clearInterval(this._intr);
      this._elements.forEach(function (el) {
        return el.innerHTML = "";
      });

      return this;
    }

    /**
     * Calls your function on every change.
     * @param   {SequenceRunner~onChangeCallback} callback The callback function.
     * @returns {SequenceRunner}
     */

  }, {
    key: "onChange",
    value: function onChange(callback) {
      this._onChangeFn = callback;

      return this;
    }

    /**
     * The callback used by the 'onChange' method.
     * @callback SequenceRunner~onChangeCallback
     * @param {*}      content The current content.
     * @param {Number} count   The current tick/count.
     * @param {Number} loop    The current loop.
     */

    /**
     * Calls your function at the end of the loop (assuming you set a loop).
     * @param   {SequenceRunner~onCompleteCallback} callback The callback function.
     * @returns {SequenceRunner}
     */

  }, {
    key: "onComplete",
    value: function onComplete(callback) {
      this._onCompleteFn = callback;

      return this;
    }

    /**
     * The callback used by the 'onComplete' method.
     * @callback SequenceRunner~onCompleteCallback
     * @param {*}      content The current content.
     * @param {Number} count   The current tick/count.
     * @param {Number} loop    The current loop.
     */

  }, {
    key: "settings",
    get: function get() {
      return this._settings;
    }
  }]);

  return SequenceRunner;
}();

//Support CJS/Node


if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
  module.exports = SequenceRunner;
}
