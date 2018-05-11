export default {
    data() {
        return {
            currentTab: {},
            realComponentProps: {}
        }
    },
    methods: {
        handleTabClick (tab) {
            this.currentTab = tab
            this.$router.push({ path: this.$route.fullPath, query: tab.query || {} })
        }
    },
    computed: {
        realComponent () {
            const self = this
            const { currentTab } = self
            const { path } = currentTab
            const { flatRoutes } = window.nenv
            if (path) {
                if (/https?:\/\//.exec(path)) {
                    this.realComponentProps = { nvUrl: path }
                    return 'nv-iframe'
                } else {
                    const match = this.$router.match(path)
                    console.log(match)
                    const { matched, params } = match
                    const { components } = matched[matched.length - 1]

                    this.realComponentProps = {
                        'is-Daynamic': true,
                        nvProps: params
                    }

                    return components.default || components
                }
            }
            
        },
        // realComponentProps () {
        //     const self = this
        //     const { currentTab } = self
        //     const { path } = currentTab
        // 	if (/https?:\/\//.exec(path)) {
        //         return {
        //             nvUrl : path,
        //             ...currentTab.query
        //         }
        //     } else {

        //     }
        // }
    }
}