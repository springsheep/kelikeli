"use strict";

exports.__esModule = true;
exports.suffixPx = suffixPx;

var _ = require("..");

var _number = require("../validate/number");

function suffixPx(value) {
  if (!(0, _.isDef)(value)) {
    return undefined;
  }

  value = String(value);
  return (0, _number.isNumber)(value) ? value + "px" : value;
}