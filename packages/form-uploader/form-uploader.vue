<template>
  <div>
    <div>
      <el-select v-model="TYPE_SMALL" placeholder="请选择" v-show="options != ''" style="width: 300px;float: left; margin-right: 30px">
        <el-option
          v-for="item in options"
          :key="item.VALUE"
          :label="item.NAME"
          :value="item.VALUE">
        </el-option>
      </el-select>
      <el-upload  class="upload-table__upload--btn" :action="uploadURL"
        v-if = "canUpload"
        :on-success="success" 
        :before-upload="beforeUpload"
        :headers="uploadHeaders" :data="fileData" 
        :show-file-list="false" 
        :multiple= true
        accept=".jpg, .jpeg, .png, .gif, .rar, .zip, .doc, .docx, .xls, .xlsx,  .ppt, .pptx, .pdf, .txt, .wps">
          <el-button  type="primary">上传</el-button>
      </el-upload>
    </div>

    <div style="margin-top: 10px">
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
        <el-table-column label="文件名称">
          <template slot-scope="scope">
            <a class="file-label" @click="fileViewOrUpload(scope.row)">{{ scope.row.FILE_NAME }}</a>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" prop = "FILE_SIZE" />
        <el-table-column label="文件类型" prop = "TYPE" />
        <el-table-column label="上传时间" prop = "CREATE_TIME" />
        <el-table-column label="操作" v-if="canOperate">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteFile(scope.row)">删除</el-button>
            <slot name="extra" :file="scope.row"/>
            <el-button size="small" type="primary" @click="download(scope.row)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { selectOptionByFileType, selectByFileType, FileDelete, FileView, FileAdd } from "./api";
export default {
  name: "NvFormUploader",
  data() {
    return {
      listLoading: false,
      uploadURL: '/api/file/upload',
      TYPE_SMALL: null,
      list: [],
      options: [],
      fileData: {},
      uploadHeaders:{},
    };
  },
  props: {
    canUpload: {
      type: Boolean,
      default: true
    },
    canOperate: {
      type: Boolean,
      default: true
    }
    // 项目ID，默认为''
    projectId: {
      type: String,
      require: false,
      default: ''
    },
    // 是否需要加入到ES系统中，默认为NO
    needIndex: {
      type: String,
      require: false,
      default: 'NO'
    },
    // 是否需要加入到ES系统中，默认为NO
    TYPE_BIG: {
      type: String,
      require: true,
      default: ''
    },
  },
  mounted () {
      this.uploadHeaders ={
        'Authorization' : localStorage.getItem('user.token'),
      },
      this.fileData = {
				projectId: this.projectId,
      };
  },
  created() {
    this.getList();
    this.getOptionList();
  },
  methods: {
    getList() {
      const self = this;
      const { TYPE_BIG } = self;
      console.log(TYPE_BIG);
      self.listLoading = true;
      selectByFileType({TYPE_BIG})
        .then(({ data }) => {
          self.listLoading = false;
          self.list = data || [];
        })
        .catch(err => {
          self.listLoading = false;
          console.log(err);
        });
    },

    // 查询选项的值
    getOptionList() {
      const self = this;
      const { TYPE_BIG } = self;
      selectOptionByFileType({ TYPE_CODE: TYPE_BIG })
        .then(({ data }) => {
          self.listLoading = false;
          self.options = data || [];
          console.log("self.options:"+self.options);
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 删除文件
    deleteFile(row){
      const self = this;
      self.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
          confirmButtonText:'确定',
          concelButtonText:'取消',
          type:'warning'
        }).then(()=>{
          FileDelete(row.ID).then(() =>{
              self.$message.success("删除成功");
              self.getList();
        }).catch(err=>{
            console.log(err);
        })
      }).catch(()=>{
        // me.$message.info("已取消删除");
      })
    },

    // 下载文件
    download(row) {
      unfetch.download('file/download', {
        params: {
          ID: row.ID
        }
      })
    },

      goDictionaryData(row){
        this.$router.push({path:'/document/upload/data',query:{CODE:'SHENPI',NAME:row.NAME}});
    },

    // 文件预览或下载
    fileViewOrUpload(row){
      let req = {
        FILE_ID: row.ID
      };
      this.listLoading = true;
      FileView(req).then(({data})=>{
          this.listLoading = false;
          let me = this;
          let url = data.fileUrl + data.filePath;
          unfetch.open(url);
      }).catch(err=>{
        this.listLoading = false
        this.$message.error('预览失败！');
        console.error(err);
      });
      return;
    },

    // 上传成功后进行的操作
    success (resp) {
      this.listLoading = false;
      let self = this;
      let {code , data, msg} = resp;
      if(code==0){
          let item = Object.assign({}, data, {
            PROJECT_ID: this.projectId,
            TYPE_BIG: this.TYPE_BIG,
            TYPE_SMALL: this.TYPE_SMALL,
            NEED_INDEX: this.needIndex,
          });
          let arr = [];
          arr.push(item);
          FileAdd(arr).then(resp=>{
            let {code, data,msg} = resp.rawData;
            if(code==0){
              // this.isUploading = false;
              self.$message.success('上传成功');
              self.getList();
            }else{
              self.$message.error(msg);
            }
          }).catch(() => {
            // this.isUploading = false  
          });

      }else{
          // this.isUploading = false
          this.$message.info(msg);
      }
    },

    // 文件上传前调用
    beforeUpload (file) {
      if (file && file.size) {
        let size = file.size / 1024;
        if(size > 20000){  
          this.$message.error("上传文件不能超过20M");
          return false;
        }
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
  .file-label {
    float: left;
    width: 520px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

