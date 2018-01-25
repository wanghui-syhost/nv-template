const { loader } = window.nenv

import createNuiTheme from './createNuiTheme'

const store = {
    name: 'module',
    state: createNuiTheme({})
}

loader({store})