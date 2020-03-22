import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ViewPagerAndroidComponent,
} from 'react-native';
import {text} from '../../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';

const Catagory = props => {
  return (
    <View style={styles.container}>
      {props.children}
      <Text style={styles.text}>{props.title}</Text>
      {props.isActive ? (
        <Image
          source={require('../../../assets/system_icon/icons8_ok_96px_1.png')}
          style={styles.icon}
        />
      ) : (
        <Image
          source={''}
          style={styles.icon}
        />
      )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EFF1F5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default Catagory;
