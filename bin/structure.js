const fs = require("fs");
const {values} = require("lodash");
const {rn_dirs, src, regexReplace, projectDir} = require("../utils");
const path = require("path");
const fse = require("fs-extra");

async function fileChanges() {
  await regexReplace(
      path.join(src, 'index.js'),
      "import App from './App'",
      "import App from './src/App'",
      './src/App',
  );
}

async function fileChanges1() {
  const code = `
import React from 'react';

import {AppWrapper} from '@tisf/rn-providers';
import RootNavigator from './screens/RootNavigator';
import {AppInfo} from './shared/constants/env';

function App(): JSX.Element {
  return (
    <AppWrapper appInfo={AppInfo}>
      <RootNavigator />
    </AppWrapper>
  );
}

export default App; 
`;
  await fse.outputFile(path.join(rn_dirs.rn_src, 'App.tsx'), code);
}

async function structure() {
  projectDir();
  for (const c of values(rn_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(rn_dirs.rn_src, 'App.tsx'))
  await fileChanges();
  await fileChanges1();
}

module.exports = structure;
