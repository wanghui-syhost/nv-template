<template>
    <header class="hola">
        <div class="hola__left"> {{ header.title }} </div>
        <div class="hola__right">
            <layout-select />
        </div>
    </header>
</template>
<script>
import LayoutSelect from '@layouts/components/layout-selector'
export default {
    name: 'HolaHeader',
    components: { LayoutSelect },
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
    .hola {
        background-color: #3b8cff;
        display: flex;
        justify-content: space-between;
        position: fixed;
        line-height: 62px;
        color: #fff;
        width: 100%;
        height: 62px;
    }
</style>


