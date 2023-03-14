const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {src, projectDir} = require('../utils');
const path = require('path');
const fs = require("fs");

async function fileChanges() {
  const code = `
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
};
`;

  await fs.promises.writeFile(path.join(src, 'babel.config.js'), code);
}

async function bottom() {
  projectDir();
  const {stdout, stderr} = await exec(
    'npm i zustand react-native-reanimated ' +
      'react-native-gesture-handler @gorhom/bottom-sheet@^4 ' +
      'react-native-paper@^5.0.0-rc.10',
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = bottom;
