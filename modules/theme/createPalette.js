import deepmerge from 'deepmerge'
import common from './colors/common'

export const light = {}

export default function createPalette (palette = {}) {
    const { primary } = palette

    const paletteOutput = deepmerge(
        {
            common,
            primary
        },
        {

        }
    )

    return paletteOutput
}