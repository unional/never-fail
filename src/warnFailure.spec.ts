import t from 'assert'
import { warnFailure } from '.';

test('return non-funcion and promise', () => {
  const x = { then: 1 }
  t.strictEqual(warnFailure(x as any), x)
  t.strictEqual(warnFailure(1 as any), 1)
  t.strictEqual(warnFailure(undefined as any), undefined)
  t.strictEqual(warnFailure(null as any), null)
  t.strictEqual(warnFailure(false as any), false)
  t.strictEqual(warnFailure(true as any), true)
  t.strictEqual(warnFailure('a' as any), 'a')
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

test('custom message', async () => {
  t.strictEqual(await warnFailure(() => { throw new Error('throwing') }, 'doing x'), undefined)
})

test('custom message', async () => {
  t.strictEqual(await warnFailure(() => Promise.reject('reject'), 'doing x'), undefined)
})

test('custom message', async () => {
  t.strictEqual(await warnFailure(Promise.reject('reject'), 'doing x'), undefined)
})
