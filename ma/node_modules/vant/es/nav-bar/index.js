import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use, noop } from '../utils';
import { inherit } from '../utils/functional';
import Icon from '../icon'; // Types

var _use = use('nav-bar'),
    sfc = _use[0],
    bem = _use[1];

function NavBar(h, props, slots, ctx) {
  return h("div", _mergeJSXProps([{
    "class": [bem({
      fixed: props.fixed
    }), {
      'van-hairline--bottom': props.border
    }],
    "style": {
      zIndex: props.zIndex
    }
  }, inherit(ctx)]), [h("div", {
    "class": bem('left'),
    "on": {
      "click": ctx.listeners['click-left'] || noop
    }
  }, [slots.left ? slots.left() : [props.leftArrow && h(Icon, {
    "class": bem('arrow'),
    "attrs": {
      "name": "arrow-left"
    }
  }), props.leftText && h("span", {
    "class": bem('text')
  }, [props.leftText])]]), h("div", {
    "class": [bem('title'), 'van-ellipsis']
  }, [slots.title ? slots.title() : props.title]), h("div", {
    "class": bem('right'),
    "on": {
      "click": ctx.listeners['click-right'] || noop
    }
  }, [slots.right ? slots.right() : props.rightText && h("span", {
    "class": bem('text')
  }, [props.rightText])])]);
}

NavBar.props = {
  title: String,
  fixed: Boolean,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  border: {
    type: Boolean,
    default: true
  },
  zIndex: {
    type: Number,
    default: 1
  }
};
export default sfc(NavBar);