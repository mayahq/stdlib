import { Schema, Symbol, TypedInputTypes } from '../../deps.ts'

class Change extends Symbol {
    static type = 'change'
    static description = 'Function symbol to set arbitrary properties on the pulse'
    static isConfig = false

    static schema: Schema = {
        inputSchema: {
            destProperty: {
                allowedTypes: ['string'],
                description: 'The property to change',
                displayName: 'Destination',
            },
            sourceProperty: {
                allowedTypes: ['procedure', 'pulse', 'string', 'number', 'boolean', 'json'],
                description: 'The property to assign',
                displayName: 'To',
            },
        },
        outputSchema: {
            result: {
                type: 'pulse',
                description: 'Outgoing pulse to forward the message',
                displayName: 'Result',
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
        _pulse![vals.destProperty] = vals.sourceProperty
        return callback({}, 'result')
    }
}

export default Change
