// vite.config.js
import {defineConfig} from 'vite';
import pkg from './package.json' with { type: "json" };

export default defineConfig({
    build: {
        target: 'modules',
        emptyOutDir: true,
        outDir: 'bundle',
        minify: true,
        sourcemap: true,
        lib: {
            name: pkg.name,
            entry: 'lib/carbon.js',
        },
    },
});