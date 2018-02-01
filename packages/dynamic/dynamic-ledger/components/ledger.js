import dynamicMixins from '../../lib/dynamicMixins'
export default {
    name: 'NvDynamicLedger',
    props:{
        nvUrl: {
            default: '/ledger/menus'
        },
        nvCode : {
            type: String,
            required: true
        },
        nvPosition: {
            type: String,
            default: 'left'
        }
    },
    mixins: [ dynamicMixins ],
    data () {
        return {
            menus: []
        }
    },
    created () {
        this.loadMenus()
    },
    methods: {
        loadMenus () {
            const self =this
            const { nvUrl, nvCode} = self
            unfetch(nvUrl, {
                params: {
                    CODE: nvCode
                }
            }).then(({ data }) => {
                data = data.map(tab => {
                    const path = tab.URL.split('?')
                    let query = path[1]
                    if (query) {
                        query = query.split('&')
                        const kv = {}
                        for (let q of query) {
                            q = q.split('=')
                            kv[q[0]] = q[1]
                        }
                        tab.query = kv
                    }
                    tab.path = path[0]
                    delete tab.URL
                    return tab
                })
                self.isLoading = false
                self.menus = data
                self.handleTabClick(data[0])
            })
        },
        handleTabClick (tab) {
            this.currentTab = tab
            this.$router.push({ path: this.$route.fullPath, query: tab.query || {} })
        }
    },
    render (h) {
        const self = this
        return h(
                    'div',
                    {
                        staticClass: 'nv-ledger',
                        class: `nv-${self.nvPosition}`
                    },
                    [
                        h(
                            'div',
                            {
                                staticClass: 'nv-ledger__nav'
                            },
                            self.menus.map((menu) => {
                                return h(
                                            'div',
                                            {
                                                staticClass: 'nv-ledger__item',
                                                class: self.currentTab.path === menu.path ? 'active' : '',
                                                on: {
                                                    click: function () { self.handleTabClick(menu) }
                                                }
                                            },
                                            menu.NAME
                                        )
                            })
                        ),
                        h(
                            'div',
                            {
                                staticClass: 'nv-ledger__pane'
                            },
                            [
                                h(
                                    self.realComponent,
                                    {
                                        props: {
                                            ...self.realComponentProps
                                        }
                                    }
                                )
                            ]
                        )
                    ]
                )
    }
}



