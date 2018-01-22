<template>
    <div id="home" class="home">
        <div class="home-main">
            <el-row type="flex" justify="center" class="home-task-list-wrapper1" :gutter="20">
                <el-col :span="6">
                    <div class="home-main-item home-main-tips">
                        <div class="home-main-tips-top">
                            <div class="home-main-tips-top-title">{{homeTips.title}}</div>
                            <div class="home-main-tips-top-content">{{homeTips.content}}</div>
                        </div>
                        <div class="home-main-tips-down" type="flex" justify="center">
                            <el-row>
                                <el-col :span="12">
                                    <div class="home-main-tips-down-cnt">{{todayTodoCnt}}</div>
                                    <div class="home-main-tips-down-desc">{{homeTips.todayDoDesc}} </div>
                                </el-col>
                                <el-col :span="12">
                                    
                                    <div class="home-main-tips-down-cnt">{{todayDoCnt}}</div>
                                    <div class="home-main-tips-down-desc">{{homeTips.todayTodoDesc}}</div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="home-main-item home-main-quick-entry">
                        <div class="home-main-quick-entry-header">
                            快捷入口
                        </div>
                        <div class="home-main-quick-entry-content">
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <i class = "png-icon new-task" />
                                        <!-- <img src="../assets/img/ic_new_task.png"> -->
                                        <div class="home-main-quick-item-content">发起任务</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <i class = "png-icon done-task" />
                                        <!-- <img src="../assets/img/ic_done_task.png"> -->
                                        <div class="home-main-quick-item-content">已办任务</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <i class = "png-icon fav-task" />
                                        <!-- <img src="../assets/img/ic_fav_task.png"> -->
                                        <div class="home-main-quick-item-content">收藏</div>
                                    </div>
                                </el-col>
                            </el-row>

                            <!-- 第二行  -->
                            <el-row type="flex" class="row-bg" justify="space-around">
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <i class="png-icon new-task" />
                                        <!-- <img src="../assets/img/ic_new_task.png"> -->
                                        <div class="home-main-quick-item-content">发起任务</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <i class = "png-icon done-task" />
                                        <!-- <img src="../assets/img/ic_done_task.png"> -->
                                        <div class="home-main-quick-item-content">已办任务</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="home-main-quick-item">
                                        <!-- <img src="../assets/img/ic_fav_task.png"> -->
                                        <div class="home-main-quick-item-content">收藏</div>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>

                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="home-main-item home-main-calender">
                        <div class="home-main-quick-entry-header">
                            日程计划
                        </div>
                        <!-- <e-calendar2 v-model="date1"></e-calendar2> -->
                        <nv-calendar :range="calendar2.range" :lunar="calendar2.lunar" :value="calendar2.value" :begin="calendar2.begin" :end="calendar2.end" @select="calendar2.select"></nv-calendar>
                    </div>
                </el-col>
            </el-row>

            <section class="home-gap-20">
                <el-row type="flex" justify="center" class="home-task-list-wrapper" :gutter="20">
                    <el-col :span="9">
                        <div class="home-task-list-wrapper-header">
                            <span>待办信息</span>
                            <span class="home-task-list-wrapper-header-right" @click="gotoSeeMore(0)">
                                查看更多
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </div>
                        <div class="text item home-task-col">
                            <div v-for="one in homeGtask" :key="one.ID" class="home-task-list-item">
                                <div>
                                    <span class="title">{{one.INFO_NAME}}</span>
                                    <span class="right right-button" :class="[computedClass(one.END_TIME)]">{{one.END_TIME | timeTextFilter}}</span>
                                </div>
                                <div class="type">{{one.INFO_TYPE}}
                                    <span class="right right-text">收文日期:{{one.END_TIME | DateTimeFilter(0)}}</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination   v-show="false" :current-page="pageParams.pageIndex" :page-size="pageParams.pageSize" layout="prev, pager, next" @current-change="changeData" :total="homeGtaskTotal">
                        </el-pagination>
                    </el-col>
                    <el-col :span="9" class="">
                        <div class="home-task-list-wrapper-header">
                            <span>网上办事初审</span>
                            <span class="home-task-list-wrapper-header-right" v-if="false">查看更多
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </div>
                        <div class="text item home-task-col">
                            <div v-for="one in homeGtask1" :key="one.ID" class="home-task-list-item">
                                <div>
                                    <span class="title">{{one.AFFAIR_NAME}}</span>
                                    <span class="right right-button"></span>
                                </div>
                                <div class="type">{{one.AFFAIR_TYPE}}
                                    <span class="right right-text">申请时间:{{one.UPDATE_TIME | DateTimeFilter(3)}}</span>
                                </div>
                            </div>
                        </div>
                        <el-pagination v-show="false" :current-page="pageParams1.pageIndex" :page-size="pageParams1.pageSize" @current-change="changeData1" layout="prev, pager, next" :total="homeGtask1Total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </section>
        </div>
    </div>
