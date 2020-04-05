import React, {useEffect} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import Avater from '../../primitive/Avater/Avater';
import Tag from '../../primitive/Tag/Tag';
import {button, text, color} from '../../../config/styles/color';
import Star from '../Stars/Star';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAnimatableComponent, View, Text } from 'react-native-animatable';

const mySchedule = [
  {
    time: '10:30',
    available: true,
  },
  {
    time: '10:40',
    available: false,
  },
  {
    time: '10:50',
    available: false,
  },
];

const DoctorOption = props => {
  useEffect(() => {
    // console.log('------***-----------------')
    // console.log(props)
    // console.log('------***-----------------')
  });
  return (
    <View style={[doctor.samll_card, doctor.shadow]} animation="bounceInRight" duration={3000} delay={1000}>
      <View>
        <Avater imageLink={null} isActive={props.isActive} />
      </View>
      <View style={doctor.body}>
        <View style={{display: 'flex', flex: 1}}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={doctor.heading}>
              {props.name.toString().length > 12
                ? props.name.toString().substring(0, 13) + '...'
                : props.name.toString()}
            </Text>
            <Star />
          </View>

          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Tag tag={props.tag} mode={'Link'} />
          </View>
          <ScheduleViewer data={props.schedule} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.nav.navigation.navigate('doctorProfileScreen2', {
                // props.nav.navigation.navigate('doctorSlider', {
                name: props.name,
                id: props.id,
                tag: props.tag,
              })
            }
            style={doctor.button}>
            <Icon name="navigate-next" color={color.white_color} size={30} />
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
    backgroundColor: color.white_color,
    margin: 5,
    padding: 15,
    borderRadius: 11,
  },
  heading: {
    fontSize: 14,
    color: '#363B4C',
    marginRight: 5,
    textTransform: 'capitalize',
  },
  body: {
    marginLeft: 20,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 4,
    borderRadius: 100,
    backgroundColor: color.brand_color,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const ScheduleViewer = props => {
  return (
    <View style={scheduleViewer.container}>
      {props.data.map((item, index) => (
        <View
          key={index}
          style={[scheduleViewer.time, item.available && scheduleViewer.available]}>
          <Text style={[scheduleViewer.text, item.available && {color: color.white_color}]}>{item.time}</Text>
        </View>
      ))}
    </View>
  );
};

const scheduleViewer = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  time: {
    marginRight: 7,
    marginVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 100,
  },
  text: {
    fontSize: 11,
    color: color.not_heighlited,
  },
  available: {
    backgroundColor: color.brand_color,
    // borderRadius: 100
  },
});

export default React.memo(DoctorOption);
