import React, { useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Avater from '../../primitive/Avater/Avater';
import Tag from '../../primitive/Tag/Tag';
import {button, text} from '../../../config/styles/color';
// import Button from '../../primitive/Button/Button';



const DoctorOption = (props) => {
    
  return (
    <View style={doctor.samll_card}>
      <View>
        <Avater imageLink={null} isActive={true} />
      </View>
      <View style={doctor.body}>
        <View>
          <Text style={doctor.heading}>{props.name}</Text>
          <Tag tag={props.tag} />
        </View>
        <View>
          <TouchableOpacity onPress={null} style={doctor.button}>
            <Text style={doctor.text}>{'Visit'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const doctor = StyleSheet.create({
  samll_card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: text.color_3
  },
  body: {
      marginLeft: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingBottom: 7,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    backgroundColor: button.color_0,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DoctorOption;
