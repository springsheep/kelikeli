<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight =   `${document.documentElement.clientHeight}`;
    this.clientWidth =   `${document.documentElement.clientWidth}`;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
      this.clientWidth =   `${document.documentElement.clientWidth}`;
    };
    if (this._isMobile()) {
      console.log("手机端");
      this.$router.replace('/mobile');
    } else {
      console.log("pc端");
      this.$router.replace('/pc');
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    }
  },
}
</script>

<style lang="scss">
  @import "assets/css/reset";
  @import "~normalize-scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  color: #2c3e50;
}
  @charset "utf-8";
  blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, input, legend, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
  }

  * {
    -webkit-tap-highlight-color: transparent;

  }

  body, button, input, select, textarea {
    font: 14px/1.5 \5FAE\8F6F\96C5\9ED1, tahoma, arial, 'Hiragino Sans GB', \5b8b\4f53, sans-serif
  }

  body, html {
    margin: 0 auto;
    padding: 0;
    font-family: 'Microsoft YaHei', \5FAE\8F6F\96C5\9ED1, Arial, Helvetica, sans-serif;
    font-size: 12px;
    min-width: 320px;
    overflow-y: auto;
    -webkit-text-size-adjust: none;
    color: #333;
    max-width: 100%;
    background: #f8f8f8;
  }

  h1, h2, h3, h4, h5, h6, button, input, select, textarea {
    font-size: 100%
  }

  address, cite, dfn, em, var, i {
    font-style: normal
  }

  code, kbd, pre, samp {
    font-family: courier new, courier, monospace
  }

  small {
    font-size: 11px
  }

  sup {
    vertical-align: text-top;
  }

  sub {
    vertical-align: text-bottom
  }

  legend {
    color: #000
  }

  ol, ul {
    list-style: none
  }

  a {
    text-decoration: none;
    color: #333;
  }

  a:hover, a:focus {
    text-decoration: none;
  }

  fieldset, img {
    border: 0;
    vertical-align: top;
  }

  textarea {
    resize: none;
  }

  a, input, button, select, textarea {
    outline: none;
  }

  a, button {
    cursor: none;
  }

  img {
    border: 0;
    vertical-align: top;
  }

</style>
