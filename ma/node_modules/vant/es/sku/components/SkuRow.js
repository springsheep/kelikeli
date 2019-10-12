import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../../utils';
import { inherit } from '../../utils/functional'; // Types

var _use = use('sku-row'),
    sfc = _use[0],
    bem = _use[1];

function SkuRow(h, props, slots, ctx) {
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [h("div", {
    "class": bem('title')
  }, [props.skuRow.k, "\uFF1A"]), slots.default && slots.default()]);
}

SkuRow.props = {
  skuRow: Object
};
export default sfc(SkuRow);