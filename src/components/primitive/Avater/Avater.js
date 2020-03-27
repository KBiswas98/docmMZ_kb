import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Avater = props => {
  return (
    <View style={avater.container}>
      <Image
        style={props.width ? {height: props.width, width: props.width, borderRadius: 100}: avater.profile_pic}
        source={require('../../../assets/images/doc.jpg')}
      />
      {props.isActive ? (
        <Image
          style={avater.status}
          source={require('../../../assets/system_icon/active.png')}
        />
      ) : null}
    </View>
  );
};

const avater = StyleSheet.create({
  container: {
    // width: 50,
    // height: 50
    position: 'relative',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  profile_pic: {
    height: 65,
    width: 65,
    borderRadius: 100,
  },
  status: {
    position: 'absolute',
    top: 15,
    left: 50,
    height: 15,
    width: 15,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
  },
});

export default Avater;
