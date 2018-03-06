<template>
    <nv-layout>
        <nv-layout-section title="标题一">
            {{ content }}
        </nv-layout-section>
        <nv-layout-section title="标题二">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题三">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题四">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题五">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题六">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题七">
            {{ content }}
        </nv-layout-section>
        <nv-layout-section title="标题八">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题九">
            {{ content }}
        </nv-layout-section> 
        <nv-layout-section title="标题十">
            {{ content }}
        </nv-layout-section> 
    </nv-layout>
</template>
<script>
export default {
    name: 'DEMO-CARD',
    data () {
        return {
            content: "    "
        }
    },
    created () {
        for (let i = 0; i < 100; i++) {
            this.content += "内容"
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


