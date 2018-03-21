<template>
    <el-select v-model="currentValue" placeholder="请选择" :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}">
        <el-option
        v-for="option in nvOptionsExt"
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
            // type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: undefined
        },
        canAllSelect: {
            type: Boolean,
            default: true,
        },
        allSelectLabel: {
            type: String,
            default: '全部'
        }
    },
    data () {
        return {
            nvOptions: [

            ]
        }
    },
    computed: {
        nvOptionsExt () {
            const self = this
            const { canAllSelect } = self
            return (canAllSelect ? [
                        {
                            ID: '-1',
                            NAME: self.allSelectLabel,
                            VALUE: null,
                        }
                    ] : []).concat(self.nvOptions)
        },
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
