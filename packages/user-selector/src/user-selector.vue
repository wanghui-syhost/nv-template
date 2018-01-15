<template>
    <div class="person-choose">
        <el-input placeholder="请选择人员" icon="plus" v-model="choosePerson" :on-icon-click="handleIconClick" readonly :get-choose-person="getChoosePerson">
        </el-input>
        <div class="person-choose-dialog" v-show="isShowChooseDiv">
            <div class="person-choose-input"><input v-model="keyword" v-on:input="inputChange" class="person-choose-keyword" placeholder="查找人员"> </div>
            <div class="person-choose-item" :class="{'choose':item.isChoose}" v-show="item.isShow" v-for="item in personListArr" :key="item.id" @click="toggleChoose(item)">{{item.name}}  
                <i class="el-icon-check"  v-show ="item.isChoose"></i>
            </div>
        </div>
    </div>
</template>

<script>
// 人员选择器
// min 最少选择几个 max 最多选择几个
export default {
    name: 'NvUserSelector',
    data(){
        return{
            isShowChooseDiv:false,
            keyword:'',
            personListArr:[],
        }
    },
    props: {
        word:{
            type:String,
        },
        personList:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    watch:{
        word(val){
            this.keyword = val;
        },
        keyword(val){
            this.$emit('keyword-change',val);
        }
    },
    computed:{
        personFilterList: function(){
            var result = this.personList;
            if(this.word!=null && this.word >0 ){
                result = this.personListArr.filter(x=>x.name.indexOf(this.word) > -1);
            }
            return result;
        },
        choosePerson: function(){
            let arr = this.personListArr.filter(x=>x.isChoose).map(x=>x.name);
            if(arr ==null || arr.length == 0){
              return ;
            }else{
              return arr.join(";") + ";";
            }
        }        
        
    },
    mounted(){
        this.personListArr = this.personList;
        this.personListArr = this.personList.map(x=>{
             this.$set(x, "isChoose", false);
             // 是否显示出来 如果是'' isHidden为false  如果不是空word  查询的时候 隐藏对应的不匹配的题目值
             this.$set(x, "isShow", true);
             return x;
        });
    },
    methods:{
        handleIconClick(){
            this.isShowChooseDiv= !this.isShowChooseDiv;
        },
        inputChange(){
          const  currentWord = this.keyword;
          if(currentWord=='') {
            this.personListArr = this.personListArr.map(x=>{
              this.$set(x,"isShow", true);
              return x;
            })  
          }else{
            this.personListArr = this.personListArr.map(x=>{
              let flag = x.name.indexOf(this.keyword) > -1;
              this.$set(x,"isShow", flag);
              return x;
            });
          }
        
        },
        getChoosePerson(){
            let data = this.personListArr.filter(x=>x.isChoose);
            this.$emit('get-choose-person',data);
        },
        toggleChoose(item){
            item.isChoose = !item.isChoose;
        }
    }
}
</script>
<style lang="scss" scoped>
.person-choose{
    position: relative;
    .person-choose-dialog{
        position: absolute;
        width: 243px;
        height: 177px;
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(153, 153, 153, 0.5);
        z-index: 999;
        overflow-x: hidden;
        overflow-y: auto;
        .person-choose-input{
            padding:10px 15px;
            border-bottom: 1px solid #d8d8d8;
            .person-choose-keyword{
                height: 34px;
                font-size: 14px;
                padding:10px 5px;
                border-radius: 4px;
                background-color: #ffffff;
                border: solid 1px #cccccc;
            }
        }
        .person-choose-item{
            padding:0 15px 0 15px;
            height: 42px;
            font-size: 14px;
            line-height: 42px;
            border-bottom:1px solid #d8d8d8; 
        }
        .person-choose-item.choose{
            padding:0 15px 0 15px;
            background: #f7f7f7;
            height: 42px;
            font-size: 14px;
            line-height: 42px;
            border-bottom:1px solid #d8d8d8; 
        }
    }
}

.theme .person-choose{
    position: relative;
    .person-choose-dialog{
        position: absolute;
        width: 243px;
        height: 177px;
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(153, 153, 153, 0.5);
        z-index: 999;
        overflow-x: hidden;
        overflow-y: auto;
        .person-choose-input{
            padding:10px 15px;
            border-bottom: 1px solid #f00;
            .person-choose-keyword{
                height: 34px;
                font-size: 14px;
                padding:10px 5px;
                border-radius: 4px;
                background-color: #ffffff;
                border: solid 1px #ddd;
            }
        }
        .person-choose-item{
            padding:0 15px 0 15px;
            height: 42px;
            font-size: 14px;
            line-height: 42px;
            border-bottom:1px solid #f00; 
        }
        .person-choose-item.choose{
            padding:0 15px 0 15px;
            background: #f7f7f7;
            height: 42px;
            font-size: 14px;
            line-height: 42px;
            border-bottom:1px solid #f00; 
        }
    }
}

</style>