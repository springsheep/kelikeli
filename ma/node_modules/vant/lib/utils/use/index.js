"use strict";

exports.__esModule = true;
exports.use = use;

var _bem = require("./bem");

var _sfc = require("./sfc");

var _i18n = require("./i18n");

function use(name) {
  name = 'van-' + name;
  return [(0, _sfc.useSFC)(name), (0, _bem.useBEM)(name), (0, _i18n.useI18N)(name)];
}