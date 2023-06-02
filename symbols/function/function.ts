import { Symbol, TypedInput } from '../../deps.ts'

class DynamicFunction extends Symbol {
    static schema = {
        propertiesSchema: {
            body: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
            }),
            input: new TypedInput({
                type: 'pulse',
                allowedTypes: ['symbol', 'pulse', 'json'],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'function',
        },
    }

    call: Symbol['call'] = async (vals, callback, pulse) => {
        const body = vals.body
        const input = vals.input || 'none'
        const code = `
        (function({ input }) {
            ${body}
        })
        `
        // console.log('running with input', input)
        const fn = eval(code)
        const result = await fn({ input, vals, pulse })
        return callback(result)
    }
}

export default DynamicFunction
