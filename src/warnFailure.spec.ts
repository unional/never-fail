import t from 'assert'
import { warnFailure } from '.';

test('return non-funcion and promise', () => {
  const x = { then: 1 }
  t.strictEqual(warnFailure(x), x)
  t.strictEqual(warnFailure(1), 1)
  t.strictEqual(warnFailure(undefined), undefined)
  t.strictEqual(warnFailure(null), null)
  t.strictEqual(warnFailure(false), false)
  t.strictEqual(warnFailure(true), true)
  t.strictEqual(warnFailure('a'), 'a')
})

test('execute normal function', async () => {
  let called = 0
  function foo() { called++ }

  await warnFailure(foo)
  await warnFailure(() => called++)
  t.strictEqual(called, 2)
})

test('wrap returned promise', async () => {
  function go() { return new Promise(a => setImmediate(() => a('go'))) }

  t.strictEqual(await warnFailure(go), 'go')
})

test('ignore rejected result', async () => {
  function thw() { return new Promise((a, r) => setImmediate(() => r('thw'))) }
  t.strictEqual(await warnFailure(thw), undefined)
})

test('not reject when fn throws', async () => {
  t.strictEqual(await warnFailure(() => { throw new Error('throwing') }), undefined)
})

test('not reject when promise rejects', async () => {
  t.strictEqual(await warnFailure(Promise.reject('reject')), undefined)
})
