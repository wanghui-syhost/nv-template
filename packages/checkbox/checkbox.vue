<template>
    <el-checkbox-group v-model="currentValue">
        <el-checkbox v-for="option in nvOptions" :label="option.VALUE" :key="option.VALUE">{{ option.NAME }}</el-checkbox>
    </el-checkbox-group>
</template>
<script>
import nvInpterMixins from 'nenv/mixins/inputerMixins'

export default {
   name: 'NvCheckbox',
   mixins: [nvInpterMixins],
   props: {
        value: {
            type: Array,
            required: true
        }
   },
   data () {
        return {
            nvOptions: []
        }
   },
}
</script>
<style lang="scss" scoped>

</style>


