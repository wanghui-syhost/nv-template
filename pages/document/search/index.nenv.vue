<template>
  <nv-layout>
        <div slot="top">
          <el-form :inline="true">
            <!-- 搜索框  -->
            <div class="search-form-one">
              <el-form-item label="角色名称">
                <el-input placeholder="请输入内容" v-model="keyWord" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
              </el-form-item>
              
            </div>
          </el-form>
        </div>
        <nv-layout-section :title="item.fileName" :key="item.id" v-for="item in list">
            <span v-html="item.highlight"></span>
        </nv-layout-section>
        <!-- 分页  -->
            <div class="search-pagination">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1, 2, 3, 4]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper, slot" :total="totalCount">
                <el-button>确定</el-button>
              </el-pagination>
            </div>
    </nv-layout>
</template>
<script>
import { searchAttachment } from './api'
export default {
  name: 'SearchAttachment',
  data() {
    return {
      keyWord: null,
      list: [],
      totalCount: 0,
      pageIndex: 1,
      pageSize: 1,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const self = this
      const { keyWord, list, totalCount, pageIndex, pageSize} = self;

      self.listLoading = true;

      searchAttachment(
        {
          pageIndex,
          pageSize,
          keyWord
        }
      ).then(({ data }) => {
        debugger
        self.listLoading = false;
        self.list = data.list || [];
        self.totalCount = data.totalCount;
      }).catch(err => {
        self.listLoading = false;
        console.log(err);
      })
    },
    search(){
      this.getList();
    },

      handleSizeChange(pageIndex) {
        this.pageSize = pageIndex;
        this.getList();
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.getList();
      },


  }
}
</script>
