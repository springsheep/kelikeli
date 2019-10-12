import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../../utils';
import { inherit } from '../../utils/functional';
import Button from '../../button'; // Types

var _use = use('sku-actions'),
    sfc = _use[0],
    bem = _use[1];

function SkuActions(h, props, slots, ctx) {
  var emit = function emit(name) {
    return function () {
      props.skuEventBus.$emit(name);
    };
  };

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [props.showAddCartBtn && h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "warning",
      "text": "加入购物车"
    },
    "on": {
      "click": emit('sku:addCart')
    }
  }), h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.buyText || '立即购买'
    },
    "on": {
      "click": emit('sku:buy')
    }
  })]);
}

SkuActions.props = {
  buyText: String,
  skuEventBus: Object,
  showAddCartBtn: Boolean
};
export default sfc(SkuActions);