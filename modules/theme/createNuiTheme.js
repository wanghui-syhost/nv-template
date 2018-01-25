import createPalette from './createPalette'

function createNuiTheme (options = {}) {
    const {
        palette: paletteInput = {},
        
    } = options

    const palette = createPalette()

    const nuiTheme = {
        direction: 'ltr',
        palette
    }

    return nuiTheme
}

export default createNuiTheme