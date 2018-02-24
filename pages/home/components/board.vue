<template>
    <home-block title="公告" height="327px;">
        <ul class="notice">
            <li>
                <p>关于2017年国庆与中秋节假期安排的具体流程事宜安排汇总<img src="../assets/img/new.png" class="newImg"></p>
                <p>
                    <span class="fleft">张腾飞</span>
                    <span class="fright">2017-9-22</span>
                </p>
            </li>
            <li>
                <p>关于2018年春节假期安排的具体流程事宜安排汇总<img src="../assets/img/new.png" class="newImg"></p>
                <p>
                    <span class="fleft">张腾飞</span>
                    <span class="fright">2018-2-02</span>
                </p>
            </li>
        </ul>
    </home-block>
</template>
<script>
import homeBlock from '../home-block'
export default {
    components: {
        homeBlock
    }
}
</script>
<style lang="scss" scoped>
ul.notice{
    float: left;
    width: 100%;
    color: #646464;
    font-size: 14px;
    padding: 0;
    margin: 0;
    li{
        list-style: none;
        float: left;
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        img.newImg{
            float: right;
        }
        span.fleft{
            float: left;
            color: #999;
        }
        span.fright{
            float:right;
            color: #999;
        }
    }
}
</style>