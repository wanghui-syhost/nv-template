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
            <el-form-item label="表达式" :rules="[{ required: true, message: '运行时间表达式不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CRON_EXPRESSION" placeholder="请输入运行时间表达式">运行时间表达式</el-input>
            </el-form-item>
          </el-col>
         <el-col :span="12">
            <el-form-item label="完整类名" :rules="[{ required: true, message: '完整的类名不能为空', trigger: 'blur'}]">
              <el-input v-model="addForm.CLASS_NAME" placeholder="请输入完整的类名">完整的类名</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
           <el-col :span="12">
            <el-form-item label="任务描述">
              <el-input v-model="addForm.DESCRIPTION" placeholder="请输入任务描述">任务描述</el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        
        <el-row type="flex" justify="space-around">
            <el-col :span="8" :offset="4">
              <el-button type="primary" @click="saveOrEdit();">保存</el-button>
            </el-col>
        </el-row>
      </el-form >

  </div>
</template>
<script>
import { getScheduler, saveScheduler,updateScheduler } from './api'
export default {
  name: 'SchedulerEditor',
  props: {
    id: {
      type: String,
      required: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const self = this
    return {
      addForm: {
        ID: null, // 主键ID
        JOB_GROUP: null, // 任务分组
        JOB_NAME: null, // 任务名称
        CRON_EXPRESSION: '0/50 * * * * ?', // 运行时间表达式
        DESCRIPTION: null, // 任务描述
        CLASS_NAME: 'com.infore.platform.scheduler.demo.BuyingJob', // 完整的类名
      },
      addRules: {}
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ID () {
      return this.$route.query.ID || this.id;
    }
  },
  methods: {
      getData() {
        console.log(this.ID)
        if (!this.ID){
          return;
        }
        const param = {
          ID: this.ID
        }
        getScheduler(param)
        .then(response => {
          const data = response.data;
          this.addForm.JOB_GROUP = data.JOB_GROUP;
          this.addForm.JOB_NAME = data.JOB_NAME;
          this.addForm.CRON_EXPRESSION = data.CRON_EXPRESSION;
          this.addForm.DESCRIPTION = data.DESCRIPTION;
          this.addForm.CLASS_NAME = data.CLASS_NAME;
          //this.totalCount = data.totalCount;
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
        if (!this.ID){
          this.save();
        } else {
          this.update();
        }
      },
       // 保存
      save() {
        debugger;
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            saveScheduler(this.addForm).then(response => {
               this.$message({
                 message: '保存成功',
                 type: "success"
               });
               this.resetForm('addForm');
              
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
            updateScheduler(this.addForm)
            .then(response => {
               this.$message({
                 message: response.rawData.msg,
                 type: "success"
               });
               this.resetForm('addForm');
               // 重新加载数据
               this.getList();
               // 隐藏弹出框
               this.isShowAddDialog = false;
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
    },
    watch: {
      isShow(val) {
        if (val) {
          this.$refs['addForm'].resetFields();
        }
      }
    }
}
</script>
