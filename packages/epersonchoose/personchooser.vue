<template>
    <section>
        <div class="nv-organize-user-dialog__input" @click="showDialog">
        <span v-if = "personList.length === 0" class="nv-organize-user-dialog__placeholder" >
            {{ placeholder }}
        </span>
        <el-tag 
            v-for = "node in personList" 
            :key="node.id" 
            size = "small"
            :title="node.userName"
            >
            {{ node.nickName }}
        </el-tag>
        <el-tag size = "small" type="info" @click="showDialog">
            +添加更多
        </el-tag>
		</div>
        <el-dialog :title="title" :visible.sync="isShowDialog" width="800px">
            <epersonchoose @get-choose-person="getChoosePerson" @cancel-choose-person="cancelChoose" ></epersonchoose>
        </el-dialog>
    </section>
</template>
<script>
import epersonchoose from './epersonchoose'

export default {
    name:'NvPersonChooser',
    data(){
        return {
            isShowDialog:false,
            placeholder: '请选择人员',
            title: '请选择人员',
            personList:[],
        }
    },
    components:{
        epersonchoose
    },
    computed: {
    currectValue: {
      set(val) {
        this.$emit("input", val);
      },
      get() {
        return this.value;
      }
    }
  },
  methods:{
    showDialog(){
        this.isShowDialog = true
    },
    getChoosePerson(choosePerson){
        this.isShowDialog = false
        if(choosePerson && choosePerson.length>0){
            this.personList = choosePerson;
        }else{
            this.personList = [];
        }
    },
    cancelChoose(){
        this.isShowDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.nv-organize-user-dialog {
  &__input {
    cursor: pointer;
    min-height: 22px;
    border: 1px solid #dcdfe6;
    padding: 10px 10px 0 0px;

    max-width: 400px;

    &:hover {
      border-color: #c0c4cc;
    }

    .el-tag {
      margin-bottom: 10px;
      margin-left: 10px;
    }
  }

  &__placeholder {
    display: inline-block;
    font-size: 14px;
    margin: 0 0 10px 10px;
    color: #dcdfe6;
  }
}
</style>

