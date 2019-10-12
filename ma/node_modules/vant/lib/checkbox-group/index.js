"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _use = (0, _utils.use)('checkbox-group'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ParentMixin)('vanCheckbox')],
  props: {
    max: Number,
    value: Array,
    disabled: Boolean
  },
  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem()
    }, [this.slots()]);
  }
});

exports.default = _default;