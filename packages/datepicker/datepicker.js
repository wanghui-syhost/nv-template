import nvViewEditMixin from '../mixins/nvViewEditMixin'
export default {
    name: 'NvDatePicker',
    mixins: [nvViewEditMixin],
    props: {
        value: null
    },
    render (h) {
        const self = this
        console.log(this.$props)
        return h(
            'el-date-picker',
            {
                domProps: {
                    disabled: self.isNvDisabled,
                },
                props: {
                    value: self.value,
                    ...self.$props
                },
                on: {
                    input: function (event) {
                        self.$emit('input', event)
                        console.log(event)
                    }
                }
            },
            
        )
    }
}