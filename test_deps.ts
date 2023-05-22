export { assertEquals, assertStringIncludes } from 'https://deno.land/std@0.186.0/testing/asserts.ts'
export * as stdpath from 'https://deno.land/std@0.186.0/path/mod.ts'
export { default as axios } from 'npm:axios'

// export { FProgram, LocalStorage, Runtime } from '/Users/dushyant/Maya/pac-runtime/mod.ts'
// export type { FunctionalProgramDsl, FunctionalSymbolDsl } from '/Users/dushyant/Maya/pac-runtime/mod.ts'

export { FProgram, LocalStorage, Runtime } from 'https://deno.land/x/mayalabs_runtime@0.0.7/mod.ts'
export type { FunctionalProgramDsl, FunctionalSymbolDsl } from 'https://deno.land/x/mayalabs_runtime@0.0.7/mod.ts'
