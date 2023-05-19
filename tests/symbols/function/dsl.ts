import { FunctionalProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const functionPath = stdpath.join(basePath, 'symbols/function/function.ts')

export const simpleFunctionDsl: FunctionalProgramDsl = {
    'symbols': [
        {
            'id': 'f1',
            'label': 'f1',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: 1 };',
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
            'id': 'f2',
            'label': 'f2',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: input * 2 }',
                },
                'input': {
                    'type': 'symbol',
                    'symbolId': 'f1',
                    'value': 'output',
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
            'id': 'f3',
            'label': 'f3',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: input * 2 }',
                },
                'input': {
                    'type': 'symbol',
                    'symbolId': 'f2',
                    'value': 'output',
                },
            },
            'outputs': {},
            'children': {
                'in': [[]],
                'out': [],
                'symbols': [],
            },
        },
    ],
}

export const dynamicFunctionDsl: FunctionalProgramDsl = {
    'symbols': [
        {
            'id': 'f1',
            'label': 'f1',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: 1, function: `return { output: input * 3 }` };',
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
            'id': 'f2',
            'label': 'f2',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'string',
                    'value': 'return { output: 2 }',
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
            'id': 'f3',
            'label': 'f3',
            'type': functionPath,
            'inputs': {
                'body': {
                    'type': 'symbol',
                    'symbolId': 'f1',
                    'value': 'function',
                },
                'input': {
                    'type': 'symbol',
                    'symbolId': 'f2',
                    'value': 'output',
                },
            },
            'outputs': {},
            'children': {
                'in': [[]],
                'out': [],
                'symbols': [],
            },
        },
    ],
}
