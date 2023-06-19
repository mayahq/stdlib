import { Symbol, TypedInputTypes } from '../../deps.ts'

class Constant extends Symbol {
    static type = 'constant'
    static description = 'Function symbol to return the input value'
    static isConfig = false

    static schema = {
        inputSchema: {
            value: {
                allowedTypes: ['string', 'number', 'boolean', 'json'] as TypedInputTypes[],
                description: 'The constant value to send forward.',
                displayName: 'Value',
            },
        },
        outputSchema: {
            value: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The constant value sent forward.',
                displayName: '',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'yellow',
            icon: '',
            paletteLabel: 'constant',
        },
    }

    call: Symbol['call'] = async (_, vals, callback, _pulse) => {
        const { value } = vals
        callback({ value })
    }
}

export default Constant
