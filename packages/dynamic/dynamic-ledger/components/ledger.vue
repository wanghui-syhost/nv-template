<template>
  <div class="nv-ledger " :class="nvCode.toLowerCase()">
      <el-menu>
        <el-submenu index = "2">
            
        </el-submenu>

        <el-menu-item index="1">
            <span slot="title"> fff </span>
        </el-menu-item>
      </el-menu>
      <div v-for = "menu in menus" :key = "menu.ID">
          <a>{{ menu.NAME }}</a>
      </div>
  </div>
</template>
<script>
export default {
    name: 'NvDynamicLedger',
    props:{
        nvUrl: {
            default: '/ledger/menus'
        },
        nvCode : {
            type: String,
            required: true
        }
    },
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
                self.menus = data
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>


