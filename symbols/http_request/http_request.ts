import { axios, Symbol, TypedInputTypes } from '../../deps.ts'

class HttpRequest extends Symbol {
    static type = 'http-request'
    static description = 'Function symbol to make HTTP Requests'
    static isConfig = false

    static schema = {
        inputSchema: {
            httpVerb: {
                allowedTypes: ['procedure', 'pulse', 'string'] as TypedInputTypes[],
                description: 'The HTTP verb (GET, POST, etc.)',
                choices: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                displayName: 'Method',
            },
            url: {
                allowedTypes: ['procedure', 'pulse', 'string'] as TypedInputTypes[],
                description: 'The request URL',
                displayName: 'URL',
            },
            headers: {
                allowedTypes: ['procedure', 'pulse', 'json'] as TypedInputTypes[],
                description: 'The request headers (as a JSON object).',
                displayName: 'Headers',
            },
            body: {
                allowedTypes: ['procedure', 'pulse', 'string', 'number', 'boolean', 'json'] as TypedInputTypes[],
                description: 'The request body.',
                displayName: 'Body',
            },
        },
        outputSchema: {
            data: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The response body.',
                displayName: 'Response body',
            },
            status: {
                type: 'eval' as 'pulse' | 'eval',
                description: 'The response status.',
                displayName: 'Response status',
            },
        },
        editorProperties: {
            category: 'stdlib',
            color: 'green',
            icon: '',
            paletteLabel: 'http-request',
        },
    }

    call: Symbol['call'] = async (vals, callback, _pulse) => {
        const { httpVerb, url, headers, body } = vals

        const request = {
            url: url,
            method: httpVerb,
            headers: headers,
            body: body,
        }

        const response = await axios(request)
        callback({
            data: response.data,
            status: response.status,
        })
    }
}

export default HttpRequest
