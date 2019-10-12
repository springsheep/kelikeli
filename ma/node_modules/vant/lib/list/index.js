"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _loading = _interopRequireDefault(require("../loading"));

var _bindEvent = require("../mixins/bind-event");

var _scroll = require("../utils/dom/scroll");

var _use = (0, _utils.use)('list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var _default = sfc({
  mixins: [(0, _bindEvent.BindEventMixin)(function (bind) {
    if (!this.scroller) {
      this.scroller = (0, _scroll.getScrollEventTarget)(this.$el);
    }

    bind(this.scroller, 'scroll', this.check);
  })],
  model: {
    prop: 'loading'
  },
  props: {
    error: Boolean,
    loading: Boolean,
    finished: Boolean,
    errorText: String,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    },
    direction: {
      type: String,
      default: 'down'
    }
  },
  mounted: function mounted() {
    if (this.immediateCheck) {
      this.$nextTick(this.check);
    }
  },
  watch: {
    loading: function loading() {
      this.$nextTick(this.check);
    },
    finished: function finished() {
      this.$nextTick(this.check);
    }
  },
  methods: {
    check: function check() {
      if (this.loading || this.finished || this.error) {
        return;
      }

      var el = this.$el,
          scroller = this.scroller,
          offset = this.offset,
          direction = this.direction;
      var scrollerRect;

      if (scroller.getBoundingClientRect) {
        scrollerRect = scroller.getBoundingClientRect();
      } else {
        scrollerRect = {
          top: 0,
          bottom: scroller.innerHeight
        };
      }

      var scrollerHeight = scrollerRect.bottom - scrollerRect.top;
      /* istanbul ignore next */

      if (!scrollerHeight || window.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return false;
      }

      var isReachEdge = false;
      var placeholderRect = this.$refs.placeholder.getBoundingClientRect();

      if (direction === 'up') {
        isReachEdge = placeholderRect.top - scrollerRect.top <= offset;
      } else {
        isReachEdge = placeholderRect.bottom - scrollerRect.bottom <= offset;
      }

      if (isReachEdge) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },
    clickErrorText: function clickErrorText() {
      this.$emit('update:error', false);
      this.$nextTick(this.check);
    }
  },
  render: function render(h) {
    var Placeholder = h("div", {
      "ref": "placeholder",
      "class": bem('placeholder')
    });
    return h("div", {
      "class": bem(),
      "attrs": {
        "role": "feed",
        "aria-busy": this.loading
      }
    }, [this.direction === 'down' ? this.slots() : Placeholder, this.loading && h("div", {
      "class": bem('loading'),
      "key": "loading"
    }, [this.slots('loading') || h(_loading.default, {
      "attrs": {
        "size": "16"
      }
    }, [this.loadingText || t('loading')])]), this.finished && this.finishedText && h("div", {
      "class": bem('finished-text')
    }, [this.finishedText]), this.error && this.errorText && h("div", {
      "on": {
        "click": this.clickErrorText
      },
      "class": bem('error-text')
    }, [this.errorText]), this.direction === 'up' ? this.slots() : Placeholder]);
  }
});

exports.default = _default;