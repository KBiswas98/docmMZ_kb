import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';
import Search from '../../screens/search/Search';
import Login from '../../screens/Login/Login';
import SignUp from '../../screens/SignUp/SignUp';
import ForgotPassword from '../../screens/ForgotPassword/ForgotPassword';
import Otp from '../../screens/Otp/Otp';

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
    ForgotPassword: ForgotPassword,
    otpScreen: Otp,
  },
  {
    initialRouteName: 'homeScreen',
  },
);

export default HomePageNavigation;
