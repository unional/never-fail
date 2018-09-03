export * from './ignoreFailure'
export * from './warnFailure'

import { ignoreFailure } from './ignoreFailure'

export const neverFail = ignoreFailure
export default neverFail
