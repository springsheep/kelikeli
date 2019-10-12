let mutation={
  addtoken(state, token) { // 第一个参数为 state 用于变更状态 登录
    sessionStorage.setItem("token", token);
    state.token = token;
  },
  removetoken(state, token) { // 退出登录
    sessionStorage.removeItem("token", token);
    state.token = token;
  },
  data(state, data) {
    state.data = data;
  },
  mobilePhoneNo(state, mobilePhoneNo) {
    state.mobilePhoneNo = mobilePhoneNo;
  },
}
export default mutation
