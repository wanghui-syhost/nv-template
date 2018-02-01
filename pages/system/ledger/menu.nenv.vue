<template>
  <nv-layout>
    <section class="search-form" style="padding:10px 0">
      <el-form>
        <!-- 搜索框  -->
        <div class="search-form-one">
          
          <el-button type="primary" @click="isShowAddDialog = true">新增</el-button>
        </div>
      </el-form>
    </section>
      <div style="float: left; margin-bottom: 10px; margin-left: 20px; font-size: 14px">
        <el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/system/tab' }">动态选项卡</el-breadcrumb-item>
					<el-breadcrumb-item>{{PNAME}}</el-breadcrumb-item>
				</el-breadcrumb>
      </div>

    <section class="search-table">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        
        
        <el-table-column label="菜单名称">
          <template slot-scope="scope">
            <span> {{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column label="菜单url">
          <template slot-scope="scope">
            <span> {{ scope.row.URL }}</span>
          </template>
        </el-table-column>
        <el-table-column label="父级代码">
          <template slot-scope="scope">
            <span> {{ scope.row.TAB_CODE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序序号">
          <template slot-scope="scope">
            <span> {{ scope.row.SORT }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否删除 YES:是 NO:否 ">
          <template slot-scope="scope">
             <span> {{ scope.row.IS_DELETED == 'YES' ? '是' : '否' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="modifyInfo(scope.row)">编辑</el-button>
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
    <el-dialog title="添加动态选项卡" :visible.sync="isShowAddDialog" size="small">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px">
        
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="NAME">
              <el-input v-model="addForm.NAME" placeholder="请输入菜单名称">菜单名称</el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
           <el-col :span="12">
            <el-form-item label="菜单url" prop="URL">
              <el-input v-model="addForm.URL" placeholder="请输入菜单url">菜单url</el-input>
            </el-form-item>
          </el-col>
        </el-row>
       <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="排序序号">
              <el-input v-model="addForm.SORT" placeholder="请输入排序序号">排序序号</el-input>
            </el-form-item>
          </el-col>
         
        </el-row>
        
        <el-row type="flex" justify="space-around">
            <el-col :span="8" :offset="4">
              <el-button @click="isShowAddDialog = false">取消</el-button>
              <el-button type="primary" @click="save();">保存</el-button>
            </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改动态选项卡" :visible.sync="isShowEditDialog" size="small">
      <el-form :model="modifyForm" ref="modifyForm" :rules="modifyRules"  label-width="120px">
        
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="NAME">
              <el-input v-model="modifyForm.NAME" placeholder="请输入菜单名称">菜单名称</el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
         <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="菜单url" prop="URL">
              <el-input v-model="modifyForm.URL" placeholder="请输入菜单url">菜单url</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="排序序号">
              <el-input v-model="modifyForm.SORT" placeholder="请输入排序序号">排序序号</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" justify="space-around">
          <el-col :span="8" :offset="4">
            <el-button @click="isShowEditDialog = false">取消</el-button>
            <el-button type="primary" @click="update();">保存</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </nv-layout>
</template>
<script>
import axios from 'axios';
import { getTabMenuDatas, deleteTabMenu, saveTabMenu,updateTabMenu } from './api'
export default {
  name: 'TabMenu',
  data() {
    return {
      isShowAddDialog: false,
      isShowEditDialog: false,
      list: null,
      listLoading: true,
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      CODE: '',
      PNAME:'',
      
      addForm: {
        TAB_CODE: this.CODE, // 父级代码
        //IS_DELETED: null, // 是否删除 YES:是 NO:否 
        NAME: null, // 菜单名称
        URL: null, // 菜单url
        SORT: null // 排序序号
      },
      addRules: {
        NAME: [{required: true, message: '菜单名称不能为空', trigger: 'blur'}],
        URL: [{required: true, message: '菜单url不能为空', trigger: 'blur'}]
      },
      modifyForm: {},
      modifyRules:{
        NAME: [{required: true, message: '菜单名称不能为空', trigger: 'blur'}],
        URL: [{required: true, message: '菜单url不能为空', trigger: 'blur'}]
        }
    };
  },
  mounted() {
    this.CODE = this.$route.query.CODE || '';
    this.PNAME = this.$route.query.TITLE || '';
    this.addForm.TAB_CODE = this.CODE;
    this.modifyForm.TAB_CODE = this.CODE,
    this.getList();
  },
  
  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        CODE: this.CODE,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      console.log(pageParams)
      getTabMenuDatas(pageParams)
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data == undefined){
            this.list = null;
            return;
        }
        this.list = data.map(v => v);
        this.totalCount = data.totalCount;
      }).catch(err => {
        console.log(err);
      })
    },
    removeInfo(row) {
      let me = this;
      const params = {
          ID: row.ID,
          TAB_CODE: this.CODE
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
    deleteTabMenu(params).then(response => {
      this.$message.info("删除成功");
      this.getList();
    }).catch(e => {
      this.$message.err("删除失败");
    });
  },
   // 保存
  save() {
    this.$refs['addForm'].validate((valid) => {
        if (valid) {
          console.log(this.addForm)
            saveTabMenu(this.addForm).then(response => {
               this.$message({
                 message: '保存成功',
                 type: "success"
               });
               this.resetForm('addForm');
               // 重新加载数据
               this.getList();
               // 隐藏弹出框
               this.isShowAddDialog = false;
            }).catch(err =>{
               console.log(err);
               this.$message({
                 message: '保存失败',
                 type: "error"
               });
            });
        } else {
            return false;
        }
    })
  },
  modifyInfo(row){
    let backdata = JSON.parse(JSON.stringify(row));
    this.modifyForm = backdata;
    this.isShowEditDialog = true;
  },

  update(){
    this.$refs['modifyForm'].validate((valid) => {
      if (valid) {
        const params = {
          ID: this.modifyForm.ID,
          TAB_CODE: this.modifyForm.TAB_CODE,
          NAME: this.modifyForm.NAME,
          URL: this.modifyForm.URL,
          SORT: this.modifyForm.SORT
        }
        updateTabMenu(params).then(response => {
           this.$message({
             message: response.rawData.msg,
             type: "success"
           });
           this.resetForm('modifyForm');
           // 重新加载数据
           this.getList();
           // 隐藏弹出框
           this.isShowEditDialog = false;
        }).catch(e => {
          this.$message({
            message: '修改失败',
            type: "error"
          });
        });
      } else {
        return false;
      }
  });
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
