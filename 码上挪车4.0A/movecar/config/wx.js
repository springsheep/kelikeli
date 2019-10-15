const wx={
  /**测试环境*/
  // appid : 'wx9c62b7f4c22526e7',
  // baseURL: 'https://test.kelibbb.com/move_car',
  // websocket:'test.kelibbb.com/move_car',//websocket
  // backurl :'https://test.kelibbb.com/static/mca/#/kaka_intomovecar',//定位回掉地址
  // movecarurl:'https://test.kelibbb.com/static/mca/#/kaka_askmove',//更多服务 立马挪车回掉地址
  // movemoduleurl:'https://test.kelibbb.com/static/mcb/#/kaka_movecarmodule',


  //实际环境
  appid : 'wx1413c0de59acf7b8',
  baseURL: 'https://api.kelibbb.com:443',
  websocket:'api.kelibbb.com:443',
  backurl :'https://kaka.kelibbb.com/mca/#/kaka_intomovecar',//定位回掉地址
  movecarurl:' https://kaka.kelibbb.com/mca/#/kaka_askmove',//更多服务 立马挪车回掉地址
  movemoduleurl:'https://kaka.kelibbb.com/mcb/#/kaka_movecarmodule',


  //本地
  // baseURL:'http://192.168.123.124:6080',
  // websocket:'192.168.123.124:6080',
  // backurl :'http://127.0.0.1:8080/#/kaka_intomovecar',


  /**snsapi_base静默授权*/
  scope_baseinfo : 'snsapi_base',
  /**snsapi_userinfo用户授权*/
  scope_userinfo : 'snsapi_userinfo',


}
export default wx;
