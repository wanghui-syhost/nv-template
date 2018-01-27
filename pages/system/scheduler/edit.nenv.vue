<template>
  <div>
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="任务分组" :rules="[{ required: true, message: '任务分组不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.JOB_GROUP" placeholder="请输入任务分组">任务分组</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务名称" :rules="[{ required: true, message: '任务名称不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.JOB_NAME" placeholder="请输入任务名称">任务名称</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="运行时间表达式" :rules="[{ required: true, message: '运行时间表达式不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CRON_EXPRESSION" placeholder="请输入运行时间表达式">运行时间表达式</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务描述">
              <el-input v-model="addForm.DESCRIPTION" placeholder="请输入任务描述">任务描述</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="完整的类名" :rules="[{ required: true, message: '完整的类名不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CLASS_NAME" placeholder="请输入完整的类名">完整的类名</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" justify="space-around">
            <el-col :span="8" :offset="4">
              <el-button @click="isShowAddDialog = false">取消</el-button>
              <el-button type="primary" @click="saveOrEdit();">保存</el-button>
            </el-col>
        </el-row>
      </el-form>

  </div>
</template>
<script>
import axios from 'axios';
import { getScheduler, saveScheduler,updateScheduler } from './api'
export default {
  name: 'Scheduler',
  data() {
    return {
      ID: null,
      addForm: {
        ID: null, // 主键ID
        JOB_GROUP: null, // 任务分组
        JOB_NAME: null, // 任务名称
        JOB_TRIGGER: null, // 触发器
        CRON_EXPRESSION: null, // 运行时间表达式
        DESCRIPTION: null, // 任务描述
        STATUS: null, // 任务状态
        CREATE_USER: null, // 创建人
        CREATE_TIME: null, // 创建时间
        UPDATE_USER: null, // 修改人
        UPDATE_TIME: null, // 修改时间
        CLASS_NAME: null, // 完整的类名
        APPLICATION_KEY: null // 所属系统
      },
      addRules: {}
    };
  },
  created() {
    this.ID = this.$route.query.ID || '';
    this.getData();
  },
  methods: {
      getData() {
        if (this.ID == null || this.ID == ''){
          return;
        }
        const param = {
          ID: this.ID
        }
        getScheduler(param)
        .then(response => {
          const data = response.data;
          this.addForm = data;
          this.totalCount = data.totalCount;
        }).catch(err => {
          console.log(err);
        })
      },
      reqData(params){
        deleteScheduler(params).then(response => {
          this.$message.info("删除成功");
          this.getList();
        }).catch(e => {
          this.$message.err("删除失败");
        });
      },
      saveOrEdit(){
        if (this.ID == null || this.ID == ''){
          save();
        } else {
          update();
        }
      },
       // 保存
      save() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            saveScheduler(this.addForm).then(response => {
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

      update(){
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.addForm.ID = this.ID;
            updateScheduler(this.addForm).then(response => {
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
      
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
