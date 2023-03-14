const util = require('util');
const {yamls, regexReplace, rn_android, projectDir} = require("../utils");
const path = require("path");
const exec = util.promisify(require('child_process').exec);

async function fileChanges() {
  await regexReplace(
      path.join(rn_android, 'app', 'build.gradle'),
      /^(\s+)(implementation.*swiperefresh.*"\)\n)$/m,
      '$1$2$1implementation("com.facebook.soloader:soloader:0.9.0+")\n',
      'soloader',
  );
}

async function setup() {
  projectDir();

  await exec(`git init . && git add -A && git commit -am "First Commit"`);

  const {stdout, stderr} = await exec(
    `npx react-native-rename ${yamls.app.title} -b ${yamls.app.apk}`,
  );
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await exec(`rm -rf .git`);

  const {stdout1, stderr1} = await exec(
      'npm i react-native-svg @tisf/rn-providers',
  );
  console.log('stdout:', stdout1);
  console.log('stderr:', stderr1);

  await fileChanges();
}

module.exports = setup;
