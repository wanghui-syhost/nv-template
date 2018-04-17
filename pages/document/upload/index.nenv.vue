<template>
    <nv-layout>
        <nv-form-uploader TYPE_BIG="001" > 
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