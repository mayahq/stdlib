import { Symbol, TypedInput } from '../../deps.ts'

class Conditional extends Symbol {
    static type = 'if-else'
    static description = 'Function to evaluate conditionals'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            ifTrue: new TypedInput({
                type: 'symbol',
                allowedTypes: ['symbol'],
                defaultValue: 'get',
                label: 'If true',
            }),
            ifFalse: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol'],
                defaultValue: '',
                label: 'Else',
            }),
            condition: new TypedInput({
                type: 'symbol',
                allowedTypes: ['boolean', 'symbol'],
                defaultValue: '{}',
                label: 'Headers',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'conditional',
        },
    }

    call: Symbol['call'] = async (runner, args) => {
        const condition = await runner.evaluateProperty('condition', args)
        if (condition && condition !== 0) {
            return await runner.evaluateProperty('ifTrue')
        } else {
            return await runner.evaluateProperty('ifFalse')
        }
    }
}

export default Conditional
