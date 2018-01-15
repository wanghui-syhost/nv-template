<template>
  <div>
    <h1>nenv 平台标准demo</h1>
    <section>
        <h2>1.切换标题</h2>
        <el-button type="primary" @click="changeTitle('切换后的新标题')">点击改变title</el-button>
    </section>
    <section>
        <h2>2.输入控件</h2>
        <div>
          <h3>2.1多选框</h3>
          <nv-checkbox nv-code="HOBBY" v-model="nvCheckboxResult"/>
          <blockquote>
            <p>
              选择结果:
            </p>
            <p v-for="item in nvCheckboxResult" :key="item"> {{ item }} </p>
          </blockquote>
        </div>
        <div>
          <h3>2.1下拉框</h3>
          <nv-select nv-code="PROCESS" v-model="nvSelectResult"></nv-select>
          <blockquote>
            <p>
              选择结果:
            </p>
            <p>{{ nvSelectResult }}</p>
          </blockquote>
        </div>
    </section>
  </div>
</template>

<script>
import vuex, { mapActions } from 'vuex'
export default {
  name: 'demo',
  data () {
    return {
      nvCheckboxResult: [],
      nvSelectResult: '',
    }
  },
  methods: {
    ...mapActions('platform', [
        'changeTitle'
    ])
  }
}
</script>

<style lang="scss" scoped>

</style>


