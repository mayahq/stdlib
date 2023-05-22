import { FunctionalProgramDsl, stdpath } from '../../../test_deps.ts'
import { getManifestPath } from '../../../utils/basePath.ts'

const basePath = getManifestPath()
const httpPath = `File://${stdpath.join(basePath, 'symbols/http_request/http_request.ts')}`

export const simpleHttpDsl: FunctionalProgramDsl = {
    'symbols': [
        {
            'id': 'h1',
            'label': 'h1',
            'type': httpPath,
            'inputs': {
                'httpVerb': {
                    'type': 'string',
                    'value': 'get',
                },
                'url': {
                    'type': 'string',
                    'value': 'https://google.com',
                },
                'headers': {
                    'type': 'json',
                    'value': {},
                },
                'body': {
                    'type': 'json',
                    'value': {},
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
