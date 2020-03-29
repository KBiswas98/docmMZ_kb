import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Tag = props => {
  return (
    <View style={props.mode === 'Link' ? tag.link : tag.container}>
      <Text style={props.mode === 'Link' ? tag.linkText : tag.text}>
        {props.tag.toString().split(' ')[0]}
      </Text>
    </View>
  );
};

const tag = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#F6F6F4',
    borderRadius: 5,
    margin: 5,
    // flex: 1,
    width: 'auto',
  },
  link: {},
  text: {
    color: '#B1B4B9',
  },
  linkText: {
    fontSize: 10,
    textTransform: 'capitalize',
    color: '#9A9DA5',
  },
});

export default Tag;
