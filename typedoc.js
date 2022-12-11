/**
 * @type {import('typedoc').TypeDocOptions}
 */
module.exports = {
  customTitle: 'Run codes and ignore any error',
  customTitleLink: 'https://github.com/unional/never-fail',
  entryPointStrategy: 'packages',
  entryPoints: [
    'packages/never-fail'
  ],
  out: 'docs',
}
