import axios from "axios";
import { Loading } from 'element-ui';

const postHttp=function postHttp (option,type) {

  return new Promise((resolve, reject) => {
    axios(option)
      .then(response => {
        if (response.data.state == 1) {
          resolve(response.data)
          // this.$message({
          //   message: `${type}成功`,
          //   type: 'success'
          // });
        } else {
          this.$message({
            message: response.data.retMsg,
            type: 'warning'
          });
        }
      }, (err) => {
        reject(err)
        // Indicator.close()
      })
  })
}
export default postHttp;
