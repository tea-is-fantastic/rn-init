const fs = require("fs");
const {values} = require("lodash");
const {rn_dirs, src, regexReplace, projectDir, env} = require("../utils");
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
  await fse.outputFile(path.join(rn_dirs.rn_shared, 'constants', 'env.ts'), code);
}

async function fileChanges2() {
  const code = `
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="RootScreen" component={AuthScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default RootNavigator;
`;
  await fse.outputFile(path.join(rn_dirs.rn_screens, 'RootNavigator.tsx'), code);
}

async function fileChanges3() {
  const code = await fs.promises.readFile(path.join(env, 'env.ts'), 'utf-8');
  await fse.outputFile(path.join(rn_dirs.rn_shared, 'constants', 'env.ts'), code);
}

async function structure() {
  projectDir();
  for (const c of values(rn_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(rn_dirs.rn_src, 'App.tsx'))
  await fileChanges();
  await fileChanges1();
  await fileChanges2();
  await fileChanges3();
}

module.exports = structure;
