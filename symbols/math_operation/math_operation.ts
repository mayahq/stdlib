import { Symbol, TypedInputTypes } from '../../deps.ts'

class MathOperation extends Symbol {
    static type = 'math-operation'
    static description = 'Function symbol to perform a specified math operation on two numbers'
    static isConfig = false

    static schema = {
        inputSchema: {
            operation: {
                allowedTypes: ['pulse', 'procedure', 'string'] as TypedInputTypes[],
                description: 'The arithmetic operation to perform.',
                displayName: 'Operation',
                choices: ['add', 'subtract', 'multiply', 'divide', 'modulo', 'exponentiate'],
            },
            num1: {
                allowedTypes: ['eval', 'pulse', 'number', 'string'] as TypedInputTypes[],
                description: 'First number for operation.',
                displayName: 'Value 1',
            },
            num2: {
                allowedTypes: ['eval', 'pulse', 'number', 'string'] as TypedInputTypes[],
                description: 'Second number for operation.',
                displayName: 'Value 2',
            },
        },
        outputSchema: {
            result: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The result of the operation (true or false)',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'blue',
            icon: '',
            paletteLabel: 'math-operation',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { num1, num2, operation } = vals

        let result
        switch (operation) {
            case 'add':
                result = num1 + num2
                break
            case 'subtract':
                result = num1 - num2
                break
            case 'multiply':
                result = num1 * num2
                break
            case 'divide':
                if (num2 !== 0) {
                    result = num1 / num2
                } else {
                    throw new Error('Division by zero is undefined.')
                }
                break
            case 'modulo':
                result = num1 % num2
                break
            case 'exponentiate':
                result = Math.pow(num1, num2)
                break
            default:
                throw new Error('Invalid operation.')
        }

        callback({ mathResult: result })
    }
}

export default MathOperation
