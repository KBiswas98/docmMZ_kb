import React from 'react';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import HomePageNavigation from './HomePageNavigation';
import SettingNavigation from './SettingNavigation';
import NavigationActions from 'react-navigation/src/NavigationActions';
import DoctorNavigation from './DoctorNavigaton'

export default createSwitchNavigator(
  {
    Home: {
      screen: HomePageNavigation,
    },
    Setting: {
      screen: SettingNavigation,
    },
    // Doctor: {
    //   screen: DoctorNavigation
    // }
  },
  {
    showIcon: true,
    initialRouteName: 'Home',
    // initialRouteName: 'Doctor',
    navigationOptions: ({navigation}) => ({
      tabBarOnPress: () => {
        console.log(navigation.state.routeName);
        navigation.navigate(navigation.state.routeName);
        if (navigation.state.routeName === 'Home') {
          navigation.navigate(
            'Home',
            {},
            NavigationActions.navigate({routeName: 'homeScreen'}),
          );
        }
      },
    }),
  },
);













// import React from 'react';
// import {View, Text} from 'react-native';

// import Icon from 'react-native-vector-icons/Feather';
// import {createBottomTabNavigator} from 'react-navigation';

// import HomePageNavigation from './HomePageNavigation';
// import SettingNavigation from './SettingNavigation';
// import NavigationActions from 'react-navigation/src/NavigationActions';

// export default createBottomTabNavigator(
//   {
//     Home: {
//       screen: HomePageNavigation,
//       navigationOptions: {
//         tabBarLabel: 'Home',
//         tabBarIcon: ({tintColor}) => (
//           <Icon name="home" color={tintColor} size={25} />
//         ),
//       },
//     },
//     Setting: {
//       screen: SettingNavigation,
//       navigationOptions: {
//         tabBarLabel: 'Setting',
//         tabBarIcon: ({tintColor}) => (
//           <Icon name="settings" color={tintColor} size={25} />
//         ),
//       },
//     },
//   },
//   {
//     showIcon: true,
//     initialRouteName: 'Home',
//     navigationOptions: ({navigation}) => ({
//       tabBarOnPress: () => {
//         console.log(navigation.state.routeName);
//         navigation.navigate(navigation.state.routeName);
//         if(navigation.state.routeName === 'Home') {
//           navigation.navigate('Home', {}, NavigationActions.navigate({ routeName: 'homeScreen'}))
//         }
//       },
//     }),
//   },
// );
