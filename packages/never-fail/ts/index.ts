export * from './ignoreFailure.js'
export * from './warnFailure.js'

import { ignoreFailure } from './ignoreFailure.js'

export const neverFail = ignoreFailure
export default neverFail
