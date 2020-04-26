import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';

import NavBackButton from '../../../assets/svg/nav_back.svg';
import NavHamButton from '../../../assets/svg/nav_ham.svg';

function TopNavBar({onBackPress, onHamPress, theme, ProfileNavPic}) {
  return (
    <View style={TopNavBarStyles.Container}>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={onBackPress}>
        {!ProfileNavPic ? (
          <NavBackButton style={TopNavBarStyles.BackButton} />
        ) : (
          ProfileNavPic
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 10,
          borderRadius: 20,
        }}
        onPress={onHamPress}>
        <NavHamButton style={TopNavBarStyles.HamburgerButton} />
      </TouchableOpacity>
    </View>
  );
}

const TopNavBarStyles = StyleSheet.create({
  Container: {
    top: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  BackButton: {height: 20},
  HamburgerButton: {height: 20, width: 20},
});
export default TopNavBar;
