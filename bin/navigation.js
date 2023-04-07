const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {regexReplace, rn_androidSrc, yamls, projectDir} = require("@tisf/utils");
const path = require('path');

async function fileChanges() {
  const pth = path.join(rn_androidSrc, 'java', ...yamls.app.apk.split('.'));

  await regexReplace(
    path.join(pth, 'MainActivity.java'),
    /(^public class MainActivity.*$)/m,
    'import android.os.Bundle;\n\n$1',
    'android.os.Bundle',
  );

  const code = `
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }`;

  await regexReplace(
    path.join(pth, 'MainActivity.java'),
    /(^public class MainActivity.*$)/m,
    `$1\n${code}`,
    'void onCreate',
  );
}

async function navigation() {
  projectDir();
  const {stdout, stderr} = await exec(
    'npm i @react-navigation/native @react-navigation/native-stack ' +
      'react-native-screens react-native-safe-area-context --legacy-peer-deps',
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = navigation;
