import { Symbol, TypedInputTypes } from '../../deps.ts'

class Comparison extends Symbol {
    static type = 'comparison'
    static description = 'Function symbol to perform a specified comparison operation on two values'
    static isConfig = false

    static schema = {
        inputSchema: {
            operation: {
                allowedTypes: ['pulse', 'procedure', 'string'] as TypedInputTypes[],
                description: 'The comparison operation to perform.',
                displayName: 'Operation',
                choices: ['==', '!=', '<', '<=', '>', '>='],
            },
            val1: {
                allowedTypes: ['eval', 'pulse', 'number', 'string'] as TypedInputTypes[],
                description: 'First operand for comparison.',
                displayName: 'Value 1',
            },
            val2: {
                allowedTypes: ['eval', 'pulse', 'number', 'string'] as TypedInputTypes[],
                description: 'First operand for comparison.',
                displayName: 'Value 2',
            },
        },
        outputSchema: {
            result: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The result of the comparison (true or false)',
            },
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
