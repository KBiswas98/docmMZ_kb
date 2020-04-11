import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  ColorPropType,
  FlatList,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import Button from '../../components/primitive/Button/Button';
import TopNavbar2 from '../../components/prefab/TopNavbar/TopNavbar2';
import {color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import DoctorOption2 from '../../components/prefab/Doctors/DoctorOption2';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';

const Appointment = (props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [appiontment, setAppointment] = useState();

  useEffect(() => {
    _getDataFromLocalStore();
  }, [loading,appiontment]);

  const _getDataFromLocalStore = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      // console.log(result);
      if (result === null || result === undefined) {
        props.navigation.navigate('Auth');
      }

      axios
        .get(`${Host}/patient/getinfo/${JSON.parse(result).id}`)
        .then((result) => {
          if (result.status) {
            console.log(result.data.data.appointments);
            setAppointment(result.data.data.appointments);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const removeAppiontment = (id) => {
    const config = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    const _data = {
      byPatient: 'true',
      byDoctor: 'false',
      reason: 'Have some important work',
      id: id,
    };

    axios
      .post(`${Host}/appointment/cancel`, _data, config)
      .then((result) => {
        // result = JSON.parse(result)

        console.log(result.data);
        if(result.status) {
            // refresh
            ToastAndroid('Successfully cancel your appointment.')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <Text>loading...</Text>
  ) : (
    <SafeAreaView
      style={{backgroundColor: color.background, display: 'flex', flex: 1}}
      animation="bounceInRight"
      duration={2000}>
      <ScrollView>
        <View style={{paddingBottom: 10, marginLeft: 30, marginTop: 30, display: 'flex',flexDirection: 'row', alignItems: "center", flex: 1}}>
          <Icon
            name="ios-arrow-round-back"
            color={color.brand_color}
            size={35}
            onPress={() => props.navigation.goBack(null)}
          />
          <Text style={{ textAlign: "center", marginLeft: '30%'}}>Appointments</Text>
        </View>

        <FlatList
          data={appiontment.filter( _item => !_item.cancelledByPatient)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Appointment;
