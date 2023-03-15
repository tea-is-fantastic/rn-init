const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {regexReplace, rn_android, rn_androidSrc, yamls, downloadFile, rn_dirs, projectDir} = require('../utils');
const path = require('path');
const prettifyXml = require('xml-formatter');

async function fileChanges() {
  const pth = path.join(rn_androidSrc, 'java', ...yamls.app.apk.split('.'));

  await regexReplace(
    path.join(rn_android, 'build.gradle'),
    /(minSdkVersion\s=\s)(\d{2})/g,
    '$123',
  );

  await regexReplace(
    path.join(rn_android, 'app', 'build.gradle'),
    /^(\s+)(implementation.*swiperefresh.*\"\n)$/m,
    '$1$2$1implementation "androidx.core:core-splashscreen:1.0.0"\n',
    'core-splashscreen',
  );

  const styl = `
<!-- BootTheme should inherit from Theme.SplashScreen -->
<style name="BootTheme" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/bootsplash_background</item>
  <item name="windowSplashScreenAnimatedIcon">@mipmap/bootsplash_logo</item>
  <item name="postSplashScreenTheme">@style/AppTheme</item>
</style>
`;

  await regexReplace(
    path.join(rn_androidSrc, 'res', 'values', 'styles.xml'),
    /(\s+)(<style name="AppTheme".*<\/style>)/s,
    `$1$2\n${styl}`,
    'bootsplash',
    x => {
      const y = `<root>${x}</root>`;
      const output = prettifyXml(y, {collapseContent: true});
      return output.substring(6, output.length - 7);
    },
  );

  await regexReplace(
    path.join(rn_androidSrc, 'AndroidManifest.xml'),
    '@style/AppTheme',
    '@style/BootTheme',
    'BootTheme',
  );

  await regexReplace(
    path.join(pth, 'MainActivity.java'),
      /(^public class MainActivity.*$)/m,
    'import com.zoontek.rnbootsplash.RNBootSplash;\n\n$1',
    'rnbootsplash',
  );

  await regexReplace(
    path.join(pth, 'MainActivity.java'),
    /^(\s+)(super.onCreate.*$)/m,
    '$1RNBootSplash.init(this);\n$1$2',
    'RNBootSplash.init',
  );
}

async function splash() {
  projectDir();
  await downloadFile(yamls.assets.images.splash, path.join(rn_dirs.rn_images, 'splash.png'));
  await exec('npm i react-native-bootsplash');
  const {stdout, stderr} =
    await exec(`npx react-native generate-bootsplash assets/images/splash.png \\
  --background-color=${yamls.theme.palette.splash} \\
  --logo-width=200 \\
  --assets-path=assets \\
  --flavor=main`);
  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
  await fileChanges();
}

module.exports = splash;
