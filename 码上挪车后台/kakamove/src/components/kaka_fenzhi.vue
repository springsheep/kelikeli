<template>
  <div>
    <div class="exam_structure">
      <!--<el-input-->
      <!--placeholder="输入关键字进行过滤"-->
      <!--v-model="filterText">-->
      <!--</el-input>-->
      <!--<el-button type="primary" size="mini" class="add_new_question" @click="add_new_question"><i></i>添加父节点</el-button>-->
    </div>
    <div class="question_info_lists">
      <el-tree ref="tree"
               v-loading="loading"
               :default-expand-all="true"
               :key="tree_key"
               :data="treeData"
               node-key="id"
               :render-content="renderContent"
               :expand-on-click-node="false"
               :default-expanded-keys="defaultExpand"
               show-checkbox
               :filter-node-method="filterNode">

      </el-tree>
      <el-row class="add_question" v-show="add_question_flag">
        <el-col :span="12">
          <el-input v-model="new_question_name" placeholder="请输入大题名称"></el-input>
        </el-col>
        <el-col :span="12">
          <el-button size="mini" class="btn_sure" @click.stop="add_question_sure">确定</el-button>
          <el-button size="mini" class="btn_cancel" @click.stop="add_question_cancel">取消</el-button>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  import { Loading } from 'element-ui';
  export default {
    name: "kaka_fenzhi",
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  created() {

      this.getinfo();
  },
    methods: {
      getinfo(){
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json', 'token': this.$store.state.token},
          url: 'organization/getOrganizationList',
          data: {
            loginMobilePhoneNo: this.mobilePhoneNo,
          }
        };
        this.$axios(options).then((res) => {
          if (res.data.state == 1) {
            this.treeData=res.data.data
            console.log(res.data.data)
          }
          this.loading=false;//关闭加载动画
        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
// 添加新大题
      add_new_question() {
        this.add_question_flag = true
      },
      add_question_sure(data) {   //确定
        const nodeObj = {organizationId: '', label: this.new_question_name, isEdit: false, children: [],parentOrganizationId:''}
        this.treeData.push(nodeObj)
        this.add_question_flag = false
      },
      add_question_cancel() {    //取消
        this.add_question_flag = false
        this.new_question_name = ''
      },
      //      增加
      append(ev,store, node, data,) {
        console.log(ev)
        var maxid = '20'
        //新增数据
        const nodeapp = {organizationId: null, label: '增加节点', isEdit: false, children: null,parentOrganizationId:data.organizationId}
        if(data.children==null){
          data.children=[]
        }
        data.children.unshift(nodeapp)
        if (!node.expanded) {
          node.expanded = true
        }
        const parent = node.parent
        const children =  parent.data
        // this.nodeEdit(ev, store, data)

      },
// 修改
      nodeEdit(ev, store, data) {
        data.isEdit = true
        this.$nextTick(() => {
          const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
          !$input ? '' : $input.focus()
        })
      },
      edit_sure(ev, data) {

        const $input = ev.target.parentNode.parentNode.querySelector('input') || ev.target.parentElement.parentElement.querySelector('input')
        console.log(data,1111)

        if (!$input) {

          return false

        } else {
          //将输入框的数值赋值
          data.label = $input.value
          if(data.organizationId!=null){
            console.log(1)
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'organization/saveOrganization',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                organizationName:data.label,
                parentOrganizationId:data.parentOrganizationId,
                organizationId:data.organizationId,
              }
            };
            this.$axios(options).then((res) => {
              if (res.data.state == 1) {
                this.$message(
                  {
                    message: '操作成功',
                    type: 'success'
                  }
                )
              }else {
                this.$message(
                  {
                    message: res.data.retMsg,
                    type: 'warning'
                  }
                )
              }
              data.isEdit = false
            })
          } else {
            console.log(2)
            const options = {
              method: 'POST',
              headers: {'content-type': 'application/json', 'token': this.$store.state.token},
              url: 'organization/saveOrganization',
              data: {
                loginMobilePhoneNo: this.mobilePhoneNo,
                organizationName:data.label,
                parentOrganizationId:data.parentOrganizationId,

              }
            };
            this.$axios(options).then((res) => {
              if (res.data.state == 1) {
                this.$message(
                  {
                    message: '操作成功',
                    type: 'success'
                  }
                )

              }else {
                this.$message(
                  {
                    message: res.data.retMsg,
                    type: 'warning'
                  }
                )
              }
              data.isEdit = false
            })
          }

        }

      },
// 节点删除
      nodeDelete(node, data) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          const parent = node.parent

          const children = parent.data.children || parent.data

          const index = children.findIndex(d => d.id === data.id)

          if(data.children==null){
            console.log(111)
            if(data.organizationId==null){
              children.splice(index, 1)
            }else {
              const options = {
                method: 'POST',
                headers: {'content-type': 'application/json', 'token': this.$store.state.token},
                url: 'organization/deleteOrganization',
                data: {
                  loginMobilePhoneNo: this.mobilePhoneNo,
                  organizationId:data.organizationId
                }
              };
              this.$axios(options).then((res) => {
                console.log(res)
                if (res.data.state == 1) {
                  this.$router.go(0)
                  this.$message(
                    {
                      message: '操作成功',
                      type: 'success'
                    }
                  )
                }else {
                  this.$message(
                    {
                      message: res.data.retMsg,
                      type: 'success'
                    }
                  )
                }
              })
            }

          }else{
            this.$message(
              {
                message: '您不能越级删除',
                type: 'warning'
              }
            )
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
// 节点上移
      nodeUp(node, data) {

        const parent = node.parent

        const children = parent.data.children || parent.data

        const cIndex = children.findIndex(d => d.id === data.id)


        if (parent.level === 0 && cIndex === 0) {

          return

        } else if (parent.level !== 0 && cIndex === 0) { //不同父节点中移动
          alert('不同父节点中移动')

          // const parent2 = parent.parent

          // const children2 = parent2.data.children || parent2.data

          // const pIndex2 = parseInt(children2.findIndex(p => p.id === parent.data.id), 10) - 1


          // if (pIndex2 < 0) return

          // children2[pIndex2].children.push(data)

          // children.splice(cIndex, 1)

          // this.defaultExpand[0] = children2[pIndex2].id

        } else if ((parent.level === 0 && cIndex !== 0) || (parent.level !== 0 && cIndex !== 0)) {

          const tempChildrenNodex1 = children[cIndex - 1]

          const tempChildrenNodex2 = children[cIndex]

          this.$set(children, cIndex - 1, tempChildrenNodex2)

          this.$set(children, cIndex, tempChildrenNodex1)

          this.defaultExpand[0] = data.id

        }

        this.tree_key++

      },
// 节点下移
      nodeDown(store, node, data) {

        const parent = node.parent
        const children = parent.data.children || parent.data
        const cIndex = children.findIndex(d => d.id === data.id)
        const cLength = children.length - 1 // 最边上的节点
        const allLevel = store.data.length - 1 // 树的深度


        if (parent.level === allLevel && cIndex === cLength) { // 最最末的节点

          return

        } else if (parent.level !== allLevel && cIndex === cLength) { //父节点不同
          alert('不能移动')
          // const parent2 = parent.parent

          // const children2 = parent2.data.children || parent2.data

          // const pIndex2 = parseInt((children2.findIndex(p => p.id === parent.data.id)), 10)


          // if (pIndex2 === allLevel) return

          // children2[pIndex2 + 1].children.push(data)

          // children.splice(cIndex, 1)

          // this.defaultExpand[0] = children2[pIndex2 + 1].id

        } else if ((parent.level === allLevel && cIndex !== cLength) || (parent.level !== allLevel && cIndex !== cLength)) { // 父节点相同

          const tempChildrenNodex1 = children[cIndex + 1]

          const tempChildrenNodex2 = children[cIndex]


          this.$set(children, cIndex + 1, tempChildrenNodex2)

          this.$set(children, cIndex, tempChildrenNodex1)

          this.defaultExpand[0] = data.id

        }

        this.tree_key++

      },
      showOrEdit(data) {

        if (data.isEdit) {

          return <input type="text" value={data.label} on-blur={ev => this.edit_sure(ev, data)}/>

        } else {

          return <span className="node_labe">{data.label}</span>

        }

      },
// 结构树操作group node,
      renderContent(h, {node, data, store}) {
      // <i class="el-icon-upload2" on-click={() => this.nodeUp(node, data)} style="margin-left:10px">上移</i>
      //
      //     <i class="el-icon-download" on-click={ () => this.nodeDown(store, node, data)} style="margin-left:10px">下移</i>
        return (

          <span>

          <span class="el-icon-document">

          {this.showOrEdit(data)}

          </span>

          <div class="tree_node_op" style="  float: right;margin-left:50px">

          <i class="el-icon-edit" on-click={(ev) => this.nodeEdit(ev, store, data)}>编辑</i>

        <i class="el-icon-delete" on-click={() => this.nodeDelete(node, data)} style="margin-left:10px"> 删除</i>


        <i class="el-icon-plus" on-click={() => this.append(event,store, node, data)} style="margin-left:10px"> 添加</i>

        </div>

        </span>)

      }
    }
    ,
    data() {
      return {
        mobilePhoneNo: this.$store.state.data.mobilePhoneNo,
        filterText: '',
        treeData: [
          ],
        add_question_flag: false,
        new_question_name: '',
        tree_key: 0,
        defaultExpand: [],
        loading:true
      }
    },
  }
</script>

<style scoped>
.question_info_lists{
padding-left: 20px;
  font-size: 15px;
}
  .exam_structure{
    padding: 20px;
    text-align: left;
  }
</style>
