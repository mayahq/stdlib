import { Symbol, TypedInputTypes } from '../../deps.ts'

class ReadFile extends Symbol {
    static type = 'read-file'
    static description =
        'Function symbol to read a file from a given path and output its content as either a buffer or a string'
    static isConfig = false

    static schema = {
        inputSchema: {
            filePath: {
                allowedTypes: ['procedure', 'pulse', 'string'] as TypedInputTypes[],
                description: 'The path of the file to read from.',
                displayName: 'File path',
            },
            outputType: {
                allowedTypes: ['procedure', 'pulse', 'string'] as TypedInputTypes[],
                description: 'The format of the output.',
                displayName: 'Output format',
            },
        },
        outputSchema: {
            fileContent: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The contents of the file read, in the specified format.',
                displayName: 'File content',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'brown',
            icon: '',
            paletteLabel: 'read-file',
        },
    }

    call: Symbol['call'] = async (_, vals, callback, _pulse) => {
        const { filePath, outputType } = vals

        const rawData = await Deno.readFile(filePath)

        let fileContent
        if (outputType === 'string') {
            const decoder = new TextDecoder('utf-8')
            fileContent = decoder.decode(rawData)
        } else if (outputType === 'buffer') {
            fileContent = rawData
        } else {
            throw new Error('Invalid output type.')
        }

        callback({ fileContent })
    }
}

export default ReadFile
