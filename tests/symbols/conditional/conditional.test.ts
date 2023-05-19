import { assertEquals, FProgram, FunctionalProgramDsl } from '../../../test_deps.ts'
import { stdpath } from '../../../test_deps.ts'

const __dirname = stdpath.dirname(new URL(import.meta.url).pathname)

Deno.test('Conditional symbol', async () => {
    const dsl: FunctionalProgramDsl = JSON.parse(
        Deno.readTextFileSync(stdpath.join(__dirname, 'dsl.json')),
    )

    const trueProgram = new FProgram({ dsl, rootNodeId: 'if_1' })
    await trueProgram.deploy()
    const resultForTrue = await trueProgram.run()

    assertEquals(resultForTrue, 1)

    const conditionIdx = dsl.symbols.findIndex((s) => s.id === 'f3')
    dsl.symbols[conditionIdx].inputs['body'].value = `return { value: false };`

    const falseProgram = new FProgram({ dsl, rootNodeId: 'if_1' })
    await falseProgram.deploy()
    const resultForFalse = await falseProgram.run()

    assertEquals(resultForFalse, 2)
})
