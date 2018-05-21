<template>
    <nv-layout>
        {{ $route.params.name }}
    </nv-layout>
</template>
<script>
export default {
    name:'DemoPathVab',
    meta: { nvPermission: false },
    created () {
        // alert(`路径变量为： ${this.$route.params.name} `)
    }
}
</script>

<style lang="scss" scoped>

</style>

