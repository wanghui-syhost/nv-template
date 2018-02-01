<template>
    <nv-layout class="upload-table">
        <section class="upload-table__from">
            <h3>文件管理</h3>
            <el-button @click="createdNewFolder">
                新建文件夹
            </el-button>
            <el-button @click="deleteSelectedAndChildren">
                删除
            </el-button>
            <el-button @click="downloadChooseRows">
                下载
            </el-button>
            <el-upload  class="upload-table__upload--btn" :action="uploadURL" :on-success="success" :before-upload="beforeUpload" :headers="uploadHeaders" :data="fileData" :show-file-list="false" accept=".jpg, .jpeg, .png, .gif, .rar, .zip, .doc, .docx, .xls, .xlsx,  .ppt, .pptx, .pdf, .txt, .wps">
                <el-button  type="primary" v-show="levelList.length > 1 && showUpload">上传</el-button>
            </el-upload>
            <el-input style="float: right; margin-right: 50px; width:300px" icon="search"
                placeholder="请输入文件名称" 
                v-model="fileName" 
                @keyup.enter.native="search" 
                :on-icon-click="search">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </section>

        <!-- 面包屑导航 -->
        <div style="margin-top: 10px; margin-bottom: 10px; font-size: 14px">
            <el-breadcrumb class="app-levelbar" separator=" > ">
                <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.id">
                    <span v-if='index==levelList.length-1'>{{item.name}}</span>
                    <span v-else @click="setParentCode(item.id, item.name, 'delete', item)">{{item.name}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 文件列表 -->
        <el-table :data="list" ref="multipleTable" v-loading="listLoading" @selection-change="handleSelectionChange" fit highlight-current-row>
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column align="center" label="" width="40">
              <template slot-scope="scope" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)">
                <i v-if="scope.row.IS_DIRECTORY == '1'" class="png-icon file-folder"/>
                <i v-else class="png-icon" :class="scope.row.FILE_TYPE | FileIconFilter"/>
              </template>
            </el-table-column>
            <el-table-column align="left" label='文件名' show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="file-name">
                        <span class="file-label" v-show="!scope.row.isEdit" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)">{{scope.row.NAME}}</span>
                        <span class="file-input" v-if="scope.row.isEdit">
                          <span style="float: left"><el-input id="" size="small" style="width: 310px" v-model="rename" :minlength="1" :maxlength="50" @keyup.enter.native="modifyComplete(scope.row)"></el-input></span>
                          <span style="float: left; margin-left: 10px"><el-button type="primary" size="mini" @click="modifyComplete(scope.row)" :disabled="rename.length<1">确认</el-button></span>
                          <span style="float: left; margin-left: 5px"><el-button type="primary" size="mini" @click="scope.row.isEdit = false">取消</el-button></span>
                        </span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="" width="180">
                <template slot-scope="scope">
                    <i title="重命名" class="png-icon file-rename small" @click="reName(scope.row)"></i>
                    <i title="下载" class="png-icon file-upload  small" @click="download(scope.row)"></i>
                    <i title="删除" class="png-icon file-delete small" @click="removeItem(scope.row)"></i>
                </template>
            </el-table-column>
            <!-- <el-table-column label="文件类型"  align="center">
                <template slot-scope="scope">
                <span v-if=" scope.row.IS_DIRECTORY === 1">-</span>
                <span v-else>{{ scope.row.FILE_TYPE }}</span>
                </template>
            </el-table-column> -->
            <el-table-column label="文件大小"  align="center" width="100">
                <template slot-scope="scope">
                    <span v-if=" scope.row.IS_DIRECTORY === 1">-</span>
                    <span v-else>{{ scope.row.FILE_SIZE | FileSizeFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column label="上传人" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{ scope.row.USER_NAME }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="上传时间" width="180">
                <template slot-scope="scope">
                    <!-- <i class="el-icon-time"></i> -->
                    <span>{{scope.row.CREATE_TIME | DateTimeFilter(5)}}</span>
                </template>
            </el-table-column>
        
        </el-table>

        <div class="home-detail__page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
            <el-form>
                <el-form-item label="文件夹名称">
                <el-input v-model="newFolderName" auto-complete="off" placeholder="请输入文件夹名称" :minlength="1" :maxlength="15" @keyup.enter.native="confirmToAddFolder"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmToAddFolder" :disabled="newFolderName.length<1">确 定</el-button>
            </div>
        </el-dialog>
    </nv-layout>
</template>

<script>
  import { getTreeDocuments, FileRename, FileDelete, FileAdd, FileDownload, FileCreatedNewFolder,FileRenameFolder,FileDeleteFolder,deleteDirAndFiles,FileView} from './api';
  //import Config from '@core/config';
  const Config = {}
  export default {
    name: 'NvUploader',
    data () {
      return {
        list: null,
        listLoading: true,
        pageIndex:1,
        pageSize:10,
        totalCount: 0,
        value:'',
        uploadURL: '/api/file/upload/project/type',
        fileData: {},

        uploadHeaders:{},
        // 当前选择的rows;
        currentChooseRows:[],
        // 当前层次的ID
        currentId:'',
        // 上一层次的ID,
        lastId:'',
        // 新建文件夹的dialog
        dialogFormVisible:false,
        // 新建文件夹的名称
        newFolderName:'',
        // projectId:'736',
        // type:'drwing',
        fileName:'',
        showUpload: false,
        // 重命名文件/文件夹的名称
        rename:'',
        // 层级导航列表层级导航列表
        levelList: [
            {
                id: 'ROOT',
                name: '文件管理'
            }
        ],
      }
    },
    props: {
      // 项目ID
      projectId: {
        type: String,
      },
      // 项目名称
      projectName: {
        type: String,
      },
      // 文件类型
      type: {
        type: String,
      },
    },
    mounted(){
      this.uploadHeaders ={
        'Authorization' : localStorage.getItem('user.token'),
      },
      this.fileData = {
				projectId: this.projectId,
				type: this.type
			};
    },
    created() {
      this.fetchData();
    },  
    methods: {
      // 获取列表数据
      fetchData(treeId='') {
        this.listLoading = true;
        const pagePrams = {
          pageIndex: this.pageIndex,
          pageSize : this.pageSize,
          PROJECT_ID : this.projectId,
          TYPE : this.type,
          TREE_ID: treeId == '' ? 'ROOT' : treeId
        }
        getTreeDocuments(pagePrams).then(response => {
          this.listLoading = false;
          const  {data, code ,msg} = response.rawData;
          if(code===0){
              this.list = data.list.map(v => {
                v.isEdit = false;
                return v
              });
              this.totalCount = data.totalCount;
          }else{
            this.$message.error(msg);
          }
        }).catch(err=>{
          console.log(err);
        })
      },

      // 创建文件夹
      createdNewFolder(){
        // 先清空之前填写的信息
        this.newFolderName = "";
        this.dialogFormVisible = true;
      },

    // change select 
    changeSelect(value){
      console.log("change", value);
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize;
      this.fetchData(this.currentId);
    },
    handleCurrentChange(pageIndex){
      this.pageIndex = pageIndex;
      this.fetchData(this.currentId);
    },
    handleSelectionChange(section){
      console.log(section);
      //当前选择的条目
      this.currentChooseRows = section;
      if(this.currentChooseRows.length>=1){
        this.isDownload = false;
      }else{
        this.isDownload = true;
      }
    },
    // 下载文件
    downloadChooseRows(){
      let rows = this.currentChooseRows;
      if(rows.length==0){
        this.$message.info("请勾选要下载的文件");
        return;
      }
      let queryParam = `?ID=`+this.handlerChooseRowsID();
      window.location=  Config.BASE_API+'file/download/compress' + queryParam;
    },
    // DIR-{dirId},FILE-{dirID}-{fileId}
    // 处理要下载的文件的ID
    handlerChooseRowsID(){
      let rows = this.currentChooseRows;
      let arr=[];
      for(let i=0;i<rows.length;i++){
        let one = rows[i];
        let str='';
        console.log(one);
        if(one.IS_DIRECTORY==1){
          str = `DIR-${one.TREE_ID}` ;
        }else{
          str = `FILE-${one.TREE_ID}-${one.ID}`;
        }
        arr.push(str);
      }
      return arr.join(',');
    },
    beforeUpload(file){
      if(this.currentId == "" || this.currentId == "ROOT") return false;
      if(file && file.size){
        let size = file.size / 1024;
        if(size > 20000){  
          this.$message.error("上传文件不能超过20M");
          return false;
        }
      }
    },
    onUpload(e){
        this.$message.error("上传文件中");
    },
    success(resp){
      this.listLoading = false;
      debugger;
        let me = this;
        let {code , data,msg} = resp;
        console.log(resp);
        if(code==0){
            // 开始添加到文件列表中
            let item = Object.assign({}, data, {
              TREE_ID : me.currentId == '' ? 'ROOT' : me.currentId ,
              PROJECT_ID: this.projectId
            });
            let arr = [];
            arr.push(item);
           FileAdd(arr).then(resp=>{
             console.log(resp);
             let {code, data,msg} = resp.rawData;
              if(code==0){
                me.$message.info('上传成功');
                me.fetchData(me.currentId);
              }else{  
                me.$message.error(msg);
              }
           });

        }else{
            this.$message.info(msg);
        }
    },
    removeItem(row){
      	let me = this;
      	if(row.IS_DIRECTORY === 1){
            me.$confirm('此操作将永久删除该文件夹以及所有子文件, 是否继续?', '提示', {
              confirmButtonText:'确定',
              concelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              // 当删除的是文件夹时需提示将会同时删除文件夹下的文件，确认后做删除文件夹下文件的操作，此处需完善
              FileDeleteFolder(row.ID).then(resp=>{
                let {code, msg, data} = resp.rawData;
                if(code === 0){
                me.$message.info("删除成功");
                me.fetchData(me.currentId);
                }else{
                me.$message.error(msg);
                }
              }).catch(err=>{
                console.log(err);
              })
            }).catch(()=>{
              // me.$message.info("已取消删除");
            })
      }else{
        me.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
            confirmButtonText:'确定',
            concelButtonText:'取消',
            type:'warning'
          }).then(()=>{
            FileDelete(row.ID).then(resp=>{
                let {code, msg, data} = resp.rawData;
              if(code ===0){
                me.$message.info("删除成功");
                me.fetchData(me.currentId);
              }else{
                me.$message.error(msg);
              }
          }).catch(err=>{
              console.log(err);
          })
        }).catch(()=>{
          // me.$message.info("已取消删除");
        })
      }
    },
    // 修改父节点的值
    setParentCode(parentCode, name, type, item){
        //节点是文件不进入下一级
       if(type == 0){
          //文件预览
          let req = {
            FILE_ID: parentCode
          };
          this.listLoading = true;
          FileView(req).then(resp=>{
              let {code, msg, data} = resp.rawData;
              let me = this;
              debugger;
              if(code==0){
                // let url = data.fileUrl + data.filePath;
                let url = data.filePath;
                window.location.href = url;
              }else{
                me.$message.error('预览失败！');
              }
          }).catch(err=>{
            console.error(err);
          });
          this.listLoading = false;
          return;
        } 
        // 处理左上角的导航功能
        if('delete' === type){
            let index = this.levelList.indexOf(item) + 1;
            let length = this.levelList.length - index;
            this.levelList.splice(index, length);
            if(parentCode === "search"){
                this.fileName = name.substring(name.indexOf('"')+1,name.lastIndexOf('"'));
                this.search();
            }else{
                // 点击导航时清除搜索框中的内容
                this.fileName = "";
            }
        } else {
          let temp = [{'id': parentCode, 'name': name}];
          this.levelList = this.levelList.concat(temp);
          // 当类型为search时单独处理
          if("search" !== type){
              // 控制可以显示上传按钮
              this.showUpload = true;
          }
        }
        this.currentId = parentCode;
        if(parentCode != null && parentCode != "" && "search" !== type && "search" !== parentCode){
            this.fetchData(parentCode);
        }
    },

    confirmToAddFolder(){
      let me = this;
      if(this.newFolderName.length >15){
         me.$message.error('文件名长度不能大于15');
         return;
      }
      let req = {
          PARENT_ID: this.currentId == '' ? 'ROOT' : this.currentId ,
          NAME: this.newFolderName,
          PROJECT_ID: this.projectId,
          TYPE: this.type
      };
      FileCreatedNewFolder(req).then(resp=>{
        console.log(resp);
        me.dialogFormVisible= false;
        let {code, msg, data} = resp.rawData;
        if(code==0){
          me.$message({
            showClose: true,
            message: '创建成功'
          });
          me.fetchData(me.currentId);
        }else{
          me.$message.error('创建失败');
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    download(row){
      let queryParam;
      if(row.IS_DIRECTORY == "1"){
        //queryParam = `DIR-${row.TREE_ID}`;
        queryParam = "ID=DIR-"+row.TREE_ID;
      }else{
        queryParam = `ID=FILE-${row.TREE_ID}-${row.ID}`;
      }
      window.location = Config.BASE_API+'file/download/compress?' + queryParam;
    },
    // 触发重命名
    reName(row){
      if(row.IS_DIRECTORY == "1"){
        this.rename = row.NAME;
      }else{
        this.rename = row.NAME.substring(0,row.NAME.lastIndexOf("."));
      }
      row.isEdit = true;
    },
    modifyComplete(row){
      let me = this;
      if(row.IS_DIRECTORY === 1){
          //文件夹重命名
          let data = {
            ID: row.ID,
            NAME: this.rename.trim()
          };
          FileRenameFolder(data).then(resp=>{
            let {code, msg, data} = resp.rawData;
            if(code==0){
              me.fetchData(me.currentId);
              row.isEdit = false;
              me.$message({
                showClose: true,
                message: '修改成功'
              });
            }else{
              me.$message.error('修改失败');
            }
          }).catch(err=>{
            console.error(err);
          })
      }else{
        //文件重命名
        let data = {
          ID: row.ID,
          FILE_NAME: this.rename.trim(),
          FILE_TYPE : row.FILE_TYPE==null?'':row.FILE_TYPE
        };
        FileRename(data).then(resp=>{
          let {code, msg, data} = resp.rawData;
          if(code==0){
            me.fetchData(me.currentId);
            row.isEdit = false;
            me.$message({
              showClose: true,
              message: '修改成功'
            });
          }else{
            me.$message.error('修改失败');
          }
        }).catch(err=>{
          console.error(err);
        })
      }
    },
    deleteSelectedAndChildren(){
      let rows = this.currentChooseRows;
      if(rows.length==0){
        this.$message.info("请勾选要删除的文件或文件夹");
        return;
      }
      let arr=[];
      for(let i=0;i<rows.length;i++){
        let one = rows[i];
        let str='';
        if(one.IS_DIRECTORY==1){
          str = `DIR-${one.TREE_ID}`;
        }else{
          str = `FILE-${one.ID}`;
        }
        arr.push(str);
      }
      let ids = arr.join(',');
      let me = this;
      me.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
          confirmButtonText:'确定',
          concelButtonText:'取消',
          type:'warning'
      }).then(()=>{
        deleteDirAndFiles(ids).then(resp=>{
          let {code, msg, data} = resp.rawData;
          if(code ===0){
            me.$message.info("删除成功");
            me.fetchData(me.currentId);
          }else{
            me.$message.error(msg);
          }
        }).catch(err=>{
            console.log(err);
        });
      }).catch(()=>{
        // me.$message.info("已取消删除");
      })
    },
    search(){
      this.listLoading = true;
      const pagePrams = {
        pageIndex: this.pageIndex,
        pageSize : this.pageSize,
        PROJECT_ID : this.projectId,
        TYPE : this.type
      }
      if(this.fileName == ""){;
        pagePrams.TREE_ID = 'ROOT';
        // 搜索时直接把导航清掉
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
      }else{
        pagePrams.FILE_NAME = this.fileName;
        // 搜索时先把导航清掉再显示搜索的内容
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
        this.setParentCode("search", '搜索："' + this.fileName +'"', 'search', this.fileName);
      }
      getTreeDocuments(pagePrams).then(response => {
        this.listLoading = false;
        const  {data, code ,msg} = response.data;
        if(code===0){
            this.list = data.list.map(v => {
              v.isEdit = false;
              return v
            });
            this.totalCount = data.totalCount;
        }else{
          this.$message.error(msg);
        }
      }).catch(err=>{
        console.log(err);
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-table{
      &__from{
          padding:20px;
      }
      &__gap{
        margin-bottom: 10px; 
      }
      &__upload--btn{
          display: inline-block;
          padding-left: 9px;
      }
  }

  .file-name:hover {
    color: #398DEE;
    cursor: pointer;
  }

  .file-label {
    float: left;
    margin-left: 20px;
  }

  .file-input {
    float: left;
    margin-left: 10px;
  }

  // 分页组件样式
  .home-detail__page {
    margin-top: 20px;
    margin-right: 30px;
    text-align: right;
  }
</style>
