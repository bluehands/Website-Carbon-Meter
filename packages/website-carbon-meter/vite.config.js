// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'modules',
        emptyOutDir: true,
        outDir: 'dist',
        minify: false,
        sourcemap: true,
        lib: {
            name: 'website-carbon-meter',
            entry: 'lib/carbon.js',
        },
    },
    rollupOptions: {
        external: ['@tgwf/co2'], // Add external dependencies here
        output: {
            globals: {
                '@tgwf/co2': 'CO2' // Provide a global variable name for the external dependency
            }
        }
    }
});