import { Symbol, TypedInputTypes } from '../../deps.ts'

class Inject extends Symbol {
    static description = 'Inject procedure to trigger flows remotely and from the editor.'
    static isConfig = false
    static type = 'inject'

    static schema = {
        inputSchema: {
            payload: {
                allowedTypes: ['string', 'number', 'boolean', 'json'] as TypedInputTypes[],
                description: 'The constant value to send forward.',
                displayName: 'Value',
            },
        },
        outputSchema: {},
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'inject',
        },
    }

    init: Symbol['init'] = async (runnable, send, _pulse) => {
        this.runtime.addHttpRoute('post', `/inject/${this.id}`, async (ctx) => {
            const payload = runnable.evaluateProperty('payload')
            const reqBody = await ctx.request.body().value
            console.log('Received message:', reqBody)
            const msg = {
                _id: Date.now().toString(36),
                payload: payload,
            }
            send(msg)

            ctx.response.status = 200
        })
    }

    onMessage: Symbol['call'] = async () => {
        return
    }
}

export default Inject
