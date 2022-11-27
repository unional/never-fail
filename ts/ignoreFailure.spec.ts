import t from 'assert'
import { ignoreFailure } from './index.js'

test('return non-funcion and promise', () => {
  const x = { then: 1 }

  t.strictEqual(ignoreFailure(x as any), x)
  t.strictEqual(ignoreFailure(1 as any), 1)
  t.strictEqual(ignoreFailure(undefined as any), undefined)
  t.strictEqual(ignoreFailure(null as any), null)
  t.strictEqual(ignoreFailure(false as any), false)
  t.strictEqual(ignoreFailure(true as any), true)
  t.strictEqual(ignoreFailure('a' as any), 'a')
})

test('execute normal function', () => {
  let called = 0
  function foo() { called++ }

  ignoreFailure(foo)
  ignoreFailure(() => called++)
  t.strictEqual(called, 2)
})

test('wrap returned promise', async () => {
  function go() { return new Promise(a => setImmediate(() => a('go'))) }

  t.strictEqual(await ignoreFailure(go), 'go')
})

test('ignore rejected result', async () => {
  function thw() { return new Promise((_, r) => setImmediate(() => r('thw'))) }
  t.strictEqual(await ignoreFailure(thw), undefined)
})

test('not reject when fn throws', async () => {
  t.strictEqual(ignoreFailure(() => { throw new Error('throwing') }), undefined)
})

test('not reject when promise rejects', async () => {
  t.strictEqual(await ignoreFailure(Promise.reject('reject')), undefined)
})
