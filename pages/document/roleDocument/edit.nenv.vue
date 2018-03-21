<template>
  <div>
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px" slot="top">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="角色ID" :rules="[{ required: true, message: '角色ID不能为空', trigger: 'blur'}]" >
              <el-input v-model="addForm.ROLE_ID" placeholder="请输入角色ID">角色ID</el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件夹ID" :rules="[{ required: true, message: '文件夹ID不能为空', trigger: 'blur'}]" >
              <el-input v-model="addForm.DOCUMENT_ID" placeholder="请输入文件夹ID">文件夹ID</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12">
            <el-form-item label="删除状态（NO:未删除; YES:已删除）" >
              <el-input v-model="addForm.IS_DELETED" placeholder="请输入删除状态（NO:未删除; YES:已删除）">删除状态（NO:未删除; YES:已删除）</el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-row type="flex" class="row-bg"  justify="center">
            <el-col :span="12">
              <el-button @click="close">取消</el-button>
              <el-button type="primary" @click="saveOrEdit();">保存</el-button>
            </el-col>
        </el-row>
      </el-form>

  </div>
</template>
<script>
import { getRoleDocument, saveRoleDocument,updateRoleDocument } from './api'
export default {
  name: 'RoleDocumentEdit',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      addForm: {
        ID: null,
        ROLE_ID: null, // 角色ID
        DOCUMENT_ID: null, // 文件夹ID
        IS_DELETED: null, // 删除状态（NO:未删除; YES:已删除）
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
      close() {
        this.$emit('close')
      },
      getData() {
        const self = this;
        const { ID } = this;

        if (ID) {
          getRoleDocument({ID})
          .then(({data}) => {
            const { addForm } = self;
            addForm.ID = ID;
            addForm.ROLE_ID = data.ROLE_ID;
                addForm.DOCUMENT_ID = data.DOCUMENT_ID;
                addForm.IS_DELETED = data.IS_DELETED;
          }).catch(err => {
            console.log(err);
          })
        }
      },
      saveOrEdit(){
         const self = this;
         const { ID, addForm } = self;
         self.$refs.addForm.validate((valid) => {
           if (valid) {
             Promise.resolve()
             .then(() => {
               if (ID) {
                 return updateRoleDocument(addForm)
               } else {
                 return saveRoleDocument(addForm)
               }
             })
             .then(() => {
               self.$message({
                 message: ID ? '更新成功' : '保存成功',
                 type: 'success'
               })
               self.$refs.addForm.resetFields();
               self.$emit('close')
             })
             .catch(() => {
               self.$message({
                 message: ID ? '更新失败' : '保存失败',
                 type: 'error'
               })
             })
           } else {
             return false
           }
         });
      },

      
    },
    watch: {
      ID (val) {
        if (val) {
          this.getData();
        }
      }
    }
}
</script>
