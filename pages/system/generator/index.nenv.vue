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
          <el-row>
          
              <el-form-item label="表名"  :rules="[{ required: true, message: '配置名称不能为空', trigger: 'blur'}]">
                <el-input v-model="tablename" placeholder="请输入表名"  size="middle" style="width:332px;"></el-input>
            </el-form-item>
             

            <el-button type="infor" @click="getList();">连接</el-button>
             
          </el-row>
  			</div>
        </el-form>
      </section>


    <section class="search-table">
     
      
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
           
          
            <el-table-column label="字段" prop = "COLUMNNAME" />
         
            <el-table-column label="字段类型" prop="DATATYPE" />

            <el-table-column label="字段信息" prop="COMMENTS" />

             <el-table-column label="展示" >
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_SHOW"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="编辑" >
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_EDIT"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="编辑必填" >
               <!-- <el-table-column label="展示" type="selection" > -->
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_REQUIRED"></el-checkbox>
              </template>
            </el-table-column>

             <el-table-column label="排序">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.IS_ORDER"></el-checkbox>
              </template>
            </el-table-column>

            <el-table-column label="显示先后">
              <template slot-scope="scope">
               <el-input v-model="scope.row.SORT" placeholder="排序号"></el-input>
              </template>
            </el-table-column>

             <el-table-column label="查询">
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
import axios from "axios";
import { getTableColumns} from "./api";
//import ConfigNenv from './config.nenv'
export default {
  name: "Generator",
  // components:{
  //   ConfigNenv
  // },
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
    const data = localStorage.getItem("generatorListParam");
    if (data){
      this.list = JSON.parse(data);
      this.disabledNext = false;
    }
   
  },

  methods: {
    getList() {
      this.listLoading = true;
      const pageParams = {
        tablename: this.tablename
      };
      getTableColumns(pageParams)
        .then(response => {
          this.listLoading = false;
          const data = response.data;
          if (data == undefined){
            this.list = null;
            return;
          }
          this.list = data.map(v => {
            v.IS_SHOW = false;
            v.IS_SEARCH = false;
            v.IS_ORDER = false;
            v.IS_EDIT = false;
            v.IS_REQUIRED = false;
            v.NAME = '';
            v.TYPE = 'TEXT';
            v.SORT = null;
            return v;
          });
          this.disabledNext = false;
        })
        
        .catch(err => {
          console.log(err);
        });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    goNext(){

      localStorage.setItem("generatorListParam", JSON.stringify(this.list));
      this.$router.push({path:'/system/generator/config'});
    }
  }
};
</script>
