import { assertEquals, assertStringIncludes, FProgram } from '../../../test_deps.ts'
import { simpleHttpDsl } from './dsl.ts'

Deno.test('Http request symbol', async () => {
    const program = new FProgram({ dsl: simpleHttpDsl, rootNodeId: 'h1' })
    await program.deploy()

    const result = await program.run()
    assertEquals(result.status, 200)
    assertStringIncludes(result.data, '<html')
})
