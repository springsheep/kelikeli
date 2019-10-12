import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { use } from '../utils';
import { RED } from '../utils/color';
import { emit, inherit } from '../utils/functional';
import Icon from '../icon';
import Cell from '../cell';
import Button from '../button';
import Radio from '../radio';
import RadioGroup from '../radio-group'; // Types

var _use = use('contact-list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

function ContactList(h, props, slots, ctx) {
  var List = props.list.map(function (item, index) {
    var onClick = function onClick() {
      emit(ctx, 'input', item.id);
      emit(ctx, 'select', item, index);
    };

    return h(Cell, {
      "key": item.id,
      "attrs": {
        "isLink": true,
        "valueClass": bem('item-value')
      },
      "class": bem('item'),
      "scopedSlots": {
        default: function _default() {
          return h(Radio, {
            "attrs": {
              "name": item.id,
              "iconSize": 16,
              "checkedColor": RED
            },
            "on": {
              "click": onClick
            }
          }, [h("div", {
            "class": bem('name')
          }, [item.name + "\uFF0C" + item.tel])]);
        },
        'right-icon': function rightIcon() {
          return h(Icon, {
            "attrs": {
              "name": "edit"
            },
            "class": bem('edit'),
            "on": {
              "click": function click(event) {
                event.stopPropagation();
                emit(ctx, 'edit', item, index);
              }
            }
          });
        }
      },
      "on": {
        "click": onClick
      }
    });
  });
  return h("div", _mergeJSXProps([{
    "class": bem()
  }, inherit(ctx)]), [h(RadioGroup, {
    "attrs": {
      "value": props.value
    },
    "class": bem('group')
  }, [List]), h(Button, {
    "attrs": {
      "square": true,
      "size": "large",
      "type": "danger",
      "text": props.addText || t('addText')
    },
    "class": bem('add'),
    "on": {
      "click": function click() {
        emit(ctx, 'add');
      }
    }
  })]);
}

ContactList.props = {
  value: null,
  list: Array,
  addText: String
};
export default sfc(ContactList);