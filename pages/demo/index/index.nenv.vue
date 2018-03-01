<template>
  <nv-layout>
    <h2>nenv 平台组件</h2>
    <section>
        <h3>1.切换标签页标题</h3>
        <el-button type="primary" size="small" @click="changeTitle('切换后的新标题')">点击改变title</el-button>
    </section>
    <section>
        <h3>2.输入控件</h3>
        <div>
          <h4>2.1多选框</h4>
          <nv-checkbox nv-code="HOBBY" v-model="nvCheckboxResult"/>
          <blockquote>
            <p>
              选择结果:
            </p>
            <p v-for="item in nvCheckboxResult" :key="item"> {{ item }} </p>
          </blockquote>
        </div>
        <div>
          <h4>2.1下拉框</h4>
          <nv-select nv-code="PROCESS" v-model="nvSelectResult"></nv-select>
          <blockquote>
            <p>
              选择结果:
            </p>
            <p>{{ nvSelectResult }}</p>
          </blockquote>
        </div>
        <div>
          <h4>2.3单选按钮</h4>
          <nv-radio nv-code="HOBBY" v-model="nvRadioResult"/>
          <blockquote>
            <p>
              选择结果:
            </p>
            <p v-for="item in nvRadioResult" :key="item"> {{ item }} </p>
          </blockquote>
        </div>
        <div>
          <h3>3.省市区级联</h3>
          <div>
            <h4>3.1 标准使用</h4>
            <nv-region-select v-model="nvRegionSelectedResult"></nv-region-select >
          </div>
          <div>
            <h4>3.2 限制区域</h4>
            <nv-region-select v-model="nvRegionSelectedResult2" area="44"></nv-region-select >
          </div>
          <div>
            <h4>3.3 限制可选层级</h4>
            <nv-region-select v-model="nvRegionSelectedResult2" area = "44" :depth="1"></nv-region-select >
          </div>
        </div>

        <div>
            <h3>4.组织人员选择器</h3>
            <h4>4.1 人员选择器</h4>
            <nv-organize-user-selector :multi="true"  v-model="nvOrganizeUserSelectResult" />
            <h4>4.2 组织选择器</h4>
            <nv-organize-user-selector :only-organize="true" :multi="true"  v-model="nvOrganizeSelectResult" />
        </div>

    </section>
    <section style="width:1200px">
        <h3>4.子表配置</h3>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm"  label-width="120px">
        <el-row type="flex" class="row-bg" justify="space-around" 
        v-for="(domain, index) in dynamicValidateForm.domains"
         :key="domain.key">
          <el-form-item label="姓名"  :prop="'domains.' + index + '.NAME'" :rules="[{ required: true, message: '配置名称不能为空', trigger: 'blur'}]">
            <el-input v-model="domain.NAME" placeholder="请输入配置名称"></el-input>
          </el-form-item>
          <el-form-item label="性别"  :prop="'domains.' + index + '.KEY'" :rules="keyRules" >
           <nv-select nv-code="SEX" v-model="domain.KEY"></nv-select>
          </el-form-item>
          <el-form-item label="爱好"  :prop="'domains.' + index + '.VALUE'" :rules="[{required:true, message:'爱好不能为空', trigger: 'blur'}]">
            <nv-checkbox nv-code="HOBBY" v-model="domain.VALUE"/>
          </el-form-item>
           <el-button @click.prevent="removeDomain(domain)" style="margin-left:20px; height: 40px;">删除</el-button>
	    </el-row>
        <el-row type="flex" justify="space-around">
            <el-col :span="8" :offset="4">
               <el-button @click="addDomain">添加行</el-button>
              <el-button type="primary" @click="batchSave"  :disabled="dynamicValidateForm.domains.length >= 1 ? false : true">保存</el-button>
            </el-col>
        </el-row>
      </el-form>
    </section>
  </nv-layout>
</template>

<script>
import vuex, { mapActions } from 'vuex'
export default {
  name: 'demo',
  data () {
    return {
      nvCheckboxResult: [],
      nvRadioResult: [],
      nvSelectResult: '',
      nvRegionSelectedResult:["44","4406","440606"],
      nvRegionSelectedResult2: [],
      nvOrganizeSelectResult: [],
      nvOrganizeUserSelectResult: [],
       keyRules:[ 
              {required:true, message:'请选择性别', trigger:'changeTitle'}
        ],
      dynamicValidateForm: {
        domains: [{
          NAME: '', // 配置名称
          KEY: '', // 配置key
          VALUE: [] // 配置值
        }],
        email: ''
      }
    }
  },
  methods: {
    ...mapActions('platform', [
        'changeTitle'
    ]),

    // 
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          NAME: null, // 配置名称
          KEY: '', // 配置key
          VALUE: [] // 配置值
         // key: Date.now()
        });
      },
      // 批量保存项目信息
  batchSave() {
     this.$refs['dynamicValidateForm'].validate((valid) => {
          if (valid) {
            const arr = this.dynamicValidateForm.domains;
            var data = {
              CONFIGS: JSON.stringify(arr)
            }
            console.log(data);
        } else {
        return false;
      }
    });
  },

  //
  }
}
</script>

<style lang="scss" scoped>

</style>


