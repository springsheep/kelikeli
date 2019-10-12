<template>
    <div class="container">
        <div class="header">
            <div class="flex-row">
                <div class="header-left flex-row">
                    <img src="../../assets/img/LOGO.png" alt="">
                </div>
                <div class="header-right flex-row">
                    <div :class="is_check===1?'checked':''" @click="is_check=1">首页</div>
                    <div :class="is_check===2?'checked':''" @click="is_check=2">产品展示</div>
                    <div :class="is_check===3?'checked':''" @click="is_check=3">关于我们</div>
                </div>
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
                        <img src="../../assets/img/top5.png" alt="">
                        <p>撤案引导</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top7.png" alt="">
                        <p>税票管理</p>
                    </div>
                    <div>
                        <img src="../../assets/img/top9.png" alt="">
                        <p>人伤验证</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="middle1 middle2">
            <div class="middle1-content">
                <h2>卡卡承保</h2>
                <div class="middle1-list middle1-list2">
                    <div>
                        <img src="../../assets/img/mid4.png" alt="">
                        <p>挪车助手</p>
                    </div>
                    <div>
                        <img src="../../assets/img/mid3.png" alt="">
                        <p>渠道助手</p>
                    </div>
                    <div>
                        <img src="../../assets/img/mid2.png" alt="">
                        <p>核保助手</p>
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
                        <div>汽车小额事故定损工具“卡卡定损助手”发布上线</div>
                        <div>对于私家车车主而言，发生道路事故、尤其是外观受损事故后，都会面临两个选择：出险报 案，or 协商私了。出险报案，意味着当下受到的损失可以得到赔付，
                            但未来一面甚至几年内购买的车险的保费都会因此上涨一定比例，而这些潜在损失并不容易计算清楚；另一方面，协商私了出险报案...
                        </div>
                        <div>发布时间：2019-2-27</div>
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
                        <img src="../../assets/img/HAIC.png" alt="">
                        <span>华安财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/UTIC.png" alt="">
                        <span>众诚保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/YTBX.png" alt="">
                        <span>亚太财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/ZKIC.png" alt="">
                        <span>紫金保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/BPIC.png" alt="">
                        <span>渤海财险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/ZHONGAN.png" alt="">
                        <span>众安保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/AXIC.png" alt="">
                        <span>安心保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/YDCX.png" alt="">
                        <span>英大泰和</span>
                    </div>
                    <div>
                        <img src="../../assets/img/HGIC.png" alt="">
                        <span>海峡保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/BOCI.png" alt="">
                        <span>中银保险</span>
                    </div>
                    <div>
                        <img src="../../assets/img/ASTP.png" alt="">
                        <span>安盛天平</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer1">
            <div class="footer1-content flex-row">
                <div class="footer1-left flex-row3">
                    <div>
                        <h2>关于我们</h2>
                        <p>公司简介</p>
                        <p>正在招聘</p>
                    </div>
                    <div>
                        <h2>产品展示</h2>
                        <p>卡卡定损</p>
                        <p>卡卡承保</p>
                    </div>
                    <div>
                        <h2>联系我们</h2>
                        <p>电话：0571-85165952</p>
                        <p>邮箱：kaka@kelibbb.com</p>
                        <p>地址：杭州市滨江区东方通信科技园4号楼421室</p>
                    </div>
                </div>
                <div class="footer1-right flex-row">
                    <div class="right1">
                        <p>微信扫一扫</p>
                        <p>关注公众号</p>
                    </div>
                    <div>
                        <img src="../../assets/img/WechatIMG12.png" alt="">
                    </div>
                    <div>
                        <img src="../../assets/img/WechatIMG13.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="footer2">
            杭州可里可里科技有限公司  版权所有  浙ICP备18022292号-1  浙公网安备 33010802009211号
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                is_check: 1,
            }
        },
        mounted(){

        },
    }
</script>

<style scoped lang="scss">
 @import "office";
</style>