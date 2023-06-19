import { Symbol, TypedInputTypes } from '../../deps.ts'

class DynamicFunction extends Symbol {
    static schema = {
        inputSchema: {
            body: {
                allowedTypes: ['procedure', 'pulse', 'string'] as TypedInputTypes[],
                description: 'The javascript code to execute, as a string.',
                displayName: 'Code',
                editorProperties: {
                    type: 'code',
                    language: 'javascript',
                },
            },
            input: {
                allowedTypes: ['procedure', 'pulse', 'string', 'number', 'boolean', 'json'] as TypedInputTypes[],
                description:
                    'The external input to provide the function, available as the variable `input` inside the code.',
                displayName: 'Input',
            },
        },
        outputSchema: {
            result: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The value that the code returns.',
                displayName: 'Result',
            },
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'function',
        },
    }

    call: Symbol['call'] = async (_, vals, callback, pulse) => {
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

        // console.log('result', result)
        return callback({ result })
    }
}

export default DynamicFunction
