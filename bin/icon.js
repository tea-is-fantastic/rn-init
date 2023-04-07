const util = require('util');
const path = require("path");
const {src, downloadFile, yamls
    , rn_dirs
    , jsonMerge, projectDir} = require("@tisf/utils");
const exec = util.promisify(require('child_process').exec);

async function icon() {
    projectDir();
    const pth = path.join(src, 'app.json')

    const json = jsonMerge(pth, {
        svgAppIcon: {
            foregroundPath: "./assets/svg/icon.svg"
        }
    });

    await downloadFile(yamls.assets.svg.icon, path.join(rn_dirs.rn_svg, 'icon.svg'));

    const {stdout, stderr} = await exec('npx react-native-svg-app-icon');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
}

module.exports = icon;
