import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator} from 'react-navigation';

import Home from '../../screens/home/Home';
import AllDoctor from '../../screens/allDoctors/AllDoctor';
import Profile from '../../screens/doctorProfile/DoctorProfile';

const HomePageNavigation = createSwitchNavigator(
  {
    homeScreen: Home,
    allDoctorScreen: AllDoctor,
    doctorProfileScreen: Profile,
  },
  {
    initialRouteName: 'homeScreen',
  },
);

export default HomePageNavigation;
