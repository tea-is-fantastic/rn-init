const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {src, projectDir, rn_dirs, yamls} = require('../utils');
const path = require('path');
const {forOwn} = require('lodash');
const fs = require("fs");
const fse = require("fs-extra");

async function fileChanges() {
    const code = `
module.exports = {
content: ["./src/App.tsx","./src/screens/*.{js,jsx,ts,tsx}","./src/components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {}
  },
  plugins: []
}`;

    await fs.promises.writeFile(path.join(src, 'tailwind.config.js'), code);
}

async function fileChanges1() {
    let code = '';
    forOwn(yamls.theme.palette, (v, k) => {
        code += `export const ${k}Color = '${v}';\n`;
    })

    await fse.outputFile(path.join(rn_dirs.rn_theme, 'colors.ts'), code);
}

async function fileChanges2() {
    const code = `/// <reference types="nativewind/types" />`;

    await fse.outputFile(path.join(rn_dirs.rn_shared, 'types', 'app.d.ts'), code);
}

async function theme() {
    projectDir();
    const {stdout, stderr} = await exec(
        'npm i nativewind color react-native-elements react-native-mmkv ' +
        'axios formik lodash moment yup --legacy-peer-deps',
    );
    await exec(
        'npm i -D tailwindcss @types/color @types/lodash babel-plugin-module-resolver --legacy-peer-deps',
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    await fileChanges();
    await fileChanges1();
    await fileChanges2();
}

module.exports = theme;

