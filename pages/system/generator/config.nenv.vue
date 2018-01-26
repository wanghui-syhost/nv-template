<template>
  <div>
     
  <el-steps :active="3"  style="margin-top: 20px">
      <el-step title="查询数据库" ></el-step>
      <el-step title="页面配置" ></el-step>
      <el-step title="后台信息" ></el-step>
    </el-steps>
      <el-form :model="addForm" ref="addForm" :rules="addRules" label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="生成包名" prop="packagename">
            <el-input v-model="addForm.packagename" placeholder="请输入包名" :maxlength="20">类别名称</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="模块名称" prop="modulename">
            <el-input v-model="addForm.modulename" placeholder="请输入模块名称" :maxlength="20">类别值</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="注释内容" prop="title">
            <el-input v-model="addForm.title" placeholder="请输入注释内容" :maxlength="50">描述信息</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="创建人" prop="author">
            <el-input v-model="addForm.author" placeholder="请输入创建人" :maxlength="50">描述信息</el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="后端路径" prop="outputdir">
            <el-input v-model.number="addForm.outputdir" placeholder="请输入后端路径" :maxlength="3">排序顺序</el-input>
          </el-form-item>
        </el-col>
      </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="12">
          <el-form-item label="前端路径" prop="frontdir">
            <el-input v-model="addForm.frontdir" placeholder="请输入前端路径" :maxlength="50">描述信息</el-input>
          </el-form-item>
        </el-col>
      </el-row>
	
      <el-row type="flex" justify="space-around">
          <el-col :span="8" :offset="4">
            <el-button size="medium" type="primary" @click="save">生成</el-button>
          </el-col>
      </el-row>
    </el-form>
 
  </div>
</template>
<script>
import axios from "axios";
import {
buildFile
} from "./api";
export default {
  name: "GeneratorListConfig",
  data() {
    return {
      addForm: {
        packagename: null, 
        modulename: null,
        frontdir: null,
        author: null,
        outputdir: null,
        title: null
      },
      addRules: {
        packagename: [{required: true, message: '包名不能为空', trigger: 'blur'}],
        modulename:[{required: true, message: '模块名不能为空', trigger: 'blur'}],
        title: [{ required: true, message: '注释信息为数字值', trigger: 'blur'}],
        outputdir: [{ required: true, message: '后端文件输出路径不能温控', trigger: 'blur'}],
        frontdir: [{ required: true, message: '前端文件输出路径不能温控', trigger: 'blur'}],
        author: [{ required: true, message: '创建人信息不能为空', trigger: 'blur'}]
      }
    };
  },
  props:{
    id:{
      type: [String, Number],
      default(){
        return ''
      }
      
    }
  },

  methods: {
    // 保存项目信息
    save() {
       this.$refs['addForm'].validate((valid) => {
          if (valid) {
            const columns = localStorage.getItem("generatorListParam");
            this.addForm.columns = columns;
            console.log(this.addForm);
            buildFile(this.addForm).then(response => {
                this.$message({
                  message: response.rawData.msg,
                  type: "success"
                });
                this.resetForm('addForm');
                sessionStorage.removeItem("generatorListParam");
                sessionStorage.removeItem("generatorListTable");
            }).catch(err => {
              this.$message({
                  message: '添加失败',
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
};
</script>
