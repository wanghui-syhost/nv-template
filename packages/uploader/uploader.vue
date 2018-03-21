<template>
    <div class="upload-table" v-loading.body="isUploading" element-loading-text="正在上传中，请稍等......">
        <section class="upload-table__from">
            <el-button @click="createdNewFolder" type="primary" :disabled ="isSearch">
                新建文件夹
            </el-button>
            <el-button @click="deleteSelectedAndChildren" type="primary">
                删除
            </el-button>
            <el-button @click="downloadChooseRows" type="primary">
                下载
            </el-button>
          
            <el-upload  class="upload-table__upload--btn" :action="uploadURL" 
              :on-success="success" 
              :before-upload="beforeUpload"
              :on-error = "errorUpload" 
              :headers="uploadHeaders" :data="fileData" 
              :show-file-list="false" 
              accept=".jpg, .jpeg, .png, .gif, .rar, .zip, .doc, .docx, .xls, .xlsx,  .ppt, .pptx, .pdf, .txt, .wps">
                <el-button  type="primary" v-show="levelList.length > 1 && showUpload">上传</el-button>
            </el-upload>
            <el-input style="float: right; width:300px" icon="search"
                placeholder="请输入关键字" 
                v-model="fileName" 
                @keyup.enter.native="search" >
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </section>

        <!-- 面包屑导航 -->
        <div style="margin-top: 20px; margin-bottom: 20px; font-size: 14px">
            <el-breadcrumb class="app-levelbar" separator=" > ">
                <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.id">
                    <span v-if='index==levelList.length-1'>{{item.name}}</span>
                    <span v-else @click="setParentCode(item.id, item.name, 'delete', item)">{{item.name}}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label" name="first" ><i class="el-icon-tickets"/></span> 
            <!-- 文件列表 -->
            <el-table :data="list" ref="multipleTable" v-loading="listLoading" @selection-change="handleSelectionChange" fit highlight-current-row>
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column align="center" label="" width="40">
                  <template slot-scope="scope" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)">
                    <i v-if="scope.row.IS_DIRECTORY == 'YES'" class="png-icon file-folder"/> 
                    <i v-else class="png-icon" :class="scope.row.FILE_TYPE | FileIconFilter"/>
                  </template>
                </el-table-column>
                <el-table-column align="left" label='名称'>
                    <template slot-scope="scope">
                        <span class="file-name">
                            <a class="file-label" v-show="!scope.row.isEdit" @click="setParentCode(scope.row.ID, scope.row.NAME,scope.row.IS_DIRECTORY)" :title="scope.row.NAME">{{scope.row.NAME}}</a>
                            <span class="file-input" v-if="scope.row.isEdit">
                              <span style="float: left; margin-bottom: 5px"><el-input id="" size="small" style="width: 310px" v-model="rename" :minlength="1" :maxlength="50" @keyup.enter.native="modifyComplete(scope.row)"></el-input></span>
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
                        <i title="移动到" class="png-icon file-txt small" @click="moveFolderTo(scope.row)"></i>
                    </template>
                </el-table-column>
                <el-table-column label="大小"  align="center" width="100">
                    <template slot-scope="scope">
                        <span v-if=" scope.row.IS_DIRECTORY === 'YES'">-</span>
                        <span v-else>{{ scope.row.FILE_SIZE | FileSizeFormat }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="创建者" align="center" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.USER_NAME }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="更新时间" width="180">
                    <template slot-scope="scope">
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
                    layout="total, sizes, prev, pager, next, jumper, slot"
                    :total="totalCount">
                    <el-button> 确定 </el-button>
                </el-pagination>
            </div>
          </el-tab-pane>

          <el-tab-pane>
            <span slot="label" name="second" ><i class="el-icon-menu"></i></span>
            <el-checkbox v-model="checkAll">全选</el-checkbox>
              <div  class="paper_file">
                <ul>
                  <li v-for="item in list"  :key="item.ID">
                    <a class="file_item">
                      <div>
                        <img :src='item.imgURL' class="file_format"/>
                      </div>
                      <el-checkbox v-model="item.isChecked" :class ="{isChecked:item.isChecked}"></el-checkbox>
                      <el-button-group>
                        <el-button type="primary" icon="el-icon-download" @click="downloadFile(item)" ></el-button>
                        <el-button type="primary" icon="el-icon-close"  @click="removeInfo(item)" ></el-button>
                      </el-button-group>
                    </a>
                    <input :value="item.FILE_TITLE" placeholder="文件标题" class="file_name" @change="updateFileNameByName(item,$event);"/>
                  </li>
                </ul>
              </div>
          </el-tab-pane>
        </el-tabs>
        
        <el-dialog title="新建文件夹" :visible.sync="dialogFormVisible">
            <el-form label-width="120px">
                <el-form-item label="文件夹名称" >
                <el-input v-model="newFolderName" auto-complete="off" placeholder="请输入文件夹名称" @keyup.enter.native="confirmToAddFolder"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align:center">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmToAddFolder" :disabled="newFolderName.length < 1">确 定</el-button>
            </div>
        </el-dialog>
          <div >
         <el-dialog class="dia_scroll" title="移动文件夹" :lock-scroll="false" :visible.sync="moveFormVisible" width="35%">
           
            <el-tree class="tree-folder"  :data="folderList"  node-key="ID" :default-expanded-keys="[0]" :check-strictly="true"  :highlight-current="true"   ref="selectTree" :props="defaultProps" @node-click="handleNodeClick"  @node-expand="defaultCheck" :expand-on-click-node='false' ></el-tree>
            <div slot="footer" style="text-align:center">
                <el-button @click="moveFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="moveConfirm" >确 定</el-button>
            </div>
        </el-dialog>
        </div>
    </div>
