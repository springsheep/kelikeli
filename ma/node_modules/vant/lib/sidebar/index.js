"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _relation = require("../mixins/relation");

var _use = (0, _utils.use)('sidebar'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ParentMixin)('vanSidebar')],
  props: {
    activeKey: {
      type: [Number, String],
      default: 0
    }
  },
  render: function render(h) {
    return h("div", {
      "class": [bem(), 'van-hairline--top-bottom']
    }, [this.slots()]);
  }
});

exports.default = _default;