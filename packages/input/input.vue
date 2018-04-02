<template>
    <el-input v-model="currentValue" ref="nvInput"
     :maxlength="maxlength" :minlength="minlength" :placeholder="placeholder" :prefix-icon="prefixIcon"
     :suffix-icon="suffixIcon" :auto-complete="autoComplete" :readonly="readonly"
     @blur="blur" @focus="focus" @change="change" @clear="clear"   
     :disabled = "isNvDisabled" :class="{'is-nv-disabled': isNvDisabled}" style="width:200px;"/>
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
    },
    maxlength:{
      type:Number
    },
    minlength:{
      type:Number
    },
    placeholder:{
      type:String
    },
    prefixIcon:{
      type:String
    },
    suffixIcon:{
      type:String
    },
    autoComplete:{
      type:String
    },
    readonly:{
      type:String
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
    fetchOptions() {},
    blur(...args){
      this.$emit("blur",...args);
    },
    focus(...args){
      this.$emit("focus",...args);
    },
    change(...args){
      this.$emit("change",...args);
    },
    clear(...args){
      this.$emit("clear",...args);
    }
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



