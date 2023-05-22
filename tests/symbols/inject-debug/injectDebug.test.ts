import { startRuntimeWithProgram } from '../../util/startRuntime.ts'
import { simpleInjectDebugDsl } from './dsl.ts'
import { assertEquals, axios } from '../../../test_deps.ts'

type DebugEvent = {
    event: string
    data: any
}

Deno.test('Inject and debug', async (t) => {
    const kill = await startRuntimeWithProgram(simpleInjectDebugDsl)
    const request = {
        method: 'post',
        url: 'http://localhost:9023/dynamic/inject/in123',
    }

    const result: DebugEvent = await new Promise((resolve, reject) => {
        const ws = new WebSocket('ws://localhost:9023/socket')

        const timeout = setTimeout(() =>
            reject(
                new Error('Timeout while waiting for socket message from debug node'),
            ), 10_000)

        ws.onmessage = (e) => {
            resolve(JSON.parse(e.data))
            clearTimeout(timeout)
            ws.close()
        }

        ws.onopen = () => {
            axios(request)
        }
    })

    assertEquals(result.event, 'debug')
    assertEquals(result.data.name, 'dusnat')
    assertEquals(result.data.age, 22)
    await kill()
})
