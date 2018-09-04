import { tersify } from 'tersify'

export function warnFailure<T>(promise: Promise<T>, message?: string): Promise<T>
export function warnFailure<T>(fn: () => T, message?: string): T
export function warnFailure(fnOrPromise, message?: string) {
  if (!fnOrPromise) return fnOrPromise

  if (typeof fnOrPromise === 'function') {
    const fnMsg = message || tersify(fnOrPromise)
    try { return warnReject(fnOrPromise(), fnMsg) }
    catch (e) {
      console.warn(`${fnMsg} throws ${e}`)
    }
  }
  else
    return warnReject(fnOrPromise, message)
}

function warnReject(maybePromise, message?) {
  if (!maybePromise) return maybePromise
  if (typeof maybePromise.then === 'function') {
    return maybePromise.then(x => x, x => {
      console.warn(message ? `${message} rejected with ${x}` : `detected rejected promise with: ${x}`)
      return undefined
    })
  }
  return maybePromise
}
