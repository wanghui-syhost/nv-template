import VueI18n from 'vue-i18n'

const messages = {
    zh: {
        common: {
            USER_NAME: '用户名2'
        }
    }
}


const i18n = new VueI18n({
    locale: 'zh',
    messages
})

nenv.loader({ i18n })