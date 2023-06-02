import { Symbol, TypedInput } from '../../deps.ts'

class Inject extends Symbol {
    static description = 'Inject procedure to trigger flows remotely and from the editor.'
    static isConfig = false
    static type = 'inject'

    static schema = {
        propertiesSchema: {
            payload: new TypedInput({
                type: 'json',
                allowedTypes: ['json', 'string', 'number', 'boolean'],
            }),
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'inject',
        },
    }

    init: Symbol['init'] = async (runner, callback) => {
        this.runtime.addHttpRoute('post', `/inject/${this.id}`, async (ctx) => {
            const payload = runner.evaluateProperty('payload')
            const reqBody = await ctx.request.body().value
            console.log('Received message:', reqBody)
            const msg = {
                _id: Date.now().toString(36),
                payload: payload,
            }
            callback(msg)

            ctx.response.status = 200
        })
    }

    onMessage: Symbol['call'] = async () => {
        return
    }
}

export default Inject
