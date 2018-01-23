import vuex from 'vuex'

export default {
    computed: {
        navs () {
            const self = this
            const { menus } =self
            return [{
              menuName: '首页',
              linkType: '1',
              linkUrl: '/home',
              menuId: 'home-home-home'
            }].concat(menus.filter((menu) => {
                return !menu.parentId
            }))
        },
        ...vuex.mapState('platform', {
            menus: state => state.menus
        }),
    }
}