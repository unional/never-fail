import t from 'assert'
import nf, { neverFail } from '.';

test('export as named and default', () => {
  t.strictEqual(nf, neverFail)
})

test('return non-funcion and promise', () => {
  const x = { then: 1 }
  t.strictEqual(nf(x), x)
  t.strictEqual(nf(1), 1)
  t.strictEqual(nf(undefined), undefined)
  t.strictEqual(nf(null), null)
  t.strictEqual(nf(false), false)
  t.strictEqual(nf(true), true)
  t.strictEqual(nf('a'), 'a')
})

test('execute normal function', async () => {
  let called = 0
  function foo() { called++ }

  await neverFail(foo)
  await neverFail(() => called++)
  t.strictEqual(called, 2)
})

test('wrap returned promise', async () => {
  function go() { return new Promise(a => setImmediate(() => a('go'))) }

  t.strictEqual(await nf(go), 'go')
})

test('ignore rejected result', async () => {
  function thw() { return new Promise((a, r) => setImmediate(() => r('thw'))) }
  t.strictEqual(await nf(thw), undefined)
})

test('not reject when fn throws', async () => {
  t.strictEqual(await neverFail(() => { throw new Error('throwing') }), undefined)
})

test('not reject when promise rejects', async () => {
  t.strictEqual(await neverFail(Promise.reject('reject')), undefined)
})
