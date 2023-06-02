import { Symbol, TypedInput } from '../../deps.ts'

class ReadFile extends Symbol {
    static type = 'read-file'
    static description =
        'Function symbol to read a file from a given path and output its content as either a buffer or a string'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            filePath: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: '',
                label: 'File Path',
            }),
            outputType: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: 'string',
                label: 'Output Type',
                // choices: ['string', 'buffer'],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'brown',
            icon: '',
            paletteLabel: 'read-file',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
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