</template>

<script>

import { getInfo, getTrail, getHomeInfoCnt } from './api';

export default {
    name: 'home',
    components: {
        // EHomeNav
    },
    data() {
        return {
            value1: '',
            date1: '2017-08-22',
            calendar2: {
                range: false,
                value: [2017, 8, 24], //默认日期
                lunar: false, //显示农历
                begin: [2017, 2, 16], //可选开始日期
                end: [2022, 2, 16], //可选结束日期
                select(begin, end) {
                    // console.log(begin.toString(),end.toString());
                }
            },
            homeGtaskTotal: 0,
            homeGtask1Total: 0,
            pageParams: {
                pageIndex: 1,
                pageSize: 10
            },
            pageParams1: {
                pageIndex: 1,
                pageSize: 10
            },
            homeTips: {
                title: '盈峰环境',
                content: '早上好! 一日之计在于晨',
                todayDoDesc: '今日待办',
                todayTodoDesc: '今日已办'
            },
            todayTodoCnt:0,
            todayDoCnt:0,
            homeGtask: [],
            homeGtask1: [],
        }
    },
    mounted() {
        //this.$store.dispatch('modifyTopMenuName', '首页');
        // this.$store.dispatch('GetUserInfo');
        this.requestData();
    },
    computed:{
        

    },
    filters:{
        'timeTextFilter':function(time){
            // console.log(new Date().getTime() - new Date(time).getTime());
            if(time && time!="" && time.indexOf("-") > -1 ){
                time = time.replace(/-/g,"/");
            }


            let dayGap = (new Date(time).getTime() -new Date().getTime() ) / (24*60*60*1000);
            dayGap = Math.ceil(dayGap);
            let result = '';
            if(dayGap > 3){
                result = `剩余${dayGap}天`;
            }else if(dayGap>=0 && dayGap<=3){
                result = `仅剩${dayGap}天`
            }else {
                let expiresDays = Math.abs(dayGap);
                result = `超时${expiresDays}天`
            }
            // console.log(`${time} :: ${dayGap}:: ${result}`);
            return result;
        }
    },
    methods: {
        computedClass(time){
            // console.log(new Date().getTime() - new Date(time).getTime());
            if(time && time!="" && time.indexOf("-") > -1 ){
                time = time.replace(/-/g,"/");
            }

            let dayGap = (new Date(time).getTime() - new Date().getTime()) / (24*60*60*1000);
            dayGap =Math.ceil(dayGap);
            let result = 'green';
            if(dayGap > 3){
                result = 'green';
            }else if(dayGap >=0 && dayGap<=3){
                result = 'orange';
            }else {
                result = 'red'
            }
            // console.log(`${time} :: ${dayGap}:: ${result}`);
            return result;
        },
        onChooseNav(item) {
            debugger;
            // this.currentChooseName = item.menuName;
            this.$store.dispatch('modifyTopMenuName', item.menuName);
            if(item.linkType == 1){
               router.push(item.linkUrl);
            }else{
                window.location= item.linkUrl;
            }
        },
        gotoSeeMore(type){
            router.push('/project/detail-demo?type=' + type);
        },
        requestData() {
            const self = this;
            getHomeInfoCnt()
            .then(response=>{
                console.log(response);
                let {TODO_NUM, DONE_NUM} = response.data;
                self.todayTodoCnt = TODO_NUM;
                self.todayDoCnt = DONE_NUM;
            }).catch(() => {
                
            });
            self.changeData(1);
            self.changeData1(1);
        },
        handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList();
        },
        changeData1(pageIndex) {
            let me = this;
            me.pageParams1.pageIndex = pageIndex;
            getTrail(me.pageParams1)
            .then(response => {
                let  data = response.data;
                me.homeGtask1 = data.list;
                me.homeGtask1Total = data.totalCount;
            })
            .catch(() => {

            });
        },
        changeData(pageIndex) {
            const self = this;
            self.pageParams.pageIndex = pageIndex;
            self.pageParams.orderBy = 'end_time';
            self.pageParams.STATUS = 'TODO';
            getInfo(self.pageParams)
            .then(response => {
                let data = response.data;
                self.homeGtask = data.list;
                self.homeGtaskTotal = data.totalCount;
            })
            .catch(() => {

            });
       
        }
    }
}
</script>
<style scoped>
.home .home-nav {
    width: 100%;
    height: 72px;
    background-color: #ffffff;
    box-shadow: 0 4px 2px 0 #dae5f3;
    padding: 10px 20px;
}

