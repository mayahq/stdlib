import { Symbol, TypedInput } from '../../deps.ts'

class Comparison extends Symbol {
    static type = 'comparison'
    static description = 'Function symbol to perform a specified comparison operation on two values'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            val1: new TypedInput({
                type: 'number',
                allowedTypes: ['symbol', 'number', 'string'],
                defaultValue: 0,
                label: 'Value 1',
            }),
            val2: new TypedInput({
                type: 'number',
                allowedTypes: ['symbol', 'number', 'string'],
                defaultValue: 0,
                label: 'Value 2',
            }),
            operation: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: '===',
                label: 'Operation',
                // choices: ['==', '!=', '<', '<=', '>', '>='],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'orange',
            icon: '',
            paletteLabel: 'comparison',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { val1, val2, operation } = vals

        if (typeof val1 === 'string' || typeof val2 === 'string') {
            if (operation !== '===' && operation !== '!==') {
                throw new Error('Only equality/inequality checks are allowed for strings.')
            }
        }

        let result
        switch (operation) {
            case '==':
                result = val1 === val2
                break
            case '!=':
                result = val1 !== val2
                break
            case '<':
                result = val1 < val2
                break
            case '<=':
                result = val1 <= val2
                break
            case '>':
                result = val1 > val2
                break
            case '>=':
                result = val1 >= val2
                break
            default:
                throw new Error('Invalid operation.')
        }

        callback({ result })
    }
}

export default Comparison
