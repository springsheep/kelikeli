import { use } from '../../utils';
import Icon from '../../icon';
import Loading from '../../loading';
import Uploader from '../../uploader';

var _use = use('sku-img-uploader'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    value: String,
    uploadImg: Function,
    maxSize: {
      type: Number,
      default: 6
    }
  },
  data: function data() {
    return {
      // 正在上传的图片 base64
      paddingImg: ''
    };
  },
  computed: {
    imgList: function imgList() {
      return this.value && !this.paddingImg ? [this.value] : [];
    }
  },
  methods: {
    afterReadFile: function afterReadFile(file) {
      var _this = this;

      // 上传文件
      this.paddingImg = file.content;
      this.uploadImg(file.file, file.content).then(function (img) {
        _this.$emit('input', img);

        _this.$nextTick(function () {
          _this.paddingImg = '';
        });
      }).catch(function () {
        _this.paddingImg = '';
      });
    },
    onOversize: function onOversize() {
      this.$toast("\u6700\u5927\u53EF\u4E0A\u4F20\u56FE\u7247\u4E3A" + this.maxSize + "MB\uFF0C\u8BF7\u5C1D\u8BD5\u538B\u7F29\u56FE\u7247\u5C3A\u5BF8");
    }
  },
  render: function render(h) {
    var _this2 = this;

    var imgList = this.imgList,
        paddingImg = this.paddingImg;
    var ImageList = (paddingImg || imgList.length > 0) && h("div", {
      "class": "van-clearfix"
    }, [imgList.map(function (img) {
      return h("div", {
        "class": bem('img')
      }, [h("img", {
        "attrs": {
          "src": img
        }
      }), h(Icon, {
        "attrs": {
          "name": "clear"
        },
        "class": bem('delete'),
        "on": {
          "click": function click() {
            _this2.$emit('input', '');
          }
        }
      })]);
    }), paddingImg && h("div", {
      "class": bem('img')
    }, [h("img", {
      "attrs": {
        "src": paddingImg
      }
    }), h(Loading, {
      "attrs": {
        "type": "spinner"
      },
      "class": bem('uploading')
    })])]);
    return h("div", {
      "class": bem()
    }, [h(Uploader, {
      "attrs": {
        "disabled": !!paddingImg,
        "afterRead": this.afterReadFile,
        "maxSize": this.maxSize * 1024 * 1024
      },
      "on": {
        "oversize": this.onOversize
      }
    }, [h("div", {
      "class": bem('header')
    }, [paddingImg ? h("div", ["\u6B63\u5728\u4E0A\u4F20..."]) : [h(Icon, {
      "attrs": {
        "name": "photograph"
      }
    }), h("span", {
      "class": "label"
    }, [this.value ? '重拍' : '拍照', " \u6216 "]), h(Icon, {
      "attrs": {
        "name": "photo"
      }
    }), h("span", {
      "class": "label"
    }, [this.value ? '重新选择照片' : '选择照片'])]])]), ImageList]);
  }
});