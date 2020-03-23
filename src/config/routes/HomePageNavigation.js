import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Login from '../../screens/Login/Login';
import SignUp from '../../screens/SignUp/SignUp';

const stackNav = createStackNavigator(
  {
     Search,
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

const HomePageNavigation = createSwitchNavigator(
  {
    homeScreen: Home,
    allDoctorScreen: AllDoctor,
    doctorProfileScreen: Profile,
    searchScreen: Search,
    Login: Login,
    SignUp: SignUp,
  },
  {
    initialRouteName: 'homeScreen',
  },
);

export default HomePageNavigation;
