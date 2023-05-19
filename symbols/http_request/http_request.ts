import { axios, Symbol, TypedInput } from '../../deps.ts'

class HttpRequest extends Symbol {
    static type = 'http-request'
    static description = 'Function symbol to make HTTP Requests'
    static isConfig = false

    static schema = {
        inputSchema: {},
        outputSchema: {},
        propertiesSchema: {
            httpVerb: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: 'get',
                label: 'HTTP Verb',
            }),
            url: new TypedInput({
                type: 'string',
                allowedTypes: ['symbol', 'string'],
                defaultValue: '',
                label: 'URL',
            }),
            headers: new TypedInput({
                type: 'json',
                allowedTypes: ['json', 'symbol'],
                defaultValue: '{}',
                label: 'Headers',
            }),
            body: new TypedInput({
                type: 'json',
                allowedTypes: ['json', 'symbol'],
                defaultValue: '{}',
                label: 'Body',
            }),
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'http-request',
        },
    }

    call: Symbol['call'] = async (runner, args) => {
        const [httpVerb, url, headers, body] = await Promise.all([
            runner.evaluateProperty('httpVerb', args),
            runner.evaluateProperty('url', args),
            runner.evaluateProperty('headers', args),
            runner.evaluateProperty('body', args),
        ])

        const request = {
            url: url,
            method: httpVerb,
            headers: headers,
            body: body,
        }

        const response = await axios(request)
        return {
            data: response.data,
            status: response.status,
        }
    }
}

export default HttpRequest
