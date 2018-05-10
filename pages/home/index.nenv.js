import { mapState } from 'vuex'
const component = {
    name: 'HomeContainer',
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
        return h(this.homeComponent)
    }
}

const store = {
    
}

export const router = {
    path: '/',
    redirect: '/home',
    children: [{
        path: '/home',
        component,
        meta: { nvPermisson: false }
    }]
}

