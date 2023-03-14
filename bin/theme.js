const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {src, projectDir} = require('../utils');
const path = require('path');
const fs = require("fs");

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

async function theme() {
    projectDir();
    const {stdout, stderr} = await exec(
        'npm i nativewind',
    );
    await exec(
        'npm i -D tailwindcss',
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    await fileChanges();
}

module.exports = theme;
