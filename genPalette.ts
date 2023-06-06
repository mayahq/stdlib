import { stdpath } from './deps.ts'
import { stdfs } from './dev_deps.ts'
import { getManifest, getManifestPath } from './utils/basePath.ts'

const basePath = getManifestPath()
const manifest = getManifest()
const symbolsPath = stdpath.join(basePath, 'symbols')

function getProcedureDefFromClass(procClass: any, dirname: string) {
    console.log(procClass.schema.editorProperties)
    const inputSchema = procClass.schema.inputSchema
    const inputs: any[] = [
        { name: 'pulse', type: 'basepulse' },
    ]
    Object.keys(inputSchema).forEach((inputName) => {
        const input = inputSchema[inputName]
        inputs.push({
            name: inputName,
            displayName: input.displayName,
            choices: input.choices,
            allowLink: input.allowLink === undefined ? true : input.allowLink,
            type: 'string',
        })
    })

    const outputSchema = procClass.schema.outputSchema
    const outputs = []
    const pulseOutputIsCustom = Object.values(outputSchema).some((out: any) => out.type === 'pulse')
    Object.keys(outputSchema).forEach((outputName) => {
        const output = outputSchema[outputName]
        outputs.push({
            name: outputName,
            displayName: output.displayName,
            type: output.type,
            linkType: output.type,
        })
    })

    /**
     * If no pulse output is specified, add a default pulse
     * output
     */
    if (!pulseOutputIsCustom) {
        outputs.push({
            name: 'pulse',
            displayName: 'Pulse out',
            type: 'pulse',
            linkType: 'pulse',
        })
    }

    const repo = manifest.repository
    const pathname = new URL(repo).pathname
    return {
        type: `gh:${pathname.substring(1)}/${dirname}`,
        paletteLabel: procClass.schema.editorProperties.paletteLabel,
        inputs,
        outputs,
    }
}

async function getPalette() {
    const Palette = []
    const entries = stdfs.walkSync(symbolsPath)
    for (const entry of entries) {
        if (!entry.isDirectory || entry.path.endsWith('/symbols')) {
            continue
        }

        // console.log(entry.name, entry.path)
        const procedureClassPath = stdpath.join(entry.path, `${entry.name}.ts`)
        const procClass = await import(procedureClassPath)
        // console.log(procClass)

        const procDef = getProcedureDefFromClass(procClass.default, entry.name)
        Palette.push(procDef)
    }

    return Palette
}

const result = await getPalette()
// console.log('result', result)
Deno.writeTextFileSync(
    stdpath.join(basePath, 'palette.json'),
    JSON.stringify(result, null, 4),
)
