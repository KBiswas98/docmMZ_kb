import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import NavigationActions from 'react-navigation/src/NavigationActions';
import Icon from 'react-native-vector-icons/Ionicons';
import {View, Text} from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {color} from '../../config/styles/color';

const Setting = props => {
  const states = useSelector(state => state.DataStoreReducer.data);
  const [Loading, setLoading] = useState(true);
  const [user, setUser] = useState({email: ''});

  const _getDataFromLocalStore = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      console.log(result);
      if (result === null || result === undefined) {
        setUser({email: ''});
      } else if (result.length > 2) {
        setUser(JSON.parse(result) || {email: ''});
      }
      setLoading(false);
    });
  };

    const _checkUser = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      console.log('**********')
      console.log(result);
      if (result !== null) {
        // props.navigation.navigate('Auth');
        // setUser(result);
        result = JSON.parse(result)
        if(result.mode.localeCompare('doctor') === 0) props.navigation.navigate('Doctor');
      }
    });
  };

  const _logout = async () => {
    setUser({email: ''});
    await AsyncStorage.clear(() => {
      props.navigation.navigate('Home');
    });
  };

  useEffect(() => {
    _checkUser()
    _getDataFromLocalStore();
    console.log(
      '*************************************************************************',
    );
    console.log(states);
    console.log(
      '*************************************************************************',
    );
  }, [Loading]);

  return Loading ? (
    <Text>Loading...</Text>
  ) : (
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
        <Options nav={props} type={user.email.length > 2 ? 'show' : 'hide'} />
        <Account
          logout={_logout}
          nav={props}
          type={user.email.length > 2 ? 'logout' : 'none'}
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
