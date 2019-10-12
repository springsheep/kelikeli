import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional'; // Types

var _use = use('cell-group'),
    sfc = _use[0],
    bem = _use[1];

function CellGroup(h, props, slots, ctx) {
  var Group = h("div", _mergeJSXProps([{
    "class": [bem(), {
      'van-hairline--top-bottom': props.border
    }]
  }, inherit(ctx, true)]), [slots.default && slots.default()]);

  if (props.title) {
    return h("div", [h("div", {
      "class": bem('title')
    }, [props.title]), Group]);
  }

  return Group;
}

CellGroup.props = {
  title: String,
  border: {
    type: Boolean,
    default: true
  }
};
export default sfc(CellGroup);