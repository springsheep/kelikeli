/**
 * Listen to click outside event
 */
import { on, off } from '../utils/dom/event';
export var ClickOutsideMixin = function ClickOutsideMixin(config) {
  return {
    mounted: function mounted() {
      var _this = this;

      this.clickOutsideHandler = function (event) {
        if (!_this.$el.contains(event.target)) {
          _this[config.method]();
        }
      };

      on(document, config.event, this.clickOutsideHandler);
    },
    beforeDestroy: function beforeDestroy() {
      off(document, config.event, this.clickOutsideHandler);
    }
  };
};