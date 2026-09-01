---
'never-fail': patch
---

Pick up `tersify@^4.0.6` and rebuild the published output with `tsdown`.

Two things change for consumers, neither of them API:

- The runtime dependency moves from `tersify@^3.10.5` to `^4.0.6`, so a fresh install
  resolves a different `tersify` under `never-fail`.
- The build moves from two `tsc` passes to `tsdown`. The emitted file paths
  (`esm/index.js`, `cjs/index.js` and the `.d.ts` beside each) are unchanged, but the CJS
  output now targets ES2015 rather than ES5 — rolldown's floor. Nothing in this package
  needs the difference and every runtime that can load a CJS module is well past ES2015.

The exported signatures are identical.
