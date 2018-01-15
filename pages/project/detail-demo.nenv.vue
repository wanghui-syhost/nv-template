<template>
  <div class="home-detail">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="left" label='序号'>
        <template slot-scope="scope">
          {{scope.row.ROW_ID}}
        </template>
      </el-table-column>
      <el-table-column label="名称"  align="center">
        <template slot-scope="scope">
          <span  v-show="!scope.row.isEdit">{{scope.row.INFO_NAME}}</span>
          <el-input v-show="scope.row.isEdit" size="small" v-model="scope.row.INFO_NAME"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="类型"  align="center">
        <template slot-scope="scope">
          {{scope.row.INFO_TYPE}}
        </template>
      </el-table-column>
      <el-table-column label="状态"  align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.STATUS}} -->
          <span v-show="!scope.row.isEdit">{{scope.row.STATUS | stateFilter}}</span>
           <el-select v-model="scope.row.STATUS" placeholder="请选择" v-show="scope.row.isEdit">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

        </template>
      </el-table-column>
      <el-table-column align="center" prop="创建时间" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.CREATE_TIME  | DateTimeFilter(0)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="截止时间" label="截止时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.END_TIME | DateTimeFilter(0)}}</span>
        </template>
      </el-table-column>

      <!-- 编辑 -->
      <el-table-column  label="操作">
        <template slot-scope="scope">
        <div class="opt-cell">
          <el-button v-show='!scope.row.isEdit' type="primary" @click='scope.row.isEdit = true' size="small" icon="edit">编辑</el-button>
          <el-button v-show='scope.row.isEdit' type="success" @click='modifyComplete(scope.row)' size="small" icon="check">完成</el-button>
          <el-button type="danger" @click='removeRow(scope.row)' size="small" icon="delete">删除</el-button>
        </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="home-detail__page">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    


    <el-dialog title="提示" :visible.sync="isShowDeleteDialog" size="tiny">
      <span>确认要删除这条记录吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getInfo, modifyInfo, deleteInfo } from './api';
  export default {
    name: 'homeDetailList',
    data() {
      return {
        type:0,
        list: null,
        listLoading: true,
        pageIndex:1,
        pageSize:10,
        totalCount: 0,
        value:'',
        options:[
          {
            value:'TODO',
            label:'待办'
          },
          {
            value:'DONE',
            label:'已办'
          }
        ],
        isShowDeleteDialog:false,
        currentDeleteRow:null,
      }
    },
    mounted(){
      console.log(this.$router.currentRoute);
      // this.type = this.$router.currentRoute.query.type;

    },
    filters:{
      stateFilter:function(value){
        let map={
          "TODO":'待办',
          "DONE":'已办'
        }
        return map[value];
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        const pagePrams = {
          pageIndex: this.pageIndex,
          pageSize : this.pageSize
        }
        getInfo(pagePrams).then(({data}) => {
          this.listLoading = false;
          this.list = data.list.map(v => {
              v.isEdit = false;
              return v
            });
          this.totalCount = data.totalCount;
        }).catch(err=>{
          console.log(err);
        })
      },
    // change select 
    changeSelect(value){
      console.log("change", value);
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.fetchData();
    },
    handleCurrentChange(pageIndex){
      this.pageIndex = pageIndex;
      this.fetchData();
    },
    modifyComplete(row){
      let me = this;
      console.log(row);
      
      let data = {
        ID: row.ID,
        INFO_NAME: row.INFO_NAME,
        STATUS : row.STATUS
      }
      modifyInfo(data).then( response=>{
        let {code, msg, data} = response.data;
        if(code==0){
          row.isEdit = false;
          me.$message({
            showClose: true,
            message: '修改成功'
          });
        }else{
          me.$message.error('修改失败');
        }
      }).catch(err=>{
        console.error(err);
      })
    },
    cancelDelete(){
      this.isShowDeleteDialog = false;
      this.currentDeleteRow = null
    },
    confirmDelete(){
      let me = this;
      me.isShowDeleteDialog = false;
      if(this.currentDeleteRow!=null){
        deleteInfo(this.currentDeleteRow.ID).then(response=>{
          console.log(response);
          let {data, code ,msg} = response.data;
          if(code==0){
             me.$message.info("删除成功");
             me.fetchData();
          }else{
            me.$message.error(msg);
          }
        }).catch(err=>{
            console.log(err);
        });
      }
    },
    removeRow(row){
      this.isShowDeleteDialog = true;
      this.currentDeleteRow = row;
    }
  
  }
}
</script>


<style lang="scss">
.home-detail{
    &__page{
      text-align: right;
      padding: 16px 0;
    }

}
</style>


