module.exports = {
  coverage: false,
  color: true,
  'watch-ignore': ['/node_modules/', 'package*', 'yarn*'],
  diff: true,
  package: './package.json',
  reporter: 'spec',
  slow: 75,
  timeout: 10000,
  verbose: true
};
