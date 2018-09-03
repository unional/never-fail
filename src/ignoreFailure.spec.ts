import t from 'assert'
import { ignoreFailure } from '.';

test('return non-funcion and promise', () => {
  const x = { then: 1 }
  t.strictEqual(ignoreFailure(x), x)
  t.strictEqual(ignoreFailure(1), 1)
  t.strictEqual(ignoreFailure(undefined), undefined)
  t.strictEqual(ignoreFailure(null), null)
  t.strictEqual(ignoreFailure(false), false)
  t.strictEqual(ignoreFailure(true), true)
  t.strictEqual(ignoreFailure('a'), 'a')
})

test('execute normal function', async () => {
  let called = 0
  function foo() { called++ }

  await ignoreFailure(foo)
  await ignoreFailure(() => called++)
  t.strictEqual(called, 2)
})

test('wrap returned promise', async () => {
  function go() { return new Promise(a => setImmediate(() => a('go'))) }

  t.strictEqual(await ignoreFailure(go), 'go')
})

test('ignore rejected result', async () => {
  function thw() { return new Promise((a, r) => setImmediate(() => r('thw'))) }
  t.strictEqual(await ignoreFailure(thw), undefined)
})

test('not reject when fn throws', async () => {
  t.strictEqual(await ignoreFailure(() => { throw new Error('throwing') }), undefined)
})

test('not reject when promise rejects', async () => {
  t.strictEqual(await ignoreFailure(Promise.reject('reject')), undefined)
})