.home-nav .home-nav-item {
    display: inline-block;
    width: 180px;
    height: 52px;
    border-radius: 4px;
    border: solid 1px #c0d9ff;
    margin-right: 20px;
    padding: 15px 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}

.home-nav-item .home-nav-item-img {
    height: 20px;
    width: 20px;
    display: inline-block;
}


/* 项目nav 图标*/

.home-nav-home {
   /* background-image: url('../assets/img/ic_home_nav_home.png');*/
}
    
.home-nav-item.active {
    color: #fff;
    background-color: #3b8cff;
}



.home-nav-item.active .home-nav-item-name {
    color: #fff;
}


/* .home-nav-home.active {
    background-image: url('../assets/img/ic_home_nav_home_on.png');
}

.home-nav-project-approval {
    background-image: url('../assets/img/ic_home_nav_project_approval.png');
}

.home-nav-project-approval.active {
    background-image: url('../assets/img/ic_home_nav_project_approval_on.png');
}

.home-nav-supervise-enforcement {
    background-image: url('../assets/img/ic_home_nav_supervise_enforcement.png');
}

.home-nav-supervise-enforcement.active {
    background-image: url('../assets/img/ic_home_nav_supervise_enforcement_on.png');
}

.home-nav-pollution-permits {
    background-image: url('../assets/img/ic_home_nav_pollution_permits.png');
}

.home-nav-pollution-permits.active {
    background-image: url('../assets/img/ic_home_nav_pollution_permits_on.png');
}



.home-nav-administrative-penalties {
    background-image: url('../assets/img/ic_home_nav_supervise_enforcement.png');
}

.home-nav-administrative-penalties.active {
    background-image: url('../assets/img/ic_home_nav_supervise_enforcement_on.png');
}

.home-nav-solid-waste-management {
    background-image: url('../assets/img/ic_home_nav_solid_waste_management.png');
}

.home-nav-solid-waste-management.active {
    background-image: url('../assets/img/ic_home_nav_solid_waste_management_on.png');
}


.home-nav-environmental-emergency {
    background-image: url('../assets/img/ic_home_nav_environmental_emergency.png');
}

.home-nav-environmental-emergency.active {
    background-image: url('../assets/img/ic_home_nav_environmental_emergency_on.png');
}

.home-nav-online-monitoring {
    background-image: url('../assets/img/ic_home_nav_online_monitoring.png');
}


/* TODO */

/* .home-nav-online-monitoring {
    background-image: url('../assets/img/ic_home_nav_online_monitoring.png');
} */ */




.home .home-img-item {
    margin-right: 22px;
}

.home-nav .home-nav-first {
    display: inline-block;
    width: 52px;
    height: 52px;
    /* background-image: url('../assets/img/ic_home_left.png') */
}

.home-nav .home-nav-last {
    display: inline-block;
    width: 52px;
    height: 52px;
    /* background-image: url('../assets/img/ic_home_right.png') */
}


