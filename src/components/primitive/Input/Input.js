import React, {Component} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';

class SearchBox extends Component {
  render() {
    return (
      <View style={[searchBox.container]} animation="fadeIn" duration={800}>
        <TextInput
          style={[searchBox.input, searchBox.shadow]}
          placeholder={'Search by  on conditions, symptoms... '}
        />
      </View>
    );
  }
}

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

export default SearchBox;
