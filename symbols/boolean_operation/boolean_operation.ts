import { Symbol, TypedInput, TypedInputTypes } from '../../deps.ts'

class BooleanOperation extends Symbol {
    static type = 'boolean-operation'
    static description = 'Function symbol to perform a specified boolean operation on two values'
    static isConfig = false

    static schema = {
        inputSchema: {
            operation: {
                allowedTypes: ['pulse', 'procedure', 'string'] as TypedInputTypes[],
                description: 'The boolean operation to perform.',
                displayName: 'Operation',
                choices: ['and', 'or', 'not'],
            },
            val1: {
                allowedTypes: ['eval', 'pulse', 'boolean'] as TypedInputTypes[],
                description: 'First operand for comparison.',
                displayName: 'Value 1',
            },
            val2: {
                allowedTypes: ['eval', 'pulse', 'boolean'] as TypedInputTypes[],
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
            color: 'purple',
            icon: '',
            paletteLabel: 'boolean-operation',
        },
    }

    call: Symbol['call'] = async (_ctx, vals, callback, _pulse) => {
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
