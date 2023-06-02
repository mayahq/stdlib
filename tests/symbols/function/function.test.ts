import { assertEquals, FProgram, Program } from '../../../test_deps.ts'
// import { dynamicFunctionDsl, simpleFunctionDsl } from './dsl.ts'
import { hybridFunctionDsl } from './dsl.ts'

Deno.test('Function symbol', async (t) => {
    // await t.step('Runs with static function body', async () => {
    //     const program = new FProgram({ dsl: simpleFunctionDsl, rootNodeId: 'f3' })
    //     await program.deploy()

    //     const result = await program.run()
    //     assertEquals(result.output, 4)
    // })

    // await t.step('Runs with dynamic function body', async () => {
    //     const program = new FProgram({ dsl: dynamicFunctionDsl, rootNodeId: 'f3' })
    //     await program.deploy()

    //     const result = await program.run()
    //     assertEquals(result.output, 6)
    // })

    await t.step('Run functional flow', async () => {
        const program = new Program({ dsl: hybridFunctionDsl })
        await program.deploy()

        const e = new CustomEvent('pulse', {
            detail: {
                pulse: {},
                metadata: {
                    sender: '0',
                    timestamp: Date.now(),
                },
                destination: '1',
            },
        })

        program.hub.dispatchEvent(e)
        await new Promise((r) => setTimeout(r, 3000))
    })
})
