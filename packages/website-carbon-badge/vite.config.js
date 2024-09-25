// vite.config.js
import { defineConfig } from 'vite';
import pkg from './package.json' with { type: "json" };

export default defineConfig({
    build: {
        target: 'modules',
        emptyOutDir: true,
        outDir: 'bundle',
        minify: false,
        sourcemap: true,
        lib: {
            name: pkg.name,
            entry: 'lib/carbon-badge.ts',
        },
    },
});