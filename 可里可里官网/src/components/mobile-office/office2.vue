<template>
    <div class="container">
        <div class="header">
            <div class="flex-row">
                <div class="header-left flex-row">
                    <img src="../../assets/img/LOGO.png" alt="">
                    <img src="../../assets/img/logo2.png" alt="">
                </div>
                <div class="header-right flex-row">
                    <img src="../../assets/img/daohang.png" alt="" @click="isClick=!isClick;">
                </div>
            </div>
            <div class="fixedBox" v-show="isClick" @click="showFixed">
                <div>首页</div>
                <div>产品展示</div>
                <div>关于我们</div>
            </div>
        </div>
        <div class="head_bk">
            <div class="bkBox">
                <div class="bk-left">
                    <img src="../../assets/img/carLeft.png" alt="">
                    <div>专注于提供保险服务领域的实用小型工具及创新解决方案</div>
                    <div>
                        <span>· 卡卡定损</span>
                        <span>· 卡卡承保</span>
                    </div>
                </div>
                <div class="bk-right">
                    <img src="../../assets/img/carBottom.png" alt="">
                </div>
            </div>
        </div>
        <div class="middle1">
            <div class="middle1-content">
                <h2>卡卡定损</h2>
                <div class="middle1-list">
                    <div>
                        <img src="../../assets/img/top1.png" alt="">
                        <p>自助报案</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top2.png" alt="">
                        <p>任务分发</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top3.png" alt="">
                        <p>渠道报价</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top4.png" alt="">
                        <p>欺诈风控</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top5.png" alt="">
                        <p>撤案引导</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top6.png" alt="">
                        <p>维修推介</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top7.png" alt="">
                        <p>税票管理</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top8.png" alt="">
                        <p>任务看板</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle1 middle2">
            <div class="middle1-content">
                <h2>卡卡承保</h2>
                <div class="middle1-list middle1-list2">
                    <div>
                        <img src="../../assets/img/mid1.png" alt="">
                        <p>录单助手</p>
                    </div>
                    <div>
                        <img src="../../assets/img/mid2.png" alt="">
                        <p>核保助手</p>
                    </div>
                    <div>
                        <img src="../../assets/img/mid3.png" alt="">
                        <p>渠道助手</p>
                    </div>
                    <div>
                        <img src="../../assets/img/mid4.png" alt="">
                        <p>挪车助手</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle3">
            <div class="middle3-content">
                <h2>公司动态</h2>
                <div class="middle3-list flex-row">
                    <div>
                        <img src="../../assets/img/sample.png" alt="">
                    </div>
                    <div>
                        <p>汽车小额事故定损工具“卡卡定损助手”发布上线</p>
                        <p>对于私家车车主而言，发生道路事故、尤其是外观受损事故后...</p>
                        <p>发布时间：2019-2-27</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle4">
            <div class="middle4-content">
                <h2>合作企业</h2>
                <div class="middle4-list">
                    <div>
                        <img src="../../assets/img/PICC.png" alt="">
                        <span>人保财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/PAIC.png" alt="">
                        <span>平安产险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/CPIC.png" alt="">
                        <span>太平洋产险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/CLPC.png" alt="">
                        <span>国寿财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/CICP.png" alt="">
                        <span>中华保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/CCIC.png" alt="">
                        <span>大地保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/YGBX.png" alt="">
                        <span>阳光财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/TPIC.png" alt="">
                        <span>太平财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/TAIC.png" alt="">
                        <span>天安财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/HAIC.png" alt="">
                        <span>华安财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/YAIC.png" alt="">
                        <span>永安保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/YDCX.png" alt="">
                        <span>英大泰和</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer1">
            <div class="footer1-content">
                <div class="right1">
                    微信扫一扫关注公众号
                </div>
                <div class="right2">
                    <div>
                        <img src="../../assets/img/WechatIMG12.png" alt="">
                    </div>
                    <div>
                        <img src="../../assets/img/WechatIMG13.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer3">
            <div>
                <div>关于我们</div>
                <div>产品展示</div>
                <div>联系我们</div>
            </div>
        </div>
        <div class="footer2">
            <p>杭州可里可里科技有限公司  版权所有</p>
            <p>浙ICP备18022292号-1  浙公网安备 33010802009211号</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                is_check: 1,
                isClick:false,
            }
        },
        mounted(){

        },
        methods:{
          showFixed(){
            setTimeout(()=>{
                this.isClick=false;
            },200)
          },
        },
    }
</script>

<style scoped lang="scss">
    @import "office2";
</style>