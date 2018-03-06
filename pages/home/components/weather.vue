<template>
    <home-block width="372px" height="227px" style="padding:0;">
        <img src="../assets/img/weather.png">
    </home-block>
</template>
<script>
import homeBlock from '../home-block'
export default {
    components: {
        homeBlock
    }
}
</script>
<style lang="scss" scoped>
.home-block__top.line {
    margin-top: 0px!important;
    border-bottom: none!important;
}
</style>