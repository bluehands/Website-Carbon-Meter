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
            name: 'website-carbon-badge',
            entry: 'lib/carbon-badge.js',
        },
    },
    rollupOptions: {
        external: ['website-carbon-meter'], // Add external dependencies here
        output: {
            globals: {
                "website-carbon-meter": 'WebsiteCarbonMeter'
            }
        }
    }
});