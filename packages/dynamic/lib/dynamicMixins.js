export default {
    data() {
        return {
            currentTab: {},
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
        	if (/https?:\/\//.exec(path)) {
                return 'nv-iframe'
            } else {
                for (let flatRoute of flatRoutes) {
                    if (flatRoute.path === path) {
                        return flatRoute.component
                    }
                }
            }
            
        },
        realComponentProps () {
            const self = this
            const { currentTab } = self
            const { path } = currentTab
        	if (/https?:\/\//.exec(path)) {
                return {
                    nvUrl : path,
                    ...currentTab.query
                }
            } else {

            }
        }
    }
}