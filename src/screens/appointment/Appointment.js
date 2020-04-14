import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import DoctorOption2 from '../../components/prefab/Doctors/DoctorOption2';
import { useSelector, useDispatch } from 'react-redux';
import {GetAppointmentData,RemoveAppointmentData} from '../../redux/action/auth'


const Appointment = (props) => {
    const {isLoading, appointment, data} = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetAppointmentData(data.id))
    }, []);

    const removeAppiontment = (id) => {
        dispatch(RemoveAppointmentData(id))
    };

  return isLoading ? (
    <Text>loading...</Text>
  ) : (
    <SafeAreaView
      style={{backgroundColor: color.background, display: 'flex', flex: 1}}
      animation="bounceInRight"
      duration={2000}>
        <View style={{ maxHeight: 100, paddingBottom: 10, marginLeft: 30, marginTop: 0, display: 'flex',flexDirection: 'row', alignItems: "center", flex: 1}}>
          <Icon
            name="ios-arrow-round-back"
            color={color.brand_color}
            size={35}
            onPress={() => props.navigation.goBack(null)}
          />
          <Text style={{ textAlign: "center", marginLeft: '30%'}}>Appointments</Text>
        </View>

        <FlatList
          data={appointment.filter( _item => !_item.cancelledByPatient)}
          renderItem={(item, index) => {
            console.log(item);

            return (
              (
                <DoctorOption2
                  name={item.item.doctor.basic.name}
                  tag={'Unknown'}
                  key={index}
                  isActive={true}
                  nav={props}
                  id={item.item._id}
                  // schedule={getRecent3(item.item)}
                  bookedFor={item.item.bookedFor}
                  removeEvent={removeAppiontment}
                />
              )
            );
          }}
          keyExtractor={(item, index) => String(index)}
        />
    </SafeAreaView>
  );
};

export default Appointment;
