import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import NavigationActions from 'react-navigation/src/NavigationActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {color} from '../../config/styles/color';
import {resetStore} from '../../redux/action/auth'
import {gettingQuestion} from '../../redux/action/questionAction'

const Setting = props => {
  const dispatch = useDispatch()
  const {isLogedin, isDoctor} = useSelector(state => state.AuthReducer)
  const data = useSelector(state => state.AuthReducer);


  const _logout = async () => {
      console.log('Logout>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    dispatch(resetStore())
  };

  useEffect(() => {
    // dispatch(gettingQuestion())

    console.log(data)

    // isDoctor && props.navigation.navigate('Doctor')
    console.log(` isDoctor: ${isDoctor} and isLogedin: ${isLogedin}`)

  },[]);

  return (
    <SafeAreaView
      style={{backgroundColor: color.background, display: 'flex', flex: 1}}
      animation="bounceInRight"
      duration={2000}>
      <ScrollView>
        <View style={{ paddingBottom: 10, marginLeft: 30, marginTop: 30}}>
          <Icon
            name="ios-arrow-round-back"
            color={color.brand_color}
            size={35}
            onPress={() => props.navigation.goBack(null)}
          />
        </View>
        <Options nav={props} type={isLogedin? 'show' : 'hide'} />
        <Account
          logout={_logout}
          nav={props}
          type={isLogedin ? 'logout' : 'none'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const Options = props => {
  return (
    <View style={props.type === 'hide' ? {opacity: 0.3} : {opacity: 1}}>
      <Option
        icon={'ios-archive'}
        name={'Appiontment'}
        onClick={() => props.type !== 'hide' && props.nav.navigation.navigate('Appointment')}
      />
      {/* <Option
        icon={'ios-basket'}
        name={'Orders'}
        onClick={() => props.type !== 'hide' && console.log('after loged in.')}
      /> */}
      {/* <Option
        icon={'ios-chatboxes'}
        name={'Consultations'}
        onClick={() => props.type !== 'hide' && console.log('after loged in.')}
      /> */}
      {/* <Option
        icon={'ios-contact'}
        name={'My Doctors'}
        onClick={() => props.type !== 'hide' && console.log('after loged in.')}
      /> */}
      <Option
        icon={'ios-person'}
        name={'My Profile'}
        onClick={() =>
          props.type !== 'hide' &&
          props.nav.navigation.navigate('PatientProfile')
        }
      />
      {/* <Option
        icon={'ios-albums'}
        name={'Medical Records'}
        onClick={() => props.type !== 'hide' && console.log('after loged in.')}
      /> */}
    </View>
  );
};

const Option = props => {
  return (
    <TouchableOpacity style={option_style.container} onPress={props.onClick}>
      <Icon
        style={option_style.icon}
        name={props.icon}
        color={color.brand_color}
        size={30}
      />
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
};

const option_style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginLeft: 30,
    padding: 5,
    marginBottom: -5,
  },
  icon: {
    marginRight: 10,
  },
});

const Account = props => {
  return (
    <React.Fragment>
      {props.type === 'logout' ? (
        <Option
          icon={'ios-log-out'}
          name={'Logout'}
          onClick={() => props.logout()}
        />
      ) : (
        <React.Fragment>
          <Option
            icon={'ios-log-in'}
            name={'Login'}
            onClick={() => props.nav.navigation.navigate('Auth')}
          />
          <Option
            icon={'ios-person-add'}
            name={'Signup'}
            onClick={() =>
              props.nav.navigation.navigate(
                'Auth',
                {},
                NavigationActions.navigate({routeName: 'SignUp'}),
              )
            }
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Setting;
