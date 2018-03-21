<template>
  <div>
      <el-tree ref="tree" :data="list"  :props="defaultProps" node-key="ID" show-checkbox ></el-tree>
      <br/>
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
  </div>
</template>
<script>
import { getFolderTreeList, batchUpdateRoleDocument } from './api'

export default {
    name: 'FolderTree',
    props: {
      id: {
        type: String,
        required: false
      }
    },
    data() {
      return {
        list: null,
        defaultProps: {
          children: 'children',
          label: 'NAME'
        },
      };
    },

    created() {
      this.getList();
    },
    computed: {
      ID () {
        return this.$route.query.ID || this.id;
      }
    },
    watch: {
      ID (val) {
        if (val) {
          this.getList();
        }
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      getList() {
        const self = this;
        const { ID } = this;
        getFolderTreeList({"ROLE_ID": ID})
        .then(({data}) => {
          self.list = data.list || null
          if(data.list != null){
            let checkedArrayStr = "";
            data.list.forEach(item => {
              if(item.DOCUMENT_ID != undefined){
                checkedArrayStr += item.DOCUMENT_ID + ",";
              }
            });
            
            if(checkedArrayStr != ""){
              const checkedArray = checkedArrayStr.slice(0,-1).split(",");
              self.$refs.tree.setCheckedKeys(checkedArray);
            } else {
              self.$refs.tree.setCheckedKeys([]);
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },

      // 保存角色与文件夹的关联关系
      save(){
        const self = this;
        let ids = this.$refs.tree.getCheckedKeys();
        if(ids == null || ids == ""){
          this.$message.warning("请至少选择一个文件夹");
          return;
        } else {
          batchUpdateRoleDocument(
            {
              "ROLE_ID": self.ID,
              "DOCUMENT_IDS": self.$refs.tree.getCheckedKeys().join(",")
            }
          ).then(({data}) => {
            self.$message({
              message: '更新成功',
              type: 'success'
            })
          }).catch(err => {
            console.log(err);
          })
        }
      }
    },
  };
</script>