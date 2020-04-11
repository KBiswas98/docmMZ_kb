import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {color} from '../../../config/styles/color';

const IconSize = 22;

const BottomNavbar = (props) => {
  return (
    <View style={bottomnavbar.container}>
      <Icon
        style={{
          elevation: 10,
          backgroundColor: color.brand_color,
          padding: 11,
          position: 'absolute',
          top: -20,
          borderRadius: 100,
        }}
        name="home"
        color={color.white_color}
        size={30}
        onPress={() => props.nav.navigation.navigate('homeScreen')}
      />
      <View style={bottomnavbar.line}>
        <Icon
          name="settings"
          color={color.white_color}
          size={IconSize}
          onPress={() => props.nav.navigation.navigate('settingScreen')}
        />
        <Icon
          name="message-square"
          color={color.white_color}
          size={IconSize}
          style={{marginRight: 70}}
          onPress={() => props.nav.navigation.navigate('chatScreen')}
        />

        <Icon
          name="calendar"
          color={color.white_color}
          size={IconSize}
          onPress={() => props.nav.navigation.navigate('scheduleScreen')}
        />
        <Icon
          name="user"
          color={color.white_color}
          size={IconSize}
          onPress={() => props.nav.navigation.navigate('profileScreen')}
        />
      </View>
    </View>
  );
};

const bottomnavbar = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: color.brand_color,
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  line: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default BottomNavbar;
