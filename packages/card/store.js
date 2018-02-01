export const name = 'nv-layout'
export const types = {
    CHANGE_LAYOUT: 'CHANGE_LAYOUT'
}
export default {
    name,
    state: {
        isCardLayout: false
    },
    mutations: {
        [types.CHANGE_LAYOUT] (state, layout) {
            state.isCardLayout = layout
        }
    },
    actions: {
        changeLayout  ({commit, state}) {
            commit(types.CHANGE_LAYOUT, !state.isCardLayout)
        }
    }
}