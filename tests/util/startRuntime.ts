import { axios, FunctionalProgramDsl, stdpath } from '../../test_deps.ts'

const __dirname = stdpath.dirname(new URL(import.meta.url).pathname)
const runtimePathName = stdpath.join(__dirname, 'runtime.ts')

export const startRuntimeWithProgram = async (flow: FunctionalProgramDsl, showLogs = false) => {
    const command = new Deno.Command('deno', {
        args: ['run', '--allow-all', runtimePathName],
        stdout: showLogs ? undefined : 'null',
    })
    const output = command.spawn()

    const request = {
        url: 'http://localhost:9023/program/deploy',
        method: 'post',
        data: { program: flow },
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
        await axios(request)
    } catch (e) {
        console.log('error deploying flow', e.response.status, e.response.data)
        throw e
    }
    return async () => {
        await output.kill()
        // Give the OS some time to close the socket
        await new Promise((resolve) => setTimeout(resolve, 1000))
    }
}
