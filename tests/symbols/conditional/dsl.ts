import { ProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const functionPath = `File://${stdpath.join(basePath, 'symbols/function/function.ts')}`
const conditionalPath = `File://${stdpath.join(basePath, 'symbols/conditional/conditional.ts')}`

export const conditionalTestDsl: ProgramDsl = {
    procedures: {},
}

// export const conditionalTestDsl: ProgramDsl = {
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
//                     'value': 'return { output: 2 };',
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
//                     'type': 'string',
//                     'value': 'return { value: true };',
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
//             'id': 'if_1',
//             'label': 'if_1',
//             'type': conditionalPath,
//             'inputs': {
//                 'ifTrue': {
//                     'type': 'symbol',
//                     'symbolId': 'f1',
//                     'value': 'output',
//                 },
//                 'ifFalse': {
//                     'type': 'symbol',
//                     'symbolId': 'f2',
//                     'value': 'output',
//                 },
//                 'condition': {
//                     'type': 'symbol',
//                     'symbolId': 'f3',
//                     'value': 'value',
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
