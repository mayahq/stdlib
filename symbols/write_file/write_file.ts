import { Symbol, TypedInput } from '../../deps.ts'

class WriteFile extends Symbol {
    static type = 'write-file'
    static description = 'Function symbol to write a given input to a file at a specified path'
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
            fileContent: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: '',
                label: 'File Content',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'brown',
            icon: '',
            paletteLabel: 'write-file',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { filePath, fileContent } = vals

        let dataToWrite
        if (typeof fileContent === 'string') {
            const encoder = new TextEncoder()
            dataToWrite = encoder.encode(fileContent)
        } else if (fileContent instanceof Uint8Array) {
            dataToWrite = fileContent
        } else {
            throw new Error('Invalid file content type. Only string and buffer are supported.')
        }

        await Deno.writeFile(filePath, dataToWrite)
        callback({ success: true })
    }
}

export default WriteFile
