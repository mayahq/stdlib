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

    call: Symbol['call'] = async (runner, args) => {
        const result = await runner.evaluateProperty('payload', args)
        this.runtime.comms.broadcast({
            event: 'debug',
            data: result,
        })
    }
}

export default Debug
