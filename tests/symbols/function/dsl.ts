import { FunctionalProgramDsl, ProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const functionPath = `File://${stdpath.join(basePath, 'symbols/function/function.ts')}`

// export const simpleFunctionDsl: FunctionalProgramDsl = {
//     'symbols': [
//         {
//             'id': 'f1',
//             'label': 'f1',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'string',
//                     'value': 'return { output: 1 };',
//                 },
//                 'input': {
//                     'type': 'string',
//                     'value': 'bruh',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//         {
//             'id': 'f2',
//             'label': 'f2',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'string',
//                     'value': 'return { output: input * 2 }',
//                 },
//                 'input': {
//                     'type': 'symbol',
//                     'symbolId': 'f1',
//                     'value': 'output',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//         {
//             'id': 'f3',
//             'label': 'f3',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'string',
//                     'value': 'return { output: input * 2 }',
//                 },
//                 'input': {
//                     'type': 'symbol',
//                     'symbolId': 'f2',
//                     'value': 'output',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//     ],
// }

// export const dynamicFunctionDsl: FunctionalProgramDsl = {
//     'symbols': [
//         {
//             'id': 'f1',
//             'label': 'f1',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'string',
//                     'value': 'return { output: 1, function: `return { output: input * 3 }` };',
//                 },
//                 'input': {
//                     'type': 'string',
//                     'value': 'bruh',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//         {
//             'id': 'f2',
//             'label': 'f2',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'string',
//                     'value': 'return { output: 2 }',
//                 },
//                 'input': {
//                     'type': 'string',
//                     'value': 'bruh',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//         {
//             'id': 'f3',
//             'label': 'f3',
//             'type': functionPath,
//             'inputs': {
//                 'body': {
//                     'type': 'symbol',
//                     'symbolId': 'f1',
//                     'value': 'function',
//                 },
//                 'input': {
//                     'type': 'symbol',
//                     'symbolId': 'f2',
//                     'value': 'output',
//                 },
//             },
//             'outputs': {},
//             'children': {
//                 'in': [[]],
//                 'out': [],
//                 'symbols': [],
//             },
//         },
//     ],
// }

export const hybridFunctionDsl: ProgramDsl = {
    procedures: {
        '4': {
            id: '4',
            type: functionPath,
            inputs: {
                body: { type: 'string', value: 'return { myValue: 3 };' },
                input: { type: 'string', value: '' },
            },
            pulseNext: {
                // output: [{ type: 'procedure_input', procedureId: '2' }],
            },
        },
        '1': {
            id: '1',
            type: functionPath,
            inputs: {
                body: { type: 'string', value: 'return { myValue: input * 6 };' },
                input: { type: 'procedure', id: '4', value: 'myValue', portName: '' },
            },
            pulseNext: {
                // output: [{ type: 'procedure_input', procedureId: '2' }],
            },
        },
        '2': {
            id: '2',
            type: functionPath,
            inputs: {
                body: { type: 'string', value: 'return { myValue: input * 2 }' },
                input: { type: 'procedure', id: '1', value: 'myValue', portName: '' },
            },
            pulseNext: {
                output: [{ type: 'procedure_input', procedureId: '3' }],
            },
        },
        '3': {
            id: '3',
            type: functionPath,
            inputs: {
                body: { type: 'string', value: 'return { myValue: pulse.myValue * 3 }' },
                input: { type: 'string', value: '' },
            },
            pulseNext: {},
        },
    },
}
