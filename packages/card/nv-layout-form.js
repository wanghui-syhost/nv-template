import './nv-layout-form.scss'
export default {
    name: 'NvLayoutForm',
    data () {
        return {
            isCollapse: true
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
        const { $slots, isCollapse } = self
        const hasSearchBtn = !!$slots['search-button']

        const mainSlot = $slots['search-item'][0]
        const otherSlots = $slots['search-item'].slice(1)

        const innerSlotsLength = otherSlots.length
        const otherSlotsVNodes = []


        for (let i = 0; i < innerSlotsLength; i++) {
                otherSlotsVNodes.push(
                    h(
                        'div', 
                        { 
                            staticClass: 'nv-layout-form_line',
                            class: {full: !(innerSlotsLength < 4), half: innerSlotsLength < 4}
                        }, 
                        innerSlotsLength < 4 ? [otherSlots[i]] : [otherSlots[i], otherSlots[++i]]
                    )
                )
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
                        h(
                            'div', 
                            {
                                staticClass: 'nv-layout-form_main',
                                class: {'has-button': hasSearchBtn}
                            },
                            [
                                h('div', { staticClass: 'search-main'}, [mainSlot]),
                                h('div', { staticClass: 'search-btn'}, [$slots['search-button']])
                            ]
                        ),
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


