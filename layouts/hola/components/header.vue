<template>
    <header>
        <div> {{ header.title }} </div>
    </header>
</template>
<script>
export default {
    name: 'HolaHeader',
    props: {
        header: {
            type: Object,
            default () {
                return {
                    title: nenv.project.title,
                    loginoutText: '退出',
                }
            }
        },
    },
}
</script>
<style lang="scss" scoped>

</style>


