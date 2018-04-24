import './nv-layout-form.scss'
export default {
    name: 'NvLayoutForm',
    data () {
        return {
            isCollapse: true
        }
    },
    computed: {
        slots () {
            return this.$slots['search-item']
        },
        mainSlot () {
            return this.slots[0]
        },
        otherSlots () {
            return this.slots.slice(1)
        }
    },
    methods: {
        handleCollapse () {
            this.isCollapse = !this.isCollapse
        },
    },
    created () {
        console.log(this.$slots)
    },
    render (h) {
        const self = this
        const { slots, isCollapse, mainSlot, otherSlots } = self
        const innerSlotsLength = otherSlots.length
        const otherSlotsVNodes = []

        for (let i = 0; i < innerSlotsLength; i++) {
            if (innerSlotsLength < 4) {
                otherSlotsVNodes.push(otherSlots[i])
            } else {
                otherSlotsVNodes.push(
                    h(
                        'div', 
                        { 
                            staticClass: 'nv-layout-form_line full',
                        }, 
                        [otherSlots[i], otherSlots[++i]]
                    )
                )
            }
        }

        return h(
            'div',
            {
                staticClass: 'nv-layout-form'
            },
            [
                h (
                    'div',
                    {
                        staticClass: 'nv-layout-form_wrapper'
                    },
                    [
                        h('div', { staticClass: 'nv-layout-form_main'} , [mainSlot]),
                        h(
                            'a',
                            {
                                staticClass: 'nv-layout-form_holder',
                                on: {
                                    click: self.handleCollapse
                                }
                            },
                            [
                                "更多筛选",
                                h('i', { staticClass: isCollapse ? 'el-icon-arrow-down' : 'el-icon-arrow-up' })
                            ]
                        ),
                    ]
                ),
                isCollapse 
                ? null 
                : h(
                    'div',
                    {
                        staticClass: 'nv-layout-form_popover',
                        class: innerSlotsLength > 3 ? 'double' : 'single'
                    },
                    otherSlotsVNodes
                )
            ]
        )
    }
}


