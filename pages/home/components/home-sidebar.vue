<template>
    <div class="home-aside">
        <img src="../assets/img/buddha.png" class="head_portrait"> 
        <div class="personal_info">
            <p class="name">{{ user.nickName }}</p>
            <p class="position">{{ user.position }}</p>
        </div>
        <div class="detail_info">
            <ul>
                <li>
                    <span class="grey"><i class="el-icon-info"></i>员工号</span>
                    <span class="fright">{{ user.jobNum }}</span>
                </li>
                <li>
                    <span class="grey"><i class="el-icon-menu"></i>部门</span>
                    <span class="fright">{{ user.organizeName}}</span>
                </li>
                <li>
                    <span class="grey"><i class="el-icon-message"></i>邮箱</span>
                    <span class="fright">{{ user.email }}<i class="el-icon-arrow-right"></i></span>
                </li>
                <li>
                    <span class="grey"><i class="el-icon-phone"></i>电话</span>
                    <span class="fright">{{ user.mobile }}<i class="el-icon-arrow-right"></i></span>
                </li>
                <li>
                    <span class="grey"><i class="el-icon-goods"></i>修改密码</span>
                    <span class="fright"><i class="el-icon-arrow-right"></i></span>
                </li>
                <li>
                    <span class="grey"><i class="el-icon-more"></i>关于</span>
                    <span class="fright"><i class="el-icon-arrow-right"></i></span>
                </li>
            </ul>
        </div>     
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('user', {
            user: state => state.profile
        })
    }
}
</script>
<style lang="scss" scoped>
img.head_portrait{
    width: 89px;
    height: 89px;
    margin: 120px 96px 20px 96px;
}
.personal_info{
    text-align: center;
    p.position{
        color: #646464;
        font-size: 12px;
    }
}
.detail_info {
    border-top:1px solid #eee;
    margin-top: 50px;
    font-size: 15px;
    ul{
        padding: 0 20px;
        li{
            list-style: none;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
            span.grey{
                color: #646464;
                i{
                    margin-right: 5px;
                }
            }
            span.fright{
                float:right;
                cursor: pointer;
            }
        }
    }
}
</style>


