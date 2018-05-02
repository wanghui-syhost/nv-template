<template>
  <div  class="files-wrapper">
          <div v-for="file in files"  :key="file.ID" class="file-item_wrapper">
            <div class="file_item file-type" :class="file.IS_DIRECTORY ? 'folder' : ''" @click="handleFileClick(file)">
                <el-checkbox v-model="file.isChecked" @click.native.stop="() => {}" :class ="{isChecked:file.isChecked}" />
                <div class="file_status">已归档</div>
                <el-popover
                  placement="left"
                  trigger="click"
                  width = '500px'
                >
                  <div class="file_popover--inner">
                    <div @click="handleDownload(file)">下载</div>
                    <div @click="handleReMove(file)">移至</div>
                    <div @click="handleDelete(file)">删除</div>
                    <div>移交</div>
                  </div>
                  <div slot="reference" class="file-tool" @click.stop="() => {}">

                  </div>
                </el-popover>
            </div>
            <input v-model="file.BK_NAME" placeholder="文件标题" class="file_name" @change="updateFileNameByName(file,$event);"/>
          </div>
  </div>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    }
  },
  data () {
      return {
          isAllSelected: false
      }
  },
  methods: {
      handleFileClick (file) {
          this.$emit('nv-event' ,'setParentCode', file.ID, file.NAME,file.IS_DIRECTORY)
      },
      // handleReMove (file) {
      //   this.$emit('nv-event', 'moveFolderTo', file)
      // },
      handleDelete (file) {
        this.$emit('nv-event', 'removeItem', file)
      },
      handleDownload (file) {
        this.$emit('nv-event', 'download', file)
      },
  }
};
</script>
<style lang="scss" scoped>

.file_item {
    position: relative;
    cursor: pointer;
    .file-type {
        &_folder {
            background-image: url('./assets/pdf.png')
        }
    }
}

.file {
  &-tool {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 40px;
    width: 40px;
    border: 1px solid red;
    color: blue;
    line-height: 40px;
    font-size: 60px;
  }

  &_status {
    writing-mode:tb-rl;
    font-size: 14px;
    vertical-align: middle;
    height: 58px;
    line-height: 24px;
    color: #fff;
    background-color: red;
    border: 1px solid red;
    position: absolute;
    right: 10px;
    &:after {
      z-index: 100;
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      border-bottom: 12px solid #fff;
      border-right: 12px solid transparent;
      border-left: 12px solid transparent; 
    }
  }

  &_popover--inner {
    > div {
      cursor: pointer;
      color: #3c8cff;
      padding: 3px 2px;
    }
  }
}

.file-type {
    background-repeat: no-repeat;
    background-position: center;
    &.folder {
        background-image: url('./assets/pdf.png')
    }
}

.files-wrapper {
  display: flex;
  flex-wrap: wrap;


  .file-item_wrapper {
    margin-bottom: 20px;
    .file_item {
      border: 1px solid #ccc;
      border-radius: 4px; 
      width: 160px;
      height: 160px;
      display: block;
      margin-bottom: 15px;
      position: relative;
      img.file_format {
        width: 64px;
        height: 72px;
        overflow: hidden;
        margin: 73px auto;
        display: block;
      }
      .el-checkbox {
        position: absolute;
        left: 0;
        top: -1px;
        display: none;
        &.isChecked {
          display: block;
        }
      }
      .el-button-group {
        position: absolute;
        bottom: 10px;
        left: 54px;
        display: none;
      }
    }
    .file_item:hover {
      border: 1px solid #9dc851;
      .el-checkbox {
        display: block;
      }
      .el-button-group {
        display: block;
      }
    }
    .file_name {
      text-align: center !important;
      height: 32px;
      width: 100%;
      border: none;
    }
    .file_name:hover {
      background-color: #f5f5f5;
    }
  }
}
</style>


