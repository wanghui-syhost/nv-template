
import Dictionary from './components/dictionary.vue'
import DictionaryData from './components/dictionary-data.vue'
import Config from './components/config.vue'
import Portal from './portal/index.nenv.vue'
import Portal2 from './components/portal.vue'

const platform = window.platform

const { getLayout, loadPackage } = platform

export const router = {
  path: '/system/manage',
  component: getLayout('Frame'),
  name: '系统管理',
  key: 'f-system_manage',
  redirect: '/system/dictionary',
  children: [
    {
      path: '/system/dictionary',
      component: Dictionary,
      key: 'f-system_dictionary',
      name: '数据字典'
    },
    {
      path: '/system/dictionary/data',
      component: DictionaryData,
      key: 'f-system_dictionary_data',
      hidden: true,
    // 禁止生成tabTag 标签
      meta: { disableTabTag: true },
      name: '数据字典小类'
    },
    {
      path: '/system/config',
      component: Config,
      key: 'f-system_config',
      name: '系统配置'
    }

  ]

}
loadPackage({ router })