import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createSwitchNavigator, createStackNavigator} from 'react-navigation';

import Login from '../../screens/auth/Login/Login';
import SignUp from '../../screens/auth/SignUp/SignUp';
import Setting from '../../screens/setting/Setting';
import PatientProfile from '../../screens/patientProfile/PatientProfile'
import Appointment from '../../screens/appointment/Appointment'


const SettingNavigation = createStackNavigator(
  {
    Setting: Setting,
    PatientProfile: PatientProfile,
    Appointment: Appointment
  },
  {
    headerMode: 'none',
    initialRouteName: 'Setting',
  },
);

export default SettingNavigation;
