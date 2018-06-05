import { mapState } from 'vuex'
const component = {
    name: 'HomeContainer',
    meta: { nvPermission: false },
    data () {
        return {
            isloaded: false
        }
    },
    beforeRouteEnter (to, from, next) {
        return next(vm => {
            const homePath = '/home/' + vm.home || 'index'
            nenv.pageLoader.loadPage(homePath).then(() => {
                vm.isloaded = true
            }).catch(() => {
                vm.isloaded = true
            })
        })
    },
    computed: {
        homeComponent () {
            const self = this
            const { flatRoutes } = nenv
            const homePath = '/home/' + self.home || 'index'
            return (flatRoutes.find(item => item.path === homePath) || {}).component
        },
        ...mapState('user', {
            home: state => state.home
        })
    },
    render (h) {
        return this.isloaded ? h(this.homeComponent) : null
    }
}

const store = {
    
}

export const router = component

// export const router = {
//     path: '/',
//     redirect: '/home',
//     children: [{
//         path: '/home',
//         component,
//         meta: { nvPermission: false }
//     }]
// }

