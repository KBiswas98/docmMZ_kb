import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Login from '../../screens/auth/Login/Login';
import SignUp from '../../screens/auth/SignUp/SignUp';
import Setting from '../../screens/setting/Setting';

const AuthNavigation = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  },
);

const HomePageNavigation = createSwitchNavigator(
  {
    Setting: Setting,
    Auth: AuthNavigation,
  },
  {
    initialRouteName: 'Setting',
  },
);

export default HomePageNavigation;
