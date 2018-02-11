<template>
    <li class="halo-menu__item">
        <component 
            :is="navComponent(menu)" 
            :to="menu.linkUrl"
            tag="div"
            class="nav-item"
            >
            {{ menu[label] }}
        </component>
        <halo-menu-pane v-if="menu[children]" :menus="menu[children]" />
    </li>
</template>
<script>
import HaloMenuPane from './halo-menu-pane'
import navComponentMixin from '@layouts/mixins/navComponentMixin'
export default {
    name: 'HaloMenuItem',
    props: {
        menu: {
            type: Object
        },
        label: {
            type: String,
            default: 'menuName'
        },
        children: {
            type: String,
            default: 'childrens'
        }
    },
    components: {
        HaloMenuPane
    },
    mixins: [navComponentMixin]
}
</script>
<style lang="scss" scoped>
    .halo-menu__item {
        position: relative;
        padding: 10px 10px;
        list-style: none;

        width: max-content;

        .halo-menu__pane {
            display: none;
        }

        &:hover {
            > .nav-item {
                color: red
            }
            > .halo-menu__pane {
                display: flex;
            }   
        }
    }
</style>



