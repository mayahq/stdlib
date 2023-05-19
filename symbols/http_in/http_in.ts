import { Symbol, TypedInput } from '../../deps.ts'

class HttpIn extends Symbol {
    static type = 'http-request'
    static description = 'Function symbol to make HTTP Requests'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            path: new TypedInput({
                type: 'string',
                allowedTypes: ['string'],
                defaultValue: '/base',
                label: 'Path',
            }),
            method: new TypedInput({
                type: 'string',
                allowedTypes: ['string', 'symbol'],
                defaultValue: 'post',
                label: 'Method',
            }),
            payload: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string', 'json'],
                defaultValue: 'hello world!',
                label: 'HTTP Verb',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'http-request',
        },
    }

    init: Symbol['init'] = async (runner) => {
        const [path, method] = await Promise.all([
            runner.evaluateProperty('path'),
            runner.evaluateProperty('method'),
        ])

        this.runtime.addHttpRoute(method, path, async (ctx) => {
            const args = {
                httpRequest: {
                    body: ctx.request.body().value,
                    params: ctx.params,
                    query: ctx.request.url.searchParams,
                    url: ctx.request.url,
                    headers: ctx.request.headers,
                },
            }
            const result = await runner.evaluateProperty('payload', args)
            ctx.response.status = 200
            ctx.response.body = result
        })
    }
}

export default HttpIn
