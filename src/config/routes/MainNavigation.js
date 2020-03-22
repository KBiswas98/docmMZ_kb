import React from 'react';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from 'react-navigation';

import HomePageNavigation from './HomePageNavigation'
import Setting from '../../screens/setting/Setting';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomePageNavigation,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor}) => (
          <Icon name="home" color={tintColor} size={25} />
        ),
      },
    },
    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: ({tintColor}) => (
          <Icon name="settings" color={tintColor} size={25} />
        ),
      },
    },
  },
  {
    showIcon: true,
    initialRouteName: 'Home',
  },
);