.home .home-nav-item-name {
    height: 22px;
    font-size: 16px;
    letter-spacing: -0.2px;
    color: #3b8cff;
    display: inline-block;
    vertical-align: top;
}




/*  主要相关信息*/

.home {
    width: 100%;
    height: 100%;
    background-color: #e8ecf0;
    overflow: hidden;
}

.home .home-main {
    text-align: center;
    padding-top: 30px;
}

.home .home-main-item {
    max-width: 486px;
    height: 334px;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);
}

.home-main-tips-top {
    height: 167px;
    width: 100%;
    text-align: left;
    background-color: #3b8cff;
    border-radius: 4px;
    color: #fff;
    padding-top: 44px;
    padding-left: 35px;
}

.home-main-tips-top-title {
    height: 32px;
    font-size: 32px;
    letter-spacing: -0.3px;
}

.home-main-tips-top-content {
    font-size: 24px;
    height: 24px;
    margin-top: 33px;
    letter-spacing: -0.3px;
}



.home-main-tips-down {
    padding-bottom: 43px;
    padding-top: 42px;
    background: #fff;
}

.home-main-tips-down-cnt {
    height: 42px;
    font-size: 42px;
    line-height: 1;
    letter-spacing: -0.2px;
    color: #f7b55e;
}

.home-main-tips-down-desc {
    margin-top: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 1;
    letter-spacing: -0.2px;
    color: #333333;
}

.home-gap-20 {
    width: 100%;
    margin-top: 20px;
}


.home-main-quick-entry-header {
    height: 48px;
    border-bottom: 1px solid #c4dbfe;
    font-size: 16px;
    padding: 16px 20px;
    text-align: left;
    color: #505b73;
}


/**/

.home-main-quick-entry-header {
    height: 48px;
    border-bottom: 1px solid #c4dbfe;
    font-size: 16px;
    padding: 16px 20px;
    text-align: left;
    color: #505b73;
}

.home-main-quick-item {
    margin-top: 44px;
    color: #666;
}

.home-main-quick-item-content {
    margin-top: 10px;
}


/* 首页列表的样式*/

.home-gap-20 {
    width: 100%;
    margin-top: 20px;
}

.home-task-list-wrapper {
    border-radius: 4px;
    margin-bottom: 20px;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
}
.home-task-col{
    max-height: 430px;
    overflow-x: hidden;
    overflow-y: auto;
}


.home-task-col::-webkit-scrollbar {
  width: 4px;
  background-color: #fff;
}
.home-task-col::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #e0e0e0;
}
.home-task-col::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #fff;
}

.home-task-list-wrapper-header {
    height: 48px;
    padding: 16px 20px;
    text-align: left;
    border-bottom: #c4dbfe;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #f7faff;
}

.home-task-list-wrapper-header-right {
    float: right;
    font-size: 16px;
    line-height: 1;
    letter-spacing: -0.2px;
    text-align: left;
    color: #4090ff;
}



.home-task-list-item {
    height: 80px;
    background-color: #fff;
    border-bottom: 1px solid #d8d8d8;
    padding: 20px;
    text-align: left;
}

.home-task-list-item .title {
    height: 16px;
    color: #333333;
    margin-bottom: 10px;
    display: inline-block;
}

.home-task-list-item .type {
    height: 14px;
    color: #999;
}


.home-task-list-item .right {
    float: right;
    text-align: right;
}

.right-button {
    display: inline-block;
    border-radius: 4px;
    color: #fff;
    background:  #39ba4e;
    border-radius: 2px;
    padding-left: 3px;
    padding-right: 3px;
}

.right-button.red{
    background-color:  #f4433e;
}
.right-button.orange{
    background-color: #ff8447;
}
.right-button.green{
    background:  #39ba4e;
}

.right .right-text{
    float: right;
    text-align: right;
}

.home-task-list-item .danger {
    background-color: #f4433e;
}

.home-task-list-item .warning {
    background-color: #39ba4e;
}

.home-task-list-item .info {
    border-radius: 2px;
    background-color: #39ba4e;
}

</style>


