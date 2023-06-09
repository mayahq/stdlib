import { Symbol, TypedInputTypes } from '../../deps.ts'

class Debug extends Symbol {
    static schema = {
        inputSchema: {
            value: {
                allowedTypes: ['procedure', 'pulse'] as TypedInputTypes[],
                description: 'The constant value to log at the client.',
                displayName: 'Value',
            },
        },
        outputSchema: {
            value: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The same value sent forward.',
                displayName: '',
            },
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'green',
            paletteLabel: 'debug',
        },
    }

    call: Symbol['call'] = async (_, vals, callback, pulse) => {
        const result = {
            value: vals.value,
            timestamp: Date.now(),
            sourceProcedure: this.id,
            pulse: pulse,
        }
        this.runtime.comms.broadcast({
            event: 'debug',
            data: result,
        })

        return callback(pulse)
    }
}

export default Debug
