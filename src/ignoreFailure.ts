export function ignoreFailure<T>(promise: Promise<T>): Promise<T>
export function ignoreFailure<T>(fn: () => T): T
export function ignoreFailure(fnOrPromise) {
  if (!fnOrPromise) return fnOrPromise

  if (typeof fnOrPromise === 'function')
    try { return noReject(fnOrPromise()) } catch { }
  else
    return noReject(fnOrPromise)
}

function noReject(maybePromise) {
  if (!maybePromise) return maybePromise

  if (typeof maybePromise.then === 'function') {
    return maybePromise.then(x => x, x => undefined)
  }
  return maybePromise
}
