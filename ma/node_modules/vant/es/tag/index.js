import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { inherit } from '../utils/functional';
import { RED, BLUE, GREEN, GRAY_DARK } from '../utils/color'; // Types

var _use = use('tag'),
    sfc = _use[0],
    bem = _use[1];

var COLOR_MAP = {
  danger: RED,
  primary: BLUE,
  success: GREEN
};

function Tag(h, props, slots, ctx) {
  var _style;

  var type = props.type,
      mark = props.mark,
      plain = props.plain,
      round = props.round,
      size = props.size;
  var color = props.color || type && COLOR_MAP[type] || GRAY_DARK;
  var key = plain ? 'color' : 'backgroundColor';
  var style = (_style = {}, _style[key] = color, _style);

  if (props.textColor) {
    style.color = props.textColor;
  }

  var classes = {
    mark: mark,
    plain: plain,
    round: round
  };

  if (size) {
    classes[size] = size;
  }

  return h("span", _mergeJSXProps([{
    "style": style,
    "class": [bem(classes), {
      'van-hairline--surround': plain
    }]
  }, inherit(ctx, true)]), [slots.default && slots.default()]);
}

Tag.props = {
  size: String,
  type: String,
  mark: Boolean,
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String
};
export default sfc(Tag);