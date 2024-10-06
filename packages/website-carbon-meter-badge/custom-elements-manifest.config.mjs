import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration";

const options = {
    outdir: "dist",
};

export default {
    globs: ['lib/*.{js,ts,tsx}'],
    exclude: [],
    outdir: "dist",
    dev: false,
    litelement: false,
    fast: false,
    stencil: false,
    catalyst: false,
    plugins: [
        customElementJetBrainsPlugin(options)
    ],
};