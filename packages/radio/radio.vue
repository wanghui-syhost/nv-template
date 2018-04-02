<template>
    <el-radio-group v-model="currentValue" @change="change" :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
        <el-radio v-for="option in nvOptions" :border="border" :label="option.VALUE" :key="option.VALUE">{{ option.NAME }}</el-radio>
    </el-radio-group>
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'

export default {
   name: 'NvRadio',
   mixins: [nvInpterMixins],
   props: {
        value: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: undefined
        },
        border:{
            type:Boolean
        }
   },
   data () {
        return {
            nvOptions: []
        }
   },
   computed: {
       isNvDisabled () {
           const self = this
           return self.disabled !== undefined ? self.disabled : self.$route.query['nv-view'] === 'true'
       }
   },
   methods:{
       change(...args){
           this.$emit("change",...args);
       }
   }
}
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
    .el-radio__input {
        &.is-nv-disabled  + .el-radio__label {
            cursor: default;
        }
    }
</style>



