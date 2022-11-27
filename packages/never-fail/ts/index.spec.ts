import t from 'assert'
import nf, { neverFail } from './index.js';
import { ignoreFailure } from './ignoreFailure.js';

test('export as named and default', () => {
  t.strictEqual(nf, neverFail)
})

test('neverFail is alias of ignoreFailure', () => {
  t.strictEqual(neverFail, ignoreFailure)
})
