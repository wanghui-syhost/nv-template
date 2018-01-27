<template>
  <div>
    <section class="search-form">
      <el-form>
        <!-- 搜索框  -->
        <div class="search-form-one" style="padding: 10px 0">
          
          <el-button type="primary" @click="isShowAddDialog = true">新增</el-button>
        </div>
      </el-form>
    </section>

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" @sort-change="sortChange" border fit highlight-current-row>
        <el-table-column label="任务分组" prop = "JOB_GROUP" />
        <el-table-column label="任务名称" prop = "JOB_NAME" sortable  />
        <el-table-column label="运行时间表达式" prop = "CRON_EXPRESSION" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.STATUS | statusFilter}}
          </template>
        </el-table-column>
        <el-table-column label="任务描述" prop = "DESCRIPTION" />
        <el-table-column label="完整的类名" prop = "CLASS_NAME" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="isShowEditDialog = true">编辑</el-button>
            <el-button size="small" type="danger" @click="removeInfo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页  -->
      <div class="search-pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </section>

    <!-- 新增 -->
    <el-dialog title="添加SDF" :visible.sync="isShowAddDialog" size="small">

    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改SDF" :visible.sync="isShowEditDialog" size="small">

    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios';
import {  getSchedulerDatas, deleteScheduler, runOnceScheduler, resumeScheduler, pauseScheduler } from './api'
export default {
  name: 'SDF',
  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      orderBy: null,
      totalCount: 0,
      

    };
  },
  created() {
    this.getList();
  },
  filters: {
    statusFilter: function(value) {
      const map = {
        'OPENED': '运行中',
        'PAUSED': '已暂停'
      }
      return map[value]
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        orderBy: this.orderBy,
      }
      getSchedulerDatas(pageParams)
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data.list == undefined){
            this.list = null;
            return;
        }
        this.list = data.list.map(v => v);
        this.totalCount = data.totalCount;
      }).catch(err => {
        console.log(err);
      })
    },
    removeInfo(row) {
      let me = this;
      const params = {
          ID: row.ID
        }
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback:(action,instance)=>{
          if(action=='confirm'){
            me.reqData(params);
          }
        }
      });
  },
  reqData(params){
    deleteScheduler(params).then(response => {
      this.$message.info("删除成功");
      this.getList();
    }).catch(e => {
      this.$message.err("删除失败");
    });
  },
  sortChange(a){
      const culomn = a.prop;
      if(!culomn){
        this.orderBy = null;
        this.getList();
        return;
      }
      var order = a.order == 'descending' ? ' DESC' : ' ASC';
      this.orderBy = a.prop + order;
      this.getList()
    },

  
  handleSizeChange(pageIndex) {
    this.queryPrams.pageSize = pageIndex;
    this.getList();
  },
  handleCurrentChange(pageIndex) {
    this.pageIndex = pageIndex;
    this.getList();
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
}
}
</script>
