<template>
  <div>
      <section class="search-form" slot="top">
        <el-form :inline="true">
            <!-- 搜索框  -->
  			<div class="search-form-one">
          <el-form-item label="表名">
            <el-input v-model="tablename" placeholder="请输入表名"  size="middle" style="width:332px;"></el-input>
          </el-form-item>
          <el-button type="infor" @click="getList();">连接</el-button>
  			</div>
        </el-form>
      </section>

      <section class="search-table">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row >
        <el-table-column label="字段" prop = "COLUMNNAME" />
        <el-table-column label="字段类型" prop="DATATYPE" />
        <el-table-column label="字段信息" prop="COMMENTS" />
        <el-table-column label="列表展示" class="show-checked" :render-header="showCheckbox">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IS_SHOW"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="列表排序" :render-header="orderCheckbox">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IS_ORDER"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="查询" :render-header="searchCheckbox">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IS_SEARCH"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="列表显示先后">
          <template slot-scope="scope">
            <el-input v-model="scope.row.SORT" placeholder="排序号"></el-input>
          </template>
        </el-table-column>
          
        <el-table-column label="编辑页面" :render-header="editCheckbox">
            <!-- <el-table-column label="展示" type="selection" > -->
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IS_EDIT"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="编辑必填" :render-header="requiredCheckbox">
            <!-- <el-table-column label="展示" type="selection" > -->
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.IS_REQUIRED"></el-checkbox>
          </template>
        </el-table-column>

        <el-table-column label="类型">
          <template slot-scope="scope">
            <el-select v-model="scope.row.TYPE" placeholder="">
              <el-option v-for="item in options"   
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="字典编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.CODE" placeholder="字典编号"></el-input>
          </template>
        </el-table-column>

        <el-table-column label="页面字段名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.NAME" placeholder="字段名"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <el-form :model="addForm" ref="addForm" label-position="left" :rules="addRules" label-width="120px" style="padding-top:20px; ">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="生成包名" prop="packagename">
              <el-input v-model="addForm.packagename" placeholder="请输入包名" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="模块名称" prop="modulename">
              <el-input v-model="addForm.modulename" placeholder="请输入模块名称" :maxlength="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="注释内容" prop="title">
              <el-input v-model="addForm.title" placeholder="请输入注释内容" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="创建人" prop="author">
              <el-input v-model="addForm.author" placeholder="请输入创建人" :maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="后端路径" prop="outputdir">
              <el-input v-model.number="addForm.outputdir" placeholder="请输入后端路径"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12">
            <el-form-item label="前端路径" prop="frontdir">
              <el-input v-model="addForm.frontdir" placeholder="请输入前端路径" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
    
        <el-row type="flex" justify="space-around">
            <el-col :span="8" :offset="4">
              <el-button size="medium" type="primary"  :disabled="disabledNext" @click="save">生成</el-button>
            </el-col>
        </el-row>
      </el-form>
    </section>
  
  </div>
</template>
<script>
import { getTableColumns, buildFile} from "./api";
export default {
  name: "Generator",
  data() {
    return {
      isShow: true,
      disabledNext: true,
      list: null,
      listLoading: false,
      tablename: 'TEST',
      options: [{
          value: 'TEXT',
          label: '文本框'
        }, {
          value: 'CHECKBOX',
          label: '多选框'
        }, {
          value: 'SELECT',
          label: '下拉框'
        }, {
          value: 'RADIO',
          label: '单选按钮'
        }, {
          value: 'DATE',
          label: '日期'
        }],
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
  created() {
    this.disabledNext = true;
    const data = sessionStorage.getItem("generatorListParam");
    if (data){
      this.tablename = sessionStorage.getItem("generatorListTable");
      this.list = JSON.parse(data);
      if(this.list.length > 0){
        this.disabledNext = false;
      }
    }
   
  },

  methods: {
    getList() {
      if(!this.tablename){
       // return;
      }
      this.listLoading = true;
      const pageParams = {
        tablename: this.tablename
      };

      
      getTableColumns(pageParams)
        .then(response => {
          this.listLoading = false;
          const data = response.data;
          if (data.length == 0){
            this.list = null;
            return;
          }
          this.list = data.map(v => {
            v.IS_SHOW = false;
            v.IS_SEARCH = false;
            v.IS_ORDER = false;
            v.IS_EDIT = false;
            v.IS_REQUIRED = false;
            v.NAME = v.COMMENTS;
            v.TYPE = 'TEXT';
            v.SORT = null;
            return v;
          });
          this.disabledNext = false;
        })
        
        .catch(err => {
          this.listLoading = false;
          console.log(err);
        });
    },

    // 保存项目信息
    save() {
       this.$refs['addForm'].validate((valid) => {
          if (valid) {
            this.addForm.columns = JSON.stringify(this.list);
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
    },

    goNext(){
      sessionStorage.setItem("generatorListTable", this.tablename);
      sessionStorage.setItem("generatorListParam", JSON.stringify(this.list));
      this.$router.push({path:'/system/generator/config'});
    },
    allShow(value){
      this.list = this.list.map(x => {
        x.IS_SHOW = value; 
        return x;
        }
      )
    },
    showCheckbox(h, { column, $index }){
        return [h('span',  {
                  class: "e-select-bar"
                }, '列表展示 '),
                h('el-checkbox',{
                    data: {
                      value: false
                    },
                    on:{
                      change: this.allShow
                    }
                })
              ];
    },
    allEdit(value){
      this.list = this.list.map(x => {
        x.IS_EDIT = value; 
        return x;
        }
      )
    },
    editCheckbox(h, { column, $index }){
        return [h('span',  {
                  class: "e-select-bar"
                }, '编辑页面 '),
                h('el-checkbox',{
                    data: {
                      value: false
                    },
                    on:{
                      change: this.allEdit
                    }
                })
              ];
    },
    allRequired(value){
      this.list = this.list.map(x => {
        x.IS_REQUIRED = value; 
        return x;
        }
      )
    },
    requiredCheckbox(h, { column, $index }){
        return [h('span',  {
                  class: "e-select-bar"
                }, '编辑必填 '),
                h('el-checkbox',{
                    data: {
                      value: false
                    },
                    on:{
                      change: this.allRequired
                    }
                })
              ];
    },
    allSearch(value){
      this.list = this.list.map(x => {
        x.IS_SEARCH = value; 
        return x;
        }
      )
    },
    searchCheckbox(h, { column, $index }){
        return [h('span',  {
                  class: "e-select-bar"
                }, '查询条件 '),
                h('el-checkbox',{
                    data: {
                      value: false
                    },
                    on:{
                      change: this.allSearch
                    }
                })
              ];
    },
    allOrder(value){
      this.list = this.list.map(x => {
        x.IS_ORDER = value; 
        return x;
        }
      )
    },
    orderCheckbox(h, { column, $index }){
        return [h('span',  {
                  class: "e-select-bar"
                }, '支持排序 '),
                h('el-checkbox',{
                    data: {
                      value: false
                    },
                    on:{
                      change: this.allOrder
                    }
                })
              ];
    },
  }
};
</script>
