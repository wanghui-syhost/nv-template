<template>
    <div>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult"/>
        <nv-checkbox nv-code="HOBBY" v-model="nvCheckBoxResult" :disabled = "false"/>

        <div> 
            <nv-radio nv-code="HAHA" v-model="nvRadioResult"/>       
        </div>
        <div> 
            <nv-radio nv-code="HAHA" v-model="nvRadioResult2" :disabled = "false"/>       
        </div>
    </div>
</template>
<script>
export default {
    name: 'formEdit',
    data () {
        return {
            nvCheckBoxResult: [],
            nvRadioResult: '',
                        nvRadioResult2: ''
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
                self.nvCheckBoxResult = data.nvCheckBoxResult,
                self.nvRadioResult = data.nvRadioResult
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

