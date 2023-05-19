import { Symbol, TypedInput } from '../deps.ts'

class Debug extends Symbol {
    static schema = {
        propertiesSchema: {
            payload: new TypedInput({
                type: 'msg',
                allowedTypes: ['msg'],
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

    onMessage: Symbol['onMessage'] = async (_msg, vals, _) => {
        console.log("🚀 ~ file: debug.ts:22 ~ Debug ~ onMessage:Symbol['onMessage']= ~ vals:", vals)
        console.log("🚀 ~ file: debug.ts:22 ~ Debug ~ onMessage:Symbol['onMessage']= ~ _msg:", _msg)
        this.runtime.comms.broadcast({
            event: 'debug',
            data: _msg,
        })
    }
}

export default Debug
