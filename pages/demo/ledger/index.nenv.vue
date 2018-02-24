<template>
  <!-- <nv-dynamic-ledger nv-code="FIRST_LEDGER"></nv-dynamic-ledger> -->
  <nv-layout>
    <nv-select nv-code="LEDGER_DEMO_SELECT" v-model="ledgerCode"/>
  </nv-layout>
</template>
<script>
export default {
  name: 'LedgerDemo',
  data () {
    return {
      ledgerCode: ''
    }
  },
  watch: {
    ledgerCode (val) {
      if (val) {
        unfetch.open('./#/ledger', {
          params: {
            'nv-code': val
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>


