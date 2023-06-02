import { Symbol, TypedInputTypes } from '../../deps.ts'

const PULSE = 'pulse' as 'pulse' | 'eval'

class Conditional extends Symbol {
    static type = 'if-else'
    static description = 'Function to evaluate conditionals'
    static isConfig = false

    static schema = {
        inputSchema: {
            condition: {
                allowedTypes: ['pulse', 'boolean'] as TypedInputTypes[],
                description: 'Boolean value based on which the procedure will choose one of the branches to execute.',
            },
        },
        outputSchema: {
            ifTrue: {
                type: PULSE,
                description: 'This pulse port will fire if the condition is true.',
                displayName: 'If true',
            },
            ifFalse: {
                type: PULSE,
                description: 'This pulse port will fire if the condition is false.',
                displayName: 'If false',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'conditional',
        },
    }

    call: Symbol['call'] = async (vals, callback, pulse) => {
        if (vals.condition) {
            callback(pulse, 'ifTrue')
        } else {
            callback(pulse, 'ifFalse')
        }
    }
}

export default Conditional
