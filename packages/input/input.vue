<template>
    <el-input v-model="currentValue" :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}" style="width:200px;"/>
</template>
<script>
import nvInpterMixins from "nenv/mixins/inputerMixins";

export default {
  name: "NvInput",
  // mixins: [nvInpterMixins],
  props: {
    value: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: undefined
    }
  },
  data() {
    return {
      nvOptions: []
    };
  },
  computed: {
    isNvDisabled() {
      const self = this;
      return self.disabled !== undefined
        ? self.disabled
        : self.$route.query["nv-view"] === "true";
    },
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    fetchOptions() {}
  }
};
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">
.el-input__input {
  &.is-nv-disabled + .el-radio__label {
    cursor: default;
  }
}
</style>



