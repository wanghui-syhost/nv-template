<template>
    <nv-layout>
        <nv-form-uploader TYPE_BIG="SHENPI" > 
            <template slot="extra" slot-scope="scope">
                <el-button @click="fileTypeData(scope.file)">小类</el-button>
            </template>
        </nv-form-uploader>
    </nv-layout>
</template>
<script>
export default {
    name: 'FormUploader',
    methods: {
        fileTypeData (params) {
            this.$router.push({ path: '/document/upload/data', query: { CODE: params.TYPE_BIG} })
        }
    }
}
</script>