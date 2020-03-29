import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

class SearchBox extends Component {
  render() {
    return (
      <View style={[searchBox.container]}>
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
