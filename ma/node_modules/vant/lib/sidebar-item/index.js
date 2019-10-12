"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _info = _interopRequireDefault(require("../info"));

var _relation = require("../mixins/relation");

var _use = (0, _utils.use)('sidebar-item'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [(0, _relation.ChildrenMixin)('vanSidebar')],
  props: {
    url: String,
    info: [String, Number],
    title: String
  },
  computed: {
    select: function select() {
      return this.index === +this.parent.activeKey;
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit('click', this.index);
      this.parent.$emit('change', this.index);
    }
  },
  render: function render(h) {
    return h("a", {
      "attrs": {
        "href": this.url
      },
      "class": [bem({
        select: this.select
      }), 'van-hairline'],
      "on": {
        "click": this.onClick
      }
    }, [h("div", {
      "class": bem('text')
    }, [this.title, h(_info.default, {
      "attrs": {
        "info": this.info
      },
      "class": bem('info')
    })])]);
  }
});

exports.default = _default;