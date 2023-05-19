import { FunctionalProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const httpInPath = stdpath.join(basePath, 'symbols/http_in/http_in.ts')
const functionPath = stdpath.join(basePath, 'symbols/function/function.ts')

export const simpleHttpDsl: FunctionalProgramDsl = {
    'symbols': [
        {
            'id': 'f1',
            'label': 'f1',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: `hey` };',
                },
                'input': {
                    'type': 'string',
                    'value': 'bruh',
                },
            },
            'outputs': {},
            'children': {
                'in': [[]],
                'out': [],
                'symbols': [],
            },
        },
        {
            id: 'http1',
            label: 'http1',
            type: httpInPath,
            inputs: {
                path: {
                    type: 'string',
                    value: '/test',
                },
                method: {
                    type: 'string',
                    value: 'get',
                },
                payload: {
                    type: 'symbol',
                    symbolId: 'f1',
                    value: 'output',
                },
            },
            outputs: {},
            'children': {
                'in': [[]],
                'out': [],
                'symbols': [],
            },
        },
    ],
}
