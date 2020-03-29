import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {color} from '../../../config/styles/color';

const Star = () => {
  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <Astar status={1} size={6} />
      <Astar status={1} size={6} />
      <Astar status={1} size={6} />
      <Astar status={1} size={6} />
      <Astar status={0} size={6} />
    </View>
  );
};

const Astar = (props) => {
  return props.status === 1 ? (
    <Icon name="star" color={color.brand_color} size={props.size} style={{ marginRight: 4}} />
  ) : (
    <Icon name="star" color={color.natural_color} size={props.size} style={{ marginRight: 4}} />
  );
};

export default Star;
