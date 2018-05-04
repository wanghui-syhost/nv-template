import './nv-layout-form.scss'
import { mapState } from 'vuex'
import store from './store'
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
    computed: {
        ...mapState(store.name, ['isExtraRight'])
    },
    render (h) {
        const self = this
        const { $slots, isCollapse, isExtraRight } = self
        const hasSearchBtn = !!$slots['search-button']

        const filteredMainSlot = $slots['search-item'].filter(item => item.tag)

        const mainSlot = filteredMainSlot[0]
        const otherSlots = filteredMainSlot.slice(1)
        const extraSlots = $slots['extra-item']

        console.log(otherSlots)

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

        return  h('section',
                    {
                        staticClass: 'nv-layout-formater'
                    },
                    [
                        h(
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
                                        ...otherSlotsVNodes.length > 0 ? [
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
                                            !isCollapse
                                            ? h(
                                                'div',
                                                {
                                                    staticClass: 'nv-layout-form_popover',
                                                    class: innerSlotsLength > 3 ? 'double' : 'single'
                                                },
                                                otherSlotsVNodes
                                            )
                                            : null
                                        ]: null ,
                                    ]
                                )
                            ]
                        ),
                        h(
                            'div',
                            {
                                staticClass: 'extra-wrapper'
                            },
                            extraSlots
                        )
                    ][isExtraRight ? 'reverse' : 'slice']()
                )
    }
}


