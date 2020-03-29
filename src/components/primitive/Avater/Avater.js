import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {color} from '../../../config/styles/color';

const Avater = props => {
  return (
    <View style={avater.container}>
      <Image
        style={
          props.width
            ? {height: props.width, width: props.width, borderRadius: 100}
            : avater.profile_pic
        }
        source={require('../../../assets/images/doc.jpg')}
      />
      {props.isActive ? (
        <View style={avater.status}>
        </View>
      ) : null}
    </View>
  );
};

const avater = StyleSheet.create({
  container: {
    // width: 50,
    // height: 50
    // position: 'relative',
    // marginTop: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    // paddingRight: 10,
  },
  profile_pic: {
    height: 65,
    width: 65,
    borderRadius: 100,
  },
  status: {
    position: 'absolute',
    top: 13,
    left: 56,
    height: 20,
    width: 20,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 100,
    backgroundColor: color.brand_color
  },
});

export default Avater;
