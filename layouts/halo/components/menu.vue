<template>
    <ul class="halo-menu">
        <halo-menu-item label="menuName"  v-for = "menu in menus" :key="menu.menuId" :menu="menu"/>
    </ul>
</template>
<script>
import HaloMenuItem from './halo-menu-item'
export default {
    components: {
        HaloMenuItem
    },
    props: {
        menus: {
            type: Array,
            default () {
                return []
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .halo-menu {
        display: flex;
        list-style: none;

        &__item {
            padding: 0 10px;
        }
    }
</style>

