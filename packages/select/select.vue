<template>
    <el-select v-model="currentValue" placeholder="请选择">
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
        }
    },
    data () {
        return {
            nvOptions: []
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


