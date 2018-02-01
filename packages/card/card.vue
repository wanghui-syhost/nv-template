<template>
    <div class="nv-card">
        <slot name="default" />
    </div>
</template>
<script>
export default {
    name: 'NvCard'
}
</script>
<style lang="scss" scoped>
.nv-card {
    background-color: transparent;
    > * {
        padding: 20px;
        margin-bottom: 10px;
        background-color: green;
    }
}
</style>


