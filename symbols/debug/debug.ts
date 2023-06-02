import { Symbol, TypedInput } from '../../deps.ts'

class Debug extends Symbol {
    static schema = {
        propertiesSchema: {
            payload: new TypedInput({
                type: 'symbol',
                allowedTypes: ['symbol', 'lambda_input'],
                defaultValue: 'payload',
                label: 'Value',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'green',
            paletteLabel: 'debug',
        },
    }

    call: Symbol['call'] = async (vals, callback, pulse) => {
        const result = vals.payload
        this.runtime.comms.broadcast({
            event: 'debug',
            data: result,
        })

        return callback(pulse)
    }
}

export default Debug
