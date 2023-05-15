import { Symbol, TypedInput } from '../deps.ts'

class Inject extends Symbol {
    static schema = {
        propertiesSchema: {
            payload: new TypedInput({
                type: 'str',
                allowedTypes: ['bool', 'json', 'num', 'bin'],
                defaultValue: 'bruh',
                label: 'Payload',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            icon: '',
            color: 'red',
            paletteLabel: 'inject',
        },
    }

    onInit: Symbol['onInit'] = async (sendMessage) => {
        this.runtime.addHttpRoute('post', `/inject/${this.id}`, async (ctx) => {
            const payload = Inject.schema.propertiesSchema.payload.evaluateField(this, 'payload', {})
            const reqBody = await ctx.request.body().value
            console.log('Received message:', reqBody)
            const msg = {
                _id: Date.now().toString(36),
                payload: payload,
            }
            sendMessage(msg)

            ctx.response.status = 200
            ctx.response.body = {}
        })
    }

    onMessage: Symbol['onMessage'] = async () => {
        return
    }
}

export default Inject
