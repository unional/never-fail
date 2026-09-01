/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  // `customTitle` / `customTitleLink` came from typedoc-plugin-extras, which typedoc has
  // not auto-loaded since 0.23 and which this config never declared in `plugin:`. The
  // options were therefore never registered and typedoc exited 1 on every run — the
  // docgen job has been failing on `main` for that reason. `name` and `titleLink` are
  // typedoc's own equivalents and need no plugin.
  name: 'Run codes and ignore any error',
  titleLink: 'https://github.com/cyberuni/never-fail',
  // Was `entryPointStrategy: 'packages'` pointed at `packages/never-fail`. Under typedoc
  // 0.24 that path reads the package's legacy `typedoc.entryPoint` key, which it now
  // ignores, so it warned "No entry points were provided" and emitted an empty site.
  // Resolving the source entry point directly documents the actual API.
  entryPoints: [
    'packages/never-fail/ts/index.ts'
  ],
  tsconfig: 'packages/never-fail/tsconfig.json',
  out: 'docs',
}
