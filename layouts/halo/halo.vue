<template>
    <div id="layout-halo" class="layout-halo">
        <div class="halo__header-wrapper">
            <halo-header :menus = "navs"/>
        </div>
        <div class="hola-app-wrapper">
            <div class="hola-main-container">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import HaloHeader from './components/header'
import layoutMixin from '../layoutMixin'
export default {
    name: 'Hola',
    mixins:[layoutMixin],
    components: {
        HaloHeader
    }
}
</script>

<style scoped>

</style>


