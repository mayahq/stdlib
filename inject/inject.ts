import { Symbol, TypedInput } from '../deps.ts'

class Inject extends Symbol {
    schema = {
        propertiesSchema: {
            payload: new TypedInput({
                type: 'str',
                allowedTypes: ['bool', 'json', 'num', 'bin'],
                defaultValue: 'bruh',
                label: 'Payload',
            }),
        },
    }

    onInit: Symbol['onInit'] = async (sendMessage) => {
        this.runtime.dynamicRouter.post(`/inject/${this.id}`, (ctx) => {
            const payload = Inject.schema.propertiesSchema.payload.evaluateField(this, 'payload', {})
            console.log('Received message:', ctx.request.body())
            const msg = {
                _id: Date.now().toString(36),
                payload: payload,
            }
            sendMessage(msg)
            ctx.response.status = 200
        })
    }

    onMessage: Symbol['onMessage'] = async () => {
        return
    }
}

export default Inject
