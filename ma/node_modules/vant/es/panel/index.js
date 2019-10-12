import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import Cell from '../cell';
import CellGroup from '../cell-group';
import { inherit } from '../utils/functional'; // Types

var _use = use('panel'),
    sfc = _use[0],
    bem = _use[1];

function Panel(h, props, slots, ctx) {
  var Content = function Content() {
    return [slots.header ? slots.header() : h(Cell, {
      "attrs": {
        "icon": props.icon,
        "label": props.desc,
        "title": props.title,
        "value": props.status,
        "valueClass": bem('header-value')
      },
      "class": bem('header')
    }), h("div", {
      "class": bem('content')
    }, [slots.default && slots.default()]), slots.footer && h("div", {
      "class": [bem('footer'), 'van-hairline--top']
    }, [slots.footer()])];
  };

  return h(CellGroup, _mergeJSXProps([{
    "class": bem(),
    "scopedSlots": {
      default: Content
    }
  }, inherit(ctx, true)]));
}

Panel.props = {
  icon: String,
  desc: String,
  title: String,
  status: String
};
export default sfc(Panel);