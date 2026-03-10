/**
 * Build output tests.
 *
 * Asserts that the dist/ directory and adjacent assets shipped with the package
 * contain everything consumers depend on. Run after `npm run build` via the
 * `test:build` script.
 *
 * Catching missing files here prevents broken published releases.
 */

import { existsSync } from 'fs'
import { resolve } from 'path'
import { describe, it, expect } from 'vitest'

const root = resolve(__dirname, '../../')

function exists(relativePath: string): boolean {
  return existsSync(resolve(root, relativePath))
}

describe('dist — JS entry points', () => {
  it('exports main ES bundle', () => {
    expect(exists('dist/index.es.js')).toBe(true)
  })

  it('exports main CJS bundle', () => {
    expect(exists('dist/index.cjs.js')).toBe(true)
  })

  it('exports components ES bundle', () => {
    expect(exists('dist/components/index.es.js')).toBe(true)
  })

  it('exports modal component', () => {
    expect(exists('dist/components/modal/index.es.js')).toBe(true)
  })

  it('exports toast component', () => {
    expect(exists('dist/components/toast/index.es.js')).toBe(true)
  })
})

describe('dist — CSS', () => {
  it('emits terra.css', () => {
    expect(exists('dist/terra.css')).toBe(true)
  })
})

describe('dist — TypeScript declarations', () => {
  it('emits root type declarations', () => {
    expect(exists('dist/types/index.d.ts')).toBe(true)
  })

  it('emits component type declarations', () => {
    expect(exists('dist/types/components/index.d.ts')).toBe(true)
  })
})

describe('assets — fonts', () => {
  it('includes Montserrat variable font (TTF)', () => {
    expect(exists('assets/fonts/montserrat/Montserrat-Variable-Font.ttf')).toBe(true)
  })

  it('includes Montserrat italic variable font (TTF)', () => {
    expect(exists('assets/fonts/montserrat/Montserrat-Variable-Italic-Font.ttf')).toBe(true)
  })
})
