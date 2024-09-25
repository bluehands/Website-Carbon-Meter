import {fromData} from 'ssri';
import {readFile, writeFile } from 'fs/promises';
import {join} from 'path';
import vite from '../vite.config.js';

const projectRoot = join(import.meta.dirname, '..');
const outDir = join(projectRoot, vite.build.outDir);
const bundle = (extension) => join(outDir, `${vite.build.lib.name}.${extension}`);

const files = [
    bundle('js'),
    bundle('umd.cjs'),
];

files.forEach(async file => {
    const hash = 'sha512';
    const sri = fromData(await readFile(file), {algorithms: [hash]});
    console.log('File:', file, '\nHash:', sri);
    await writeFile(`${file}.${hash}.sri`, sri.toString());
});
