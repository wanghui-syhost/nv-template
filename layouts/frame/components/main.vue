<template>
    <section class="main">
        <transition name="fade" mode="out-in">
              <router-view />
        </transition>
    </section>
</template>

<script>
    export default {
      name: 'FrameMain',  
    }
</script>
<style scoped lang="scss">
    .main{
        height: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s ease-in-out;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>

