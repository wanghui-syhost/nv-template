<template>
  <div>
     
  <el-steps :active="3"  style="margin-top: 20px">
      <el-step title="查询数据库" ></el-step>
      <el-step title="页面配置" ></el-step>
      <el-step title="后台信息" ></el-step>
    </el-steps>
      
  </div>
</template>
<script>
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
            const columns = sessionStorage.getItem("generatorListParam");
            this.addForm.columns = columns;
            console.log(this.addForm);
            buildFile(this.addForm).then(response => {
                this.$message({
                  message: response.rawData.msg,
                  type: "success"
                });
                this.resetForm('addForm');
               // sessionStorage.removeItem("generatorListParam");
                //sessionStorage.removeItem("generatorListTable");
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
