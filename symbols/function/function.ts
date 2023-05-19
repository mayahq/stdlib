import { Symbol, TypedInput } from '../../deps.ts'

class DynamicFunction extends Symbol {
    static schema = {
        propertiesSchema: {
            body: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
            }),
            input: new TypedInput({
                type: 'symbol',
                allowedTypes: ['symbol', 'string', 'number', 'boolean', 'json'],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'function',
        },
    }

    call: Symbol['call'] = async (runner) => {
        const body = await runner.evaluateProperty('body')
        const input = await runner.evaluateProperty('input')
        const code = `
        (function({ input }) {
            ${body}
        })
        `
        // console.log('running with input', input)
        const fn = eval(code)
        const result = fn({ input })
        return result
    }
}

export default DynamicFunction
