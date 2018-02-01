const name = 'layout'

export const types = {
  ADD_TAB_TO_GROUP: 'ADD_TAB_TO_GROUP',
  REMOVE_TAB_FROM_GROUP: 'REMOVE_TAB_FROM_GROUP',
  CHANGE_TAB_GROUP: 'CHANRGE_TAB_GROUP',
  CHANGE_LIMIT_WIDTH: 'LIMIT_WIDTH'
}

const store = {
  name,
  // namespaced: true,
  state: {
    // 是否展开布局
    isWithLimited: true,
    // 当前页面tab
    currentTabs: [],
    // 所有页面的tab
    tabsMap: {}
  },
  mutations: {
    [types.ADD_TAB_TO_GROUP]: (state, tab) => {
      const tabParam = {
        name: tab.name,
        path: tab.path
      }
      console.log(state)
      console.log(state.currentTabs.entries())
      if (!state.currentTabs.some(val => val.path === tab.path)) {
        state.currentTabs.push(tabParam)
      }
    },
    [types.REMOVE_TAB_FROM_GROUP]: (state, tab) => {
      function removeTabFromGroup(i) {
        return state.currentTabs.splice(i, 1)
      }

      let i = 0;
      for (i; i < state.currentTabs.length; i++) {
        if (state.currentTabs[i].path === tab.path) {
          return removeTabFromGroup(i)
        }
      }
    },
    [types.CHANGE_TAB_GROUP]: (state, groupParam) => {
      const { group, oldGroup } = groupParam
      state.tabsMap[oldGroup.path] = state.currentTabs
      state.currentTabs = state.tabsMap[group.path] || []
    },
    [types.CHANGE_LIMIT_WIDTH]: (state) => {
      state.isWithLimited = !state.isWithLimited
    }
  },
  actions: {
    // 添加tab至当前组
    addTabToGroup: ({ commit }, tabParam) => {
      commit(types.ADD_TAB_TO_GROUP, tabParam)
    },
    // 从当前组删除tab
    removeTabFromGroup: ({ commit }, tabParam) => {
      commit(types.REMOVE_TAB_FROM_GROUP, tabParam)
    },
    // 切换tab组
    changeTabGroup: ({ commit }, groupParam) => {
      commit(types.CHANGE_TAB_GROUP, groupParam)
    },
    changeLimitWidth: ({ commit, state }) => {
      commit(types.CHANGE_LIMIT_WIDTH, !state.isWithLimited)
    }
  }
}

export default store
