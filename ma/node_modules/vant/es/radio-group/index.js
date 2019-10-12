import { use } from '../utils';
import { ParentMixin } from '../mixins/relation';

var _use = use('radio-group'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [ParentMixin('vanRadio')],
  props: {
    value: null,
    disabled: Boolean
  },
  watch: {
    value: function value(_value) {
      this.$emit('change', _value);
    }
  },
  render: function render(h) {
    return h("div", {
      "class": bem(),
      "attrs": {
        "role": "radiogroup"
      }
    }, [this.slots()]);
  }
});