const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {projectDir, rn_android, regexReplace} = require('../utils');
const path = require('path');

async function fileChanges() {
    await regexReplace(
        path.join(rn_android, 'app', 'build.gradle'),
        /^(.*android\.application\")$/m,
        `$1
apply plugin: 'com.google.gms.google-services'`,
        'google-services',
    );

    await regexReplace(
        path.join(rn_android, 'build.gradle'),
        /^(.*)(dependencies {)$/m,
        `$1$2
$1$1classpath 'com.google.gms:google-services:4.3.15'`,
        'google-services'
    );
}

async function firebase() {
    projectDir();
    const {stdout, stderr} = await exec(
        'npm i @react-native-firebase/app @react-native-firebase/auth ' +
        '@react-native-firebase/app-check @react-native-firebase/perf ' +
        '@react-native-firebase/analytics --legacy-peer-deps',
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    await fileChanges();
}

module.exports = firebase;

