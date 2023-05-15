import { Symbol, TypedInput } from '../deps.ts'

class Inject extends Symbol {
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
        this.runtime.comms.broadcast({
            event: 'debug',
            data: vals.payload,
        })
    }
}

export default Inject
