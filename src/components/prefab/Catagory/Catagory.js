import React from 'react';
import {

  Image,
  StyleSheet,
  ViewPagerAndroidComponent,
} from 'react-native';
import {text, color} from '../../../config/styles/color';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';
 
const Catagory = props => {
  return (
      <View style={[styles.container, styles.shadow, props.isActive&& styles.active]} animation="fadeIn" duration={800}>
        {props.children}
        <Text style={styles.text}>{props.title}</Text>
        
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    margin: 10,
    marginVertical: 30,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    borderWidth: 0,
    borderColor: '#EFF1F5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 121,
    width: 208,
    backgroundColor: '#fff'
  },

  active: {
    backgroundColor: color.brand_color,
  },
  text: {
    marginTop: 9,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 18,
    width: 18,
  },
  shadow: {
    shadowOpacity: 1,
    elevation: 2,
    shadowColor: color.brand_color,
  }
});

export default Catagory;
