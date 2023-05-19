import { assertEquals, FProgram } from '../../../test_deps.ts'
import { dynamicFunctionDsl, simpleFunctionDsl } from './dsl.ts'

Deno.test('Function symbol', async (t) => {
    await t.step('Runs with static function body', async () => {
        const program = new FProgram({ dsl: simpleFunctionDsl, rootNodeId: 'f3' })
        await program.deploy()

        const result = await program.run()
        assertEquals(result.output, 4)
    })

    await t.step('Runs with dynamic function body', async () => {
        const program = new FProgram({ dsl: dynamicFunctionDsl, rootNodeId: 'f3' })
        await program.deploy()

        const result = await program.run()
        assertEquals(result.output, 6)
    })
})
