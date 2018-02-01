<template>
  <div class="standard-ledger">
    <header class="ledger-header">
    </header>
      <nv-dynamic-ledger :nv-code="nvCode"></nv-dynamic-ledger>
    </div>
</template>
<script>
export default {
  name: 'StardardLedger',
  data () {
    const self = this
    return {
      //nvCode: self.$route.query['nv-code']
    }
  },
  created() {

  },
  computed: {
    nvCode () {
      return this.$route.query['nv-code']
    }
  }
}
</script>
<style lang="scss" scoped>
  .standard-ledger {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }

  .ledger-header {
    // width: 100;
  }
</style>


