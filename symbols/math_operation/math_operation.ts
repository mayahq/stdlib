import { Symbol, TypedInput } from '../../deps.ts'

class MathOperation extends Symbol {
    static type = 'math-operation'
    static description = 'Function symbol to perform a specified math operation on two numbers'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            num1: new TypedInput({
                type: 'number',
                allowedTypes: ['symbol', 'number'],
                defaultValue: 0,
                label: 'Number 1',
            }),
            num2: new TypedInput({
                type: 'number',
                allowedTypes: ['symbol', 'number'],
                defaultValue: 0,
                label: 'Number 2',
            }),
            operation: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: 'add',
                label: 'Operation',
                // choices: ['add', 'subtract', 'multiply', 'divide', 'modulo', 'exponentiate'],
            }),
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

        callback({ result })
    }
}

export default MathOperation
