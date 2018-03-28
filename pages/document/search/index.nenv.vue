<template>
  <nv-layout>
        <div slot="top">
          <el-form :inline="true">
            <!-- 搜索框  -->
            <div class="search-form-one">
              <el-form-item label="角色名称">
                <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              
            </div>
          </el-form>
        </div>
        <nv-layout-section :title="item.fileName" :key="item.id" v-for="item in list">
            <span v-html="item.highlight"></span>
        </nv-layout-section>
    </nv-layout>
</template>
<script>
import { searchAttachment } from './api'
export default {
  name: 'SearchAttachment',
  data() {
    return {
      keyword: null,
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const self = this
      const { keyword, list} = self;

      self.listLoading = true;

      searchAttachment(
        {
          keyword
        }
      ).then(({ data }) => {
        debugger
        self.listLoading = false;
        self.list = data || [];
      }).catch(err => {
        self.listLoading = false;
        console.log(err);
      })
    },
    search(){
      this.getList();
    }
  }
}
</script>
