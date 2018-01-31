<template>
    <el-select v-model="currentValue" placeholder="请选择" :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
        <el-option
        v-for="option in nvOptions"
        :key="option.VALUE"
        :label="option.NAME"
        :value="option.VALUE">
        </el-option>
    </el-select>
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'
export default {
    name: 'NvSelect',
    mixins: [nvInpterMixins],
    props: {
        value: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: undefined
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
}
</script>
<style lang="scss" scoped>
     .el-select__input {
        &.is-nv-disabled  + .el-radio__label {
            cursor: default;
        }
    }
</style>


