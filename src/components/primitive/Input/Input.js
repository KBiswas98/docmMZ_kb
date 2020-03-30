import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {createAnimatableComponent, View, Text} from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {color} from '../../../config/styles/color'

const SearchBox = props => {
  return (
    <View style={[searchBox.container]} animation="fadeIn" duration={800}>
      <TextInput
        onSubmitEditing={props.onSubmit}
        onChangeText={props.onChange}
        style={[searchBox.input, searchBox.shadow]}
        placeholder={'Search by  on conditions, symptoms... '}
      />
    </View>
  );
};

const searchBox = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    display: 'flex',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 22,
    height: 44,
    paddingLeft: 15,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
  },
});

const LabaledInput = props => {
  return (
    <View style={[labaledinput.container]} animation="fadeIn" duration={800}>
      <Text style={{marginVertical: 10, marginLeft: 4}}>{props.label}</Text>
      <TextInput
        value={props.value || ''}
        keyboardType = {props.type || "default"}
        onChangeText={props.onChange}
        style={[labaledinput.input, labaledinput.shadow]}
      />
    </View>
  );
};

const labaledinput = StyleSheet.create({
  container: {
    // marginHorizontal: 10,
    display: 'flex',
    flex: 1,
    marginVertical: 10
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 22,
    height: 44,
    paddingLeft: 25,
    color: color.brand_color
    
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
  },
});

export {SearchBox, LabaledInput};
