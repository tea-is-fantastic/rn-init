const fs = require("fs");
const {values} = require("lodash");
const {rn_dirs, src, regexReplace, projectDir} = require("@tisf/utils");
const path = require("path");

async function fileChanges() {
  await regexReplace(
      path.join(src, 'index.js'),
      "import App from './App'",
      "import App from './src/App'",
      './src/App',
  );
}

async function structure() {
  projectDir();
  for (const c of values(rn_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(rn_dirs.rn_src, 'App.tsx'))
  await fileChanges();
}

module.exports = structure;
