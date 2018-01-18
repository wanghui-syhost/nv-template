<template>
    <el-radio-group v-model="currentValue">
        <el-radio v-for = "opt in nvOptions" :key="opt.VALUE" :label="opt.VALUE"> {{ opt.NAME }} </el-radio>
    </el-radio-group>
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'

export default {
    name: 'NvRadio',
    props: {
        value: {
            // type: Array,
            required: true
        }
    },
    data () {
        return {
            nvOptions: []
        }
    },
    mixins: [nvInpterMixins],
}
</script>
<style lang="scss" scoped>

</style>


