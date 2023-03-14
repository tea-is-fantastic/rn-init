const fs = require("fs");
const {values} = require("lodash");
const {rn_dirs, src, regexReplace, projectDir} = require("../utils");
const path = require("path");

async function structure() {
  projectDir();
  for (const c of values(rn_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(src, 'src', 'App.tsx'))

  await regexReplace(
      path.join(src, 'index.js'),
      "import App from './App'",
      "import App from './src/App'",
      './src/App',
  );

}

module.exports = structure;
