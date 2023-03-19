const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {projectDir, env, rn_android, rn_dirs} = require('../utils');
const path = require('path');
const fs = require("fs");
const fse = require("fs-extra");

async function fileChanges() {
    const code = await fs.promises.readFile(path.join(env, 'google-services.json'), 'utf-8');
    await fse.outputFile(path.join(rn_android, 'app', 'google-services.json'), code);
}

async function firebase() {
    projectDir();
    const {stdout, stderr} = await exec(
        'npm i react-native-mmkv @react-native-firebase/app ' +
        '@react-native-firebase/auth axios formik lodash moment yup',
    );
    await exec(
        'npm i -D @types/lodash',
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    await fileChanges();
}

module.exports = firebase;

