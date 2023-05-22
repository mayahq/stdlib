import { FunctionalProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const injectPath = stdpath.join(basePath, 'symbols/inject/inject.ts')
const debugPath = stdpath.join(basePath, 'symbols/debug/debug.ts')

export const simpleInjectDebugDsl: FunctionalProgramDsl = {
    'symbols': [
        {
            'id': 'in123',
            'label': 'inject1',
            'type': injectPath,
            'inputs': {
                'trigger': {
                    'type': 'symbol',
                    'symbolId': 'debug1',
                    'value': 'value',
                },
                'payload': {
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
            id: 'debug1',
            label: 'debug1',
            type: debugPath,
            inputs: {
                payload: {
                    type: 'json',
                    value: {
                        name: 'dusnat',
                        age: 22,
                    },
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
