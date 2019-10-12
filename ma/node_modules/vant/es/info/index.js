import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use, isDef } from '../utils';
import { inherit } from '../utils/functional'; // Types

var _use = use('info'),
    sfc = _use[0],
    bem = _use[1];

function Info(h, props, slots, ctx) {
  if (!isDef(props.info) || props.info === '') {
    return;
  }

  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx, true)]), [props.info]);
}

Info.props = {
  info: [String, Number]
};
export default sfc(Info);