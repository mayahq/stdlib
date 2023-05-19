import { startRuntimeWithProgram } from '../../util/startRuntime.ts'
import { simpleHttpDsl } from './dsl.ts'
import { assertEquals, axios } from '../../../test_deps.ts'

Deno.test('Http_in symbol', async () => {
    const kill = await startRuntimeWithProgram(simpleHttpDsl)

    const request = {
        method: 'get',
        url: 'http://localhost:9023/dynamic/test',
    }

    const response = await axios(request)
    assertEquals(response.data, 'hey')

    await kill()
})
