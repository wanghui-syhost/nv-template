<template>
  <!--router-link :to="to" :tag="tag"/-->
  <a><a>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            default: 'a'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