</template>

<script>
  import { getTreeDocuments, FileRename, FileDelete, FileAdd, FileDownload, FileCreatedNewFolder,FileRenameFolder,FileDeleteFolder,deleteDirAndFiles,FileView,getFolderList,moveFolder} from './api';
  export default {
    name: 'NvUploader',
    data () {
      return {
        list: [],
        treeId: 0,
        listLoading: true,
        pageIndex:1,
        pageSize:10,
        totalCount: 0,
        value: '',
        uploadURL: '/api/file/upload/project/type',
        fileData: {},
        isUploading:false, //上传中...图片
        uploadHeaders:{},
        // 当前选择的rows;
        currentChooseRows:[],
        // 当前层次的ID
        currentId: '',
        // 上一层次的ID,
        lastId: '',
        // 新建文件夹的dialog
        dialogFormVisible:false,
          // 新建文件夹的dialog
        moveFormVisible:false,
        // 新建文件夹的名称
        newFolderName: '',
        // projectId:'736',
        // type:'drwing',
        fileName: '',
        showUpload: false,
        // 重命名文件/文件夹的名称
        rename: '',
        // 层级导航列表层级导航列表
        levelList: [
            {
                id: 'ROOT',
                name: '文档中心'
            }
        ],
        moveForm:{
          ID:null,
          PARENT_ID:null,
          IS_DIRECTORY:null,
        },
        checkAll: false,//总全选
        isSearch: false,//新建文件夹时是否正在搜寻绑定
        folderList:[],
        defaultProps: {
          children: 'children',
          label: 'NAME'
        },
      }
    },
    props: {
      // 项目ID
      projectId: {
        type: String,
        required: false,
        default: null
      },
      // 项目名称
      projectName: {
        type: String,
        required: false
      },
      // 文件类型
      type: {
        type: String,
        required: false
      },
    },
    mounted () {
      this.uploadHeaders ={
        'Authorization' : localStorage.getItem('user.token'),
      },
      
      this.fileData = {
				projectId: this.projectId,
				type: this.type
      };
    },
    created () {
      const self = this
      self.fetchData();
      history.pushState(null, null, document.URL)
      window.onpopstate = function () {
        if (self.levelList.length !== 1) {
          history.pushState(null, null, document.URL)
          const item = self.levelList[self.levelList.length - 2]
          self.setParentCode(item.id, item.name, 'delete', item)
        } else {
          window.onpopstate = null
        }
      }
    },
    beforeDestory () {
      window.onpopstate = null
    },
    computed: {
      selectedIds () {
        const { currentChooseRows } = this
        return  currentChooseRows.map(item => {
          return item.IS_DIRECTORY === 'YES' ? `DIR-${item.TREE_ID}` : `FILE-${item.TREE_ID}-${item.ID}`
        }).join(',')
      },
      treeId () {
        return this.projectId || 'ROOT'
      }
    },
    // 过滤器，用于处理文件管理模块根据不同类型的文件格式显示不同的图标
    filters: {
      FileIconFilter: function (value) {
        const map = {
          '.xls':  'file-xls',
          '.xlsx': 'file-xls',
          '.et':   'file-xls',
          '.doc':  'file-doc',
          '.docx': 'file-doc',
          '.wps':  'file-doc',
          '.ppt':  'file-ppt',
          '.pptx': 'file-ppt',
          '.dps':  'file-ppt',
          '.rar':  'file-arh',
          '.zip':  'file-arh',
          '.txt':  'file-txt',
          '.pdf':  'file-pdf',
          '.png':  'file-pic',
          '.gif':  'file-pic',
          '.jpg':  'file-pic',
        }
        return map[value] || 'file-other'
      }
    },
    methods: {
      // 获取列表数据
      calcFileImg (ext) {
        switch (ext) {
          case '.doc':
          case '.docx':
            return 'word'
        }
      },
      fetchData(treeId='') {
        this.listLoading = true;
        var tid = '';
        if(treeId == ''){
          if (this.projectId == ''){
            tid = 'ROOT';
          } else {
            tid = this.projectId;
          }
        } else {
          tid = treeId;
        }
        getTreeDocuments({
          pageIndex: this.pageIndex,
          pageSize : this.pageSize,
          PROJECT_ID : this.projectId,
          TYPE : this.type,
          TREE_ID: treeId  || this.treeId
        }).then(({ data = {} }) => {
          this.listLoading = false;
            function calcFileImg(ext) {
                switch (ext) {
                    case '.doc':
                    case '.docx':
                      return 'word'
                    case '.pdf':
                      return 'pdf' 
                    default:
                      return 'excel'
              }
            }
            const { list = [] } = data
            this.list = list.map(v => {
              v.isEdit = false;
              v.isChecked = false;
              v.imgURL = require(`./img/${calcFileImg(v.FILE_TYPE)}.png`)
              return v
            });
            this.totalCount =  data.totalCount || 0
        }).catch(err=>{
          this.listLoading = false;
        })
      },

      defaultCheck(nodeObj,checkObj,node)
      {
        
        console.log("打印默认选中节点");
         console.log(nodeObj);
      },
    moveFolderList() {
      let me = this;
      me.listLoading = true;
      getFolderList()
      .then(response => {
        this.listLoading = false;
        const data = response.data;
        if (data.list == undefined){
            me.folderList = null;
            return;
        }
       let nodeList=[{ 
         //PARENT_ID: "ROOT",
         IS_DIRECTORY: "YES",
         NAME: '全部文件',
         children:data.list,
         ID:0}];
       me.folderList = nodeList;
      }).catch(err => {
        console.log(err);
      })
    },
      handleNodeClick(data) {
        this.moveForm.PARENT_ID=data.ID;
      },
      // 创建文件夹
      createdNewFolder(){
         // 先清空之前填写的信息
        this.newFolderName = "";
        this.dialogFormVisible = true;
      },
      
      // 移动文件夹
      moveFolderTo(row){
        this.moveFolderList();
        this.moveFormVisible = true;
        this.moveForm.ID=row.ID;
        this.moveForm.IS_DIRECTORY=row.IS_DIRECTORY;
      },

    // change select 
    changeSelect(value){
      console.log("change", value);
    },

    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.fetchData(this.currentId);
    },

    handleCurrentChange (pageIndex) {
      this.pageIndex = pageIndex;
      this.fetchData(this.currentId);
    },

    handleSelectionChange (section) {
      console.log(section);
      //当前选择的条目
      this.currentChooseRows = section;
      this.isDownload = !(this.currentChooseRows.length >= 1)
    },
    // 下载文件
    downloadChooseRows () {
      let rows = this.currentChooseRows;
      if(rows.length==0){
        return this.$message.info("请勾选要下载的文件")
      }
      unfetch.download('file/download/compress', {
        params: {
          ID: this.selectedIds
        }
      })
    },
    beforeUpload (file) {
      this.isUploading = true;
      if (this.currentId == "" || this.currentId == "ROOT") return false;
      if (file && file.size) {
        let size = file.size / 1024;
        if(size > 20000){  
          this.$message.error("上传文件不能超过20M");
          return false;
        }
      }
    },
    errorUpload () {
        this.isUploading = false;  
    },
    onUpload (e) {
        this.$message.error("上传文件中");
    },
    success (resp) {
      this.listLoading = false;
      let me = this;
      let {code , data, msg} = resp;
      if(code==0){
          // 开始添加到文件列表中
          var tid = '';
            if(me.currentId  == ''){
            if (this.projectId == ''){
              tid = 'ROOT';
            } else {
              tid = this.projectId;
            }
          } else {
            tid = me.currentId ;
          }
          let item = Object.assign({}, data, {
            TREE_ID : tid ,
            PROJECT_ID: this.projectId
          });
          let arr = [];
          arr.push(item);
          FileAdd(arr).then(resp=>{
            console.log(resp);
            let {code, data,msg} = resp.rawData;
            if(code==0){
              this.isUploading = false;
              me.$message.success('上传成功');
              me.fetchData(me.currentId);
            }else{
              me.$message.error(msg);
            }
          }).catch(() => {
            this.isUploading = false  
          });

      }else{
          this.isUploading = false
          this.$message.info(msg);
      }
    },
    downloadFile(row){
      unfetch.download(this.downloadFileUrl, {
        params: {
          ID: row.ID
        }
      })
    },
    removeInfo(row) {
      let me = this;
      const params = {
        ID: row.ID
      }
      this.$confirm('此操作将永久删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action ,instance) => {
          if (action=='confirm') {
            me.reqData(params);
          }
        }
      });
    },
    updateFileNameByName (row, event) {
      row.FILE_TITLE = event.target.value;
      let backdata = JSON.parse(JSON.stringify(row));
      this.modifyForm = backdata;
    },
    
    removeItem (row) {
      	let me = this;
      	if(row.IS_DIRECTORY === 'YES'){
            me.$confirm('此操作将永久删除该文件夹以及所有子文件, 是否继续?', '提示', {
              confirmButtonText:'确定',
              concelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              // 当删除的是文件夹时需提示将会同时删除文件夹下的文件，确认后做删除文件夹下文件的操作，此处需完善
              FileDeleteFolder(row.ID).then(() =>{
                me.$message.success("删除成功");
                me.fetchData(me.currentId);
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
            FileDelete(row.ID).then(() =>{
                me.$message.success("删除成功");
                me.fetchData(me.currentId);
          }).catch(err=>{
              console.log(err);
          })
        }).catch(()=>{
          // me.$message.info("已取消删除");
        })
      }
    },
    // 修改父节点的值
    setParentCode (parentCode, name, type, item) {
      console.log(...arguments)
      //  this.$router.push({ path: this.$route.fullPath, query:{parentCode} })
       //window.history.pushState({}, null, location.href)
       // history.replaceState('x', null ,'www.baidu.com')
        //节点是文件不进入下一级
       if(type == 'NO'){
          //文件预览
          let req = {
            FILE_ID: parentCode
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
        } 
        
        // 处理左上角的导航功能
        if ('delete' === type) {
            let index = this.levelList.indexOf(item) + 1;
            let length = this.levelList.length - index;
            this.levelList.splice(index, length);
            if(parentCode === "search"){
                this.fileName = name.substring(name.indexOf('"')+1,name.lastIndexOf('"'));
                this.search();
            }else{
                // 点击导航时清除搜索框中的内容
                this.fileName = "";
                // 点击导航时新建文件夹按钮可以使用
                this.isSearch = false;
            }
        } else {
          let temp = [{'id': parentCode, 'name': name}];
          this.levelList.push(...temp)
          // 当类型为search时单独处理
          // 控制可以显示上传按钮
          this.showUpload = ("search" !== type)
        }
        this.currentId = parentCode;
        if(parentCode != null && parentCode != "" && "search" !== type && "search" !== parentCode){
            this.fetchData(parentCode);
        }
    },

    confirmToAddFolder () {
      let me = this;
      if(this.newFolderName.length >15){
         me.$message.error('文件夹名称长度不能大于15');
         return;
      }
      var cid = '';
      if(this.currentId == ''){
        if (this.projectId == ''){
          cid = 'ROOT';
        } else {
          cid = this.projectId;
        }
      } else {
        cid = this.currentId;
      }
      FileCreatedNewFolder({
          PARENT_ID: cid ,
          NAME: this.newFolderName,
          PROJECT_ID: this.projectId,
          TYPE: this.type
      }).then(resp=>{
        me.dialogFormVisible= false;
        me.$message({
          showClose: true,
          message: '创建成功'
        });
        me.fetchData(me.currentId);
       
      }).catch(err=>{
        me.$message.error("创建失败");
      })
    },
    moveConfirm(){
        let  me=this;
        if(this.moveForm.PARENT_ID==null || this.moveForm.PARENT_ID==0){
              me.$message.error("请选中文件夹");
        }else{
              debugger;
              let reqParams = {
                    ID: me.moveForm.ID,
                    PARENT_ID:me.moveForm.PARENT_ID,
                    IS_DIRECTORY:me.moveForm.IS_DIRECTORY,
                  }
                  console.log("移动请求参数：：：：");
                  console.log(reqParams);
              moveFolder(reqParams).then(resp=>{
                let {code, msg, data} = resp.rawData;
                if(code==0){
                me.fetchData(me.currentId);
                this.moveFormVisible=false;
                me.$message.success("移动成功");
                }else{
                  me.$message.error('移动失败');
                }
              }).catch(err=>{
                console.log(err)
            })
        }
       
    },
    download (row) {
      debugger
      unfetch.download('file/download/compress', {
        params: {
        //  ID: this.selectedIds
          ID: row.IS_DIRECTORY === 'YES' ? `DIR-${row.TREE_ID}` : `FILE-${row.TREE_ID}-${row.ID}`
        }
      })
    },
    // 触发重命名
    reName (row) {
      const { list } = this
      this.rename = row.IS_DIRECTORY == "YES" ? row.NAME : row.NAME.substring(0,row.NAME.lastIndexOf("."));
      list.forEach(item => {
        item.isEdit = false
      })
      row.isEdit = true;
    },
    modifyComplete (row) {
      let me = this;
      if(this.rename.length >15){
        me.$message.error('修改文件夹名称长度不能大于15');
        return;
      }
      if(row.IS_DIRECTORY === 'YES'){
          //文件夹重命名
          FileRenameFolder({
            ID: row.ID,
            NAME: this.rename.trim()
          }).then(() => {
            me.fetchData(me.currentId);
            row.isEdit = false;
            me.$message({
              showClose: true,
              message: '修改成功'
            });
          }).catch(err=>{
            console.error(err);
            let {code, msg, data} = err;
            if (code == 3){
              me.$message.error(msg);
            } else {
              me.$message.error("创建失败");
            }
          })
      }else{
        //文件重命名
        FileRename({
          ID: row.ID,
          FILE_NAME: this.rename.trim(),
          FILE_TYPE : row.FILE_TYPE || ''
        }).then(() => {
            me.fetchData(me.currentId);
            row.isEdit = false;
            me.$message({
              showClose: true,
              message: '修改成功'
            });
        }).catch(err=>{
          console.error(err);
        })
      }
    },
    deleteSelectedAndChildren () {
      let rows = this.currentChooseRows;
      if(rows.length === 0){
        this.$message.info("请勾选要删除的文件或文件夹");
        return;
      }
      let me = this;
      me.$confirm('删除后将不可恢复，是否确定要删除此文件?', '提示', {
          confirmButtonText:'确定',
          concelButtonText:'取消',
          type:'warning'
      }).then(()=>{
        deleteDirAndFiles(me.selectedIds).then(() => {
            me.$message.success("删除成功");
            me.fetchData(me.currentId);
        }).catch(err=>{
            console.log(err);
        });
      }).catch(()=>{
        // me.$message.info("已取消删除");
      })
    },
    search () {
      this.listLoading = true;
      const pagePrams = {
        pageIndex: this.pageIndex,
        pageSize : this.pageSize,
        PROJECT_ID : this.projectId,
        TYPE : this.type
      }
      if (this.fileName == "") {
        this.isSearch = false;
        pagePrams.TREE_ID = 'ROOT';
        // 搜索时直接把导航清掉
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
      } else {
        this.isSearch = true;
        pagePrams.FILE_NAME = this.fileName;
        // 搜索时先把导航清掉再显示搜索的内容
        if(this.levelList.length > 1){
            this.levelList.splice(1);
        }
        this.setParentCode("search", '搜索："' + this.fileName +'"', 'search', this.fileName);
      }
      getTreeDocuments(pagePrams)
      .then(({ data = {} }) => {
        this.listLoading = false;
        const { list = [] } = data
        this.list = list.map(v => {
            v.isEdit = false;
            return v
          });
        this.totalCount = data.totalCount || 0
      }).catch(err=>{
        console.log(err);
      });
    }
  },
  watch: {  //监听全选方法
    checkAll (val) {
      const self = this
      const { list } = self
      list.forEach(item => {
        item.isChecked = val;
      })
  }
}
}
</script>

<style lang="scss" scoped>
  .upload-table{
      &__from {
          //padding:20px;
      }
      &__gap {
        margin-bottom: 10px; 
      }
      &__upload--btn {
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
    width: 520px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .file-input {
    float: left;
    margin-left: 10px;
  }

  // 分页组件样式
  .home-detail__page {
    margin-top: 20px;
    margin-right: 30px;
    text-align: center;
  }
  .paper_file {
    float: left;
    width: 100%;
    li{
      list-style: none;
      float: left; 
      padding: 0 20px;
      margin-bottom: 20px;
      a.file_item{
        border:1px solid #ccc;
        width: 218px;
        height:218px;
        display: block;
        margin-bottom: 15px;
        position: relative;
        img.file_format{
          width: 64px;
          height: 72px;
          overflow: hidden;
          margin: 73px auto;
          display: block;
        }
        .el-checkbox{
          position: absolute;
          left: 0;
          top: -1px;
          display: none;
          &.isChecked {
            display: block;
          }
        }
        .el-button-group{
          position: absolute;
          bottom: 10px;
          left: 54px;
          display: none;
        }
      }
      a.file_item:hover{
        border:1px solid #9DC851;
        .el-checkbox{
          display: block;
        }
        .el-button-group{
          display: block; 
        }
      }
      .file_name {
        text-align: center!important;
        height: 40px;
        width: 218px;
        border:none;
      }
      .file_name:hover {
        background-color: #F5F5F5;
      }
    }
  }
  .cell i{
    margin-right:5px;
    cursor: pointer;
  }

  
</style>
<style rel="stylesheet/scss" lang="scss">
@media screen and (max-width: 1400px){
   .file-label {
    width: 200px!important;  
  }

};

.dia_scroll {
  .el-dialog__body {
    height: 260px;
    overflow: auto; 
  }
}

.dia_scroll {
  .el-dialog{
    height: 420px;
  }
}

</style>