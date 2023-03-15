const util = require('util');
const fs = require("fs/promises");
const {src, downloadFile, yamls, rn_dirs, projectDir} = require("../utils");
const path = require("path");
const {forOwn} = require("lodash");
const exec = util.promisify(require('child_process').exec);

async function assets() {
    projectDir();
    forOwn(yamls.assets.fonts, async (v, k) => {
        await downloadFile(v, path.join(rn_dirs.rn_fonts, k + '.ttf'));
    });

    forOwn(yamls.assets.icons, async (v, k) => {
        await downloadFile(v, path.join(rn_dirs.rn_fonts, k + '.ttf'));
        await downloadFile(v, path.join(rn_dirs.rn_iconfig, k + '.json'));
        await fs.writeFile(path.join(rn_dirs.rn_iconfig, k + '.js'), `
// Once your custom font has been loaded...
import {createIconSetFromFontello} from 'react-native-vector-icons';
import fontelloConfig from './${k}.json';
// Both the font name and files exported from Fontello are most likely called "fontello"
const Icon = createIconSetFromFontello(
  fontelloConfig,
  '${k}',
  '${k}.ttf',
);
export default Icon;
`, {flag: 'w'})
    });


    await fs.writeFile(path.join(src, 'react-native.config.js'), `
  module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts'],
};
`)
    const {stdout, stderr} = await exec(
        `npx react-native-asset`,
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

module.exports = assets;
