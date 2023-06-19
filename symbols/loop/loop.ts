import { Schema, Symbol, TypedInputTypes } from '../../deps.ts'

const PULSE = 'pulse' as 'pulse' | 'eval'

class Loop extends Symbol {
    static type = 'loop'
    static description = 'Procedure to facilitate looping.'
    static isConfig = false

    static schema: Schema = {
        inputSchema: {
            condition: {
                allowedTypes: ['boolean', 'procedure', 'pulse'] as TypedInputTypes[],
                description: 'The condition to choose which output to send the pulse to.',
                displayName: 'Terminate?',
                defaultType: 'pulse',
                defaultValue: 'terminate',
            },
        },
        outputSchema: {
            continue: {
                type: PULSE,
                description: 'This pulse port will fire if the condition is true.',
                displayName: 'On continue',
            },
            terminate: {
                type: PULSE,
                description: 'This pulse port will fire if the condition is false.',
                displayName: 'On terminate',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'loop',
        },
    }

    call: Symbol['call'] = async (_, vals, callback, pulse) => {
        if (!vals.condition) {
            callback(pulse, 'continue')
        } else {
            callback(pulse, 'terminate')
        }
    }
}

export default Loop
