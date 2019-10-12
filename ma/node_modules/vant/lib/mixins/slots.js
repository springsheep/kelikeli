"use strict";

exports.__esModule = true;
exports.SlotsMixin = void 0;

/**
 * Use scopedSlots in Vue 2.6+
 * downgrade to slots in lower version
 */
var SlotsMixin = {
  methods: {
    slots: function slots(name, props) {
      if (name === void 0) {
        name = 'default';
      }

      var $slots = this.$slots,
          $scopedSlots = this.$scopedSlots;

      if ($scopedSlots[name]) {
        return $scopedSlots[name](props);
      }

      return $slots[name];
    }
  }
};
exports.SlotsMixin = SlotsMixin;