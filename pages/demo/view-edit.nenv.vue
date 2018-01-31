<template>
    <div>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult"/>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult" :disabled = "false"/>
    </div>
</template>
<script>
export default {
    name: 'formEdit',
    data () {
        return {
            nvCheckBoxResult: []
        }
    },
    created () {
        this.fetchForm()
    },
    methods: {
        fetchForm () {
            const self = this
            unfetch('/view-edit', {
                params: {
                    CODE: 'x'
                }
            }).then(({data}) => {
                self.nvCheckBoxResult = data.nvCheckBoxResult
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

