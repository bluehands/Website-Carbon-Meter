const esbuildCommon = require("./.esbuild.common.js");

require('esbuild').buildSync({
  ...esbuildCommon,
  entryPoints: ['code/carbon.js'],
  outdir: 'dist/esm',
  globalName: 'CarbonMeter',
  format: 'esm',
  platform: 'browser',
  bundle: true,
  sourcemap: true,
  minify: false,
  // target: ['es5'],
})