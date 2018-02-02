<template>
    <div class="page-demo">
    <!-- 表单  -->
    <section class="search-form">
    <el-form ref="form" :model="form">
      <div class="search-form-one">
            <span class="search-form-label">关键字搜索: </span>
            <el-input v-model="form.keyword" placeholder="请输入关键字" size="large" style="width:332px;"></el-input>
            <el-radio-group v-model="form.resource">
                <el-radio label="申请日期"></el-radio>
                <el-radio label="办结时间"></el-radio>
            </el-radio-group>

            <el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width:194px;"></el-date-picker>
              <span>至</span>
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endDate"  style="width: 194px;"></el-date-picker>
            <el-button type="primary" style="float:right;">搜索</el-button>
      </div>

      <div class="search-form-one">
          <span  class="search-form-label">抽查情况1:</span>
           <el-select v-model="form.region0" placeholder="全部类型">
              <el-option label="抽查情况1" value="type1"></el-option>
              <el-option label="抽查情况2" value="type2"></el-option>
          </el-select>

            <span  class="search-form-label">抽查情况2:</span> <el-select v-model="form.region1" placeholder="全部类型">
              <el-option label="抽查情况1" value="type1"></el-option>
              <el-option label="抽查情况2" value="type2"></el-option>
          </el-select>
            <span  class="search-form-label">抽查情况3:</span> <el-select v-model="form.region2" placeholder="全部类型">
              <el-option label="抽查情况1" value="type1"></el-option>
              <el-option label="抽查情况2" value="type2"></el-option>
          </el-select>
      </div>
    </el-form>
    </section>
    <!-- 表格 -->
    <section class="search-table">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="95">
        <template slot-scope="scope">
          {{scope.row.ROW_ID}}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="left">
        <template slot-scope="scope">
          {{scope.row.AFFAIR_NAME}}
        </template>
      </el-table-column>
      <el-table-column label="类型" align="left">
        <template slot-scope="scope">
          <span>{{scope.row.AFFAIR_TYPE}}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" align="left" width="400px" class="page-demo__search-table--row-detail">
        <template slot-scope="scope">
          <span>{{scope.row.AFFAIR_DETAILS}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建用户" align="center">
        <template slot-scope="scope">
          {{scope.row.CREATE_USER}}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{scope.row.CREATE_TIME}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          {{scope.row.UPDATE_TIME}}
        </template>
      </el-table-column>
    
      <el-table-column align="center" v-show="isShowOpt" label="操作" width="200" v-if="false">
        <template slot-scope="scope">
          <el-button v-show = "isAllowAdd" size="mini">添加</el-button>
          <el-button v-show = "isAllowModify" size="mini">修改</el-button>
          <el-button v-show = "isAllowRemove" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

      <!-- 分页器 -->
      <div class="search-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryPrams.pageIndex"
            :page-sizes="[10]"
            :page-size="queryPrams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
    </section>

    </div>
</template>

<script>
  import { getTrail,  getUserPermission} from '../api';

  export default {
    data() {
      return {
        form: {
          name: '盈峰环境',
          region: '',
          startDate: '',
          endDate: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          region0:'',
          region1:'',
          region2:'',
          region3:'',
        },
        list: null,
        listLoading: true,
        //总条数
        total: 0,

        // 权限控制
        isAllowAdd: false,
        isAllowModify: false,
        isAllowRemove: false,

        queryPrams: {
          pageIndex: 1,
          pageSize: 10,
        }
       
      }
    },
    created() {
      // this.fetchPermission();
      this.fetchData();
    },
    computed:{
      'isShowOpt':function(){
        return this.isAllowAdd || this.isAllowModify|| this.isAllowRemove;
      }
    },
    methods: {
       fetchData() {
        this.listLoading = true;
        getTrail(this.queryPrams)
        .then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.totalCount;
          
        })
        // this.$http.get('xxx',parr).then()
      },
      fetchPermission(){
        // let menuId = '11E78EDDC2348D80B6D4A5F66CC49B29';
        let me = this;
        // getUserPermission({menuId}).then(response=>{
        //   let {data, code, msg} = response.data;
        //   if(code===0){
        //     console.log(data);
        //     me.isAllowRemove = data.filter(x=>x.permission==='pollution:delete').length >= 1 ;
        //     me.isAllowAdd = data.filter(x=>x.permission==='pollution:add').length >= 1 ;
        //     me.isAllowModify = data.filter(x=>x.permission==='pollution:edit').length >= 1 ;
        //   }else{
        //     console.error("获取权限请求错误");
        //   }
        // });
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryPrams.pageSize = val;
        this.fetchData();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.queryPrams.pageIndex = val;
        this.fetchData();
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
.page-demo{
  padding:16px 20px;
  .search-form{
    padding: 20px 20px;
    width: 100%;
    border-radius: 4px;
    background-color: #ffffff;
    box-shadow: 0 0 4px 0 #b0c5df;
    .search-form-one{
      margin-bottom:20px;
      .search-form-label{
        font-size: 14px;
        height: 14px;
        color:#333;
        display: inline-block;
        padding-right: 10px;
      }
    }

  }

  .search-table{
    margin-top: 20px;
    margin-bottom:42px;
    overflow: hidden;
    .search-pagination{
      text-align: center;
      margin-top:43px;
    }
    &--row-detail{
      overflow: hidden;
      text-overflow: eclipse;
    }
  }


}

    
</style>
