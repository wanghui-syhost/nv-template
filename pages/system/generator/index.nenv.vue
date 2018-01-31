<template>
  <div>
    <el-steps :active="1"  style="margin-top: 20px">
      <el-step title="查询数据库" ></el-step>
      <el-step title="页面配置" ></el-step>
      <el-step title="后台信息" ></el-step>
    </el-steps>
      <section class="search-form" style="padding: 20px;">
        <el-form>
            <!-- 搜索框  -->
  			<div class="search-form-one">
                <el-input v-model="tablename" placeholder="请输入表名"  size="middle" style="width:332px;"></el-input>
            <el-button type="infor" @click="getList();">连接</el-button>
  			</div>
        </el-form>
      </section>

    <section class="search-table">
      
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row >
           
          
            <el-table-column label="字段" prop = "COLUMNNAME" />
         
            <el-table-column label="字段类型" prop="DATATYPE" />

            <el-table-column label="字段信息" prop="COMMENTS" />

             <el-table-column label="展示" class="show-checked" :render-header="showCheckbox">
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_SHOW"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="编辑" :render-header="editCheckbox">
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_EDIT"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="必填" :render-header="requiredCheckbox">
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_REQUIRED"></el-checkbox>
              </template>
            </el-table-column>

             <el-table-column label="排序" :render-header="orderCheckbox">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_ORDER"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="显示先后">
              <template slot-scope="scope">
               <el-input v-model="scope.row.SORT" placeholder="排序号"></el-input>
              </template>
            </el-table-column>

             <el-table-column label="查询" :render-header="searchCheckbox">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_SEARCH"></el-checkbox>
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
        <!-- <el-button size="small" type="infor" :disabled="disabledNext" @click="isShow=!isShow" icon="information">下一步</el-button> -->

        <!-- <el-dialog title="收货地址" :visible.sync="isShow">
            <config-nenv :id="1"></config-nenv>
          </el-dialog> -->
          <div style="padding: 10px">
             <el-button size="medium" type="primary" :disabled="disabledNext" @click="goNext" icon="">下一步</el-button>
          </div>
         
    </section>
  
  </div>
</template>
<script>
import { getTableColumns} from "./api";
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
                }, '展示 '),
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
                }, '编辑 '),
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
                }, '必填 '),
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
                }, '查询 '),
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
                }, '排序 '),
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
