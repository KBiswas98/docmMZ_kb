import React from 'react';
import {Image} from 'react-native';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';

const Loading = () => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View animation="fadeIn" iterationCount="infinite" duration={2000} easing="ease-in-out-circ">
        <Image source={require('../../assets/logo/docmz.png')} />
      </View>
    </View>
  );
};

export default Loading;
