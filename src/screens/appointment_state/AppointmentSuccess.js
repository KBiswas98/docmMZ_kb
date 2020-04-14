import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  ColorPropType,
} from 'react-native';
import Button from '../../components/primitive/Button/Button';
import TopNavbar2 from '../../components/prefab/TopNavbar/TopNavbar2';
import {color} from '../../config/styles/color';
import NavigationActions from 'react-navigation/src/NavigationActions';

const AppointmentSuccess = (props) => {
  const {name, time, date, doctorName} = props.navigation.state.params;

    useEffect(() => {
        console.log(props.navigation.state.params)
    })
  return (
    <SafeAreaView
      style={{backgroundColor: color.background, display: 'flex', flex: 1}}>
      <ScrollView>
        <TopNavbar2 nav={props} noback={true}/>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Image
            source={require('../../assets/images/doc_ilc.png')}
            style={{display: 'flex', flex: 1, width: 300, height: 300}}
          />
          <Text style={{marginVertical: 10, fontSize: 18, textAlign: 'center'}}>
            {name}, we’ve got you confirmed for your appointment.
          </Text>
          <Text
            style={{
              marginVertical: 20,
              fontSize: 18,
              textAlign: 'center',
              color: color.brand_color,
              fontWeight: 'bold',
            }}>
            {time} | Dr. {doctorName}
          </Text>
          <Text> {date}</Text>
          <Button
            style={{marginVertical: 30}}
            deafult={true}
            title={'MY APPOINTMENTS'}
            normal
            shadow
              // onClick={() => props.navigation.navigate('Setting', {} , NavigationActions.navigate({ routeName: 'Appointment'}))}
              onClick={() => props.navigation.navigate('settings', {} , NavigationActions.navigate({ routeName: 'Appointment'}))}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentSuccess;
