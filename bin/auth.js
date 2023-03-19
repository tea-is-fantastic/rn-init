const fs = require("fs");
const {values} = require("lodash");
const {rn_dirs, src, projectDir} = require("../utils");
const path = require("path");
const fse = require("fs-extra");

async function fileChanges() {
  const code = `
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthOnly,
  createRootScreen,
  MobileScreen,
  OtpScreen,
} from '@tisf/rn-providers';

const RootScreen = createRootScreen({
  image: [
    require('../../assets/images/cov.jpg'),
    require('../../assets/images/cov1.jpg'),
    require('../../assets/images/cov2.jpg'),
    require('../../assets/images/cov3.jpg'),
    require('../../assets/images/cov4.jpg'),
  ],
  logo: require('../../assets/images/logofull.png'),
  line1: 'Karachi sab ka hai',
  line2: 'Karachi ka koi nai!',
  screen: 'HomeScreen',
  onboard: 'OnboardingScreen',
});

const Stack = createNativeStackNavigator();

function AuthScreen() {
  return (
    <AuthOnly unauth>
      <Stack.Navigator initialRouteName="RootScreen">
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="RootScreen" component={RootScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            title: '',
            headerShadowVisible: false,
            headerStyle: {},
          }}>
          <Stack.Screen name="MobileScreen" component={MobileScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Group>
      </Stack.Navigator>
    </AuthOnly>
  );
}

export default AuthScreen;
`;
  await fse.outputFile(path.join(rn_dirs.rn_screens, 'RootNavigator.tsx'), code);
}

async function auth() {
  projectDir();
  for (const c of values(rn_dirs)) {
    fs.existsSync(c) || fs.mkdirSync(c, {recursive: true});
  }
  await fs.promises.rename(path.join(src, 'App.tsx'), path.join(rn_dirs.rn_src, 'App.tsx'))
  await fileChanges();
}

module.exports = auth;
