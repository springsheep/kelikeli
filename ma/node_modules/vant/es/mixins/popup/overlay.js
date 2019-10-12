import _extends from "@babel/runtime/helpers/esm/extends";
import Overlay from '../../overlay';
import { context } from './context';
import { mount } from '../../utils/functional';
var defaultConfig = {
  className: '',
  customStyle: {}
};
var overlay; // close popup when click overlay && closeOnClickOverlay is true

function onClickOverlay() {
  if (context.top) {
    var vm = context.top.vm;
    vm.$emit('click-overlay');

    if (vm.closeOnClickOverlay) {
      if (vm.onClickOverlay) {
        vm.onClickOverlay();
      } else {
        vm.close();
      }
    }
  }
}

export function updateOverlay() {
  if (!overlay) {
    overlay = mount(Overlay, {
      on: {
        click: onClickOverlay
      }
    });
  }

  if (context.top) {
    var _context$top = context.top,
        vm = _context$top.vm,
        config = _context$top.config;
    var el = vm.$el;
    var target = el && el.parentNode ? el.parentNode : document.body;

    if (target) {
      target.appendChild(overlay.$el);
    }

    _extends(overlay, defaultConfig, config, {
      visible: true
    });
  } else {
    overlay.visible = false;
  }
}
export function openOverlay(vm, config) {
  if (!context.stack.some(function (item) {
    return item.vm === vm;
  })) {
    context.stack.push({
      vm: vm,
      config: config
    });
    updateOverlay();
  }
}
export function closeOverlay(vm) {
  var stack = context.stack;

  if (stack.length) {
    if (context.top.vm === vm) {
      stack.pop();
      updateOverlay();
    } else {
      context.stack = stack.filter(function (item) {
        return item.vm !== vm;
      });
    }
  }
}