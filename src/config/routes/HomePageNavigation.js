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
import Schedule from '../../screens/Schedule/Schedule';

const stackNav = createStackNavigator(
  {
    Login: Login,
    SignUp: SignUp,
    ForgotPassword: ForgotPassword,
    otpScreen: Otp,
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
    scheduleScreen: Schedule,
    searchScreen: Search,
  },
  {
    initialRouteName: 'homeScreen',
  },
);

export default HomePageNavigation;
