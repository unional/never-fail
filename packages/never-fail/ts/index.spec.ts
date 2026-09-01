import t from 'node:assert'
import { test } from 'vitest'
import { ignoreFailure } from './ignoreFailure.js'
import nf, { neverFail } from './index.js'

test('export as named and default', () => {
	t.strictEqual(nf, neverFail)
})

test('neverFail is alias of ignoreFailure', () => {
	t.strictEqual(neverFail, ignoreFailure)
})
