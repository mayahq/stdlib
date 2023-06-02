import { Symbol, TypedInput } from '../../deps.ts'

class Constant extends Symbol {
    static type = 'constant'
    static description = 'Function symbol to return the input value'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            value: new TypedInput({
                type: 'string',
                allowedTypes: ['string', 'number', 'boolean', 'json'],
                defaultValue: '',
                label: 'Value',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'yellow',
            icon: '',
            paletteLabel: 'constant',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { value } = vals
        callback({ value: value })
    }
}

export default Constant
