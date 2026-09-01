# never-fail

[![NPM version][npm-image]][npm-url]
[![NPM downloads][downloads-image]][npm-url]

[![GitHub NodeJS][github-nodejs]][github-action-url]
[![Codecov][codecov-image]][codecov-url]

[![Visual Studio Code][vscode-image]][vscode-url]

Never fail

```ts
import nf, { ignoreFailure, neverFail, warnFailure } from 'never-fail'

// default export and `neverFail()` is an alias of `ignoreFailure()`
// `warnFailure()` is the same as `ignoreFailure()` but emit `console.warn()` message during failure

(async () => {
  await ignoreFailure(() => anyCall())
  await ignoreFailure(() => returnRejectedPromise())
  await ignoreFailure(rejectedPromise)
  // will emit `custom message phrase throws ...` or
  // `custom message phrase rejected with ...`
  await warnFailure(_, 'custom message phrase')
}())
```

[npm-image]: https://img.shields.io/npm/v/never-fail.svg?style=flat
[npm-url]: https://npmjs.org/package/never-fail
[downloads-image]: https://img.shields.io/npm/dm/never-fail.svg?style=flat
[codecov-image]: https://codecov.io/gh/cyberuni/never-fail/branch/main/graph/badge.svg
[codecov-url]: https://codecov.io/gh/cyberuni/never-fail
[github-nodejs]: https://github.com/cyberuni/never-fail/actions/workflows/release.yml/badge.svg
[github-action-url]: https://github.com/cyberuni/never-fail/actions/workflows/release.yml
[vscode-image]: https://img.shields.io/badge/vscode-ready-green.svg
[vscode-url]: https://code.visualstudio.com/
