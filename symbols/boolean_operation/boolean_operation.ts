import { Symbol, TypedInput } from '../../deps.ts'

class BooleanOperation extends Symbol {
    static type = 'boolean-operation'
    static description = 'Function symbol to perform a specified boolean operation on two values'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            val1: new TypedInput({
                type: 'boolean',
                allowedTypes: ['symbol', 'boolean'],
                defaultValue: false,
                label: 'Value 1',
            }),
            val2: new TypedInput({
                type: 'boolean',
                allowedTypes: ['symbol', 'boolean'],
                defaultValue: false,
                label: 'Value 2',
            }),
            operation: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: 'and',
                label: 'Operation',
                // choices: ['and', 'or', 'not'],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'purple',
            icon: '',
            paletteLabel: 'boolean-operation',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { val1, val2, operation } = vals

        let result
        switch (operation) {
            case 'and':
                result = val1 && val2
                break
            case 'or':
                result = val1 || val2
                break
            case 'not':
                result = !val1
                break
            default:
                throw new Error('Invalid operation.')
        }

        callback({ result })
    }
}

export default BooleanOperation
