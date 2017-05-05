/**
 * @author Leandro Silva
 * @copyright 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @classdesc
 * TDB...
*/

//jshint esversion: 6, node: true, browser: true

class SequenceRunner {

  constructor(settings) {
    let defaults = {
      content: ".",
      duplicate: 3,
      delay: 500,
      selector: ".load-sequence"
    };

    for (let key in settings) {
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

  get settings() {
    return this._settings;
  }

  start() {
    this._currContent = "";
    this._count = 0;

    this.stop();
    this._onInterate();

    this._intr = setInterval(this._onInterate.bind(this), this._settings.delay);

    return this;
  }

  _onInterate() {
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

    this._elements.forEach(el => el.innerHTML = this._currContent);

    if (this._onChangeFn) {
      this._onChangeFn(this._currContent, this._count);
    }

    this._count++;
  }

  pause() {
    clearInterval(this._intr);

    return this;
  }

  stop() {
    clearInterval(this._intr);
    this._elements.forEach(el => el.innerHTML = "");

    return this;
  }

  onChange(callback) {
    this._onChangeFn = callback;

    return this;
  }

}

//Support CJS/Node
if (typeof module === "object" && module.exports) {
  module.exports = SequenceRunner;
}
