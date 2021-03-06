import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Host} from '../../../config/settings/Connection';
import NavigationActions from 'react-navigation/src/NavigationActions';
import {_checkLogin, _saveDataToStorage} from '../../../config/common/Storage';
import {color} from '../../../config/styles/color';
import Button from '../../../components/primitive/Button/Button';
import Switch from '../../../components/primitive/Switch/Switch';
import {LoginDoctor, LoginPatient} from '../../../redux/action/auth'
import { useDispatch } from 'react-redux';
import {_LoginPatient} from '../../../redux/action/authAction'

const Login = (props) => {
  const [data, setData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(true);
  const [isDoctor, setDoctor] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handelEmailInput = (e) => {
    console.log(e.target);
    setData({...data, email: e});
  };

  const handelPasswordInput = (e) => {
    setData({...data, password: e});
  };

  const handelLoginMode = () => {
    console.log('click~');
    setDoctor(!isDoctor);
  };

  const successCallback = (successResponce) => {
        console.log(`PatientLoginAction(success):  ${successResponce.message}`)
        isDoctor
         ?
         props.navigation.navigate('Doctor') :
         props.navigation.navigate('Home');
  }

  const errorCallback= (faildResponce) => {
    console.log(`PatientLoginAction(error):  ${faildResponce.message}`)
  }

  const _handelPatientLogin = () => {
    console.log(data);
    dispatch(LoginPatient(data, successCallback, errorCallback))
  };

  const _handelDoctorLogin = () => {
    console.log(data);
    dispatch(LoginDoctor(data, successCallback, errorCallback))
  };

  return loading ? (
    <Text>Loading..</Text>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: color.background}}>
      <View>
        <Icons
          name="ios-arrow-round-back"
          color={color.brand_color}
          size={35}
          // onPress={() => props.navigation.navigate('Setting')}
          onPress={() => props.navigation.navigate('Home')}
          style={{position: 'absolute', margin: 20}}
        />
        <HeadText
          headmsg={'Welcome,'}
          subMsg={'Login as a '}
          onTougle={handelLoginMode}
        />
        <InputBox
          label={'Email Id'}
          secureText={false}
          onChange={handelEmailInput}
        />
        <InputBox
          label={'Password'}
          secureText={true}
          onChange={handelPasswordInput}
        />
        <SubText text={'Forgot Password?'} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            marginVertical: 50,
          }}>
          <Button
            deafult={true}
            title={'SIGNUP'}
            t_text={true}
            onlyBorder
            onClick={() =>
              props.navigation.navigate(
                'Auth',
                {},
                NavigationActions.navigate({routeName: 'SignUp'}),
              )
            }
          />
          <Button
            deafult={true}
            title={'LOGIN'}
            normal
            shadow
            onClick={isDoctor ? _handelDoctorLogin : _handelPatientLogin}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const HeadText = (props) => {
  return (
    <View style={HeadTextStyle.container}>
      <Text style={HeadTextStyle.mainmsg}>{props.headmsg}</Text>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={HeadTextStyle.subMsg}>{props.subMsg}</Text>
        <Switch option1="Patient" option2="Doctor" onClick={props.onTougle} />
      </View>
    </View>
  );
};

const HeadTextStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 90,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    marginBottom: 80,
  },
  mainmsg: {
    marginStart: 28,
    fontWeight: 'bold',
    fontSize: 30,
  },
  subMsg: {
    marginStart: 32,
    fontWeight: 'normal',
    fontSize: 20,
    color: '#000',
  },
});

const SubText = (props) => {
  return (
    <View style={SubTextStyle.container}>
      <TouchableOpacity>
        <Text style={SubTextStyle.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SubTextStyle = StyleSheet.create({
  text: {
    textAlign: 'right',
    marginEnd: 20,
    fontSize: 12,
    color: color.text_on_bg,
    marginBottom: 10,
  },
});

const InputBox = (props) => {
  return (
    <View style={InputBoxStyle.container}>
      <View style={InputBoxStyle.inputHolder}>
        <Text style={InputBoxStyle.label}>{`Enter ${props.label}`}</Text>
        <TextInput
          onChangeText={(e) => props.onChange(e)}
          name={''}
          style={InputBoxStyle.input}
          secureTextEntry={props.secureText}
          placeholder={`Enter your ${props.label}`}
          placeholderTextColor={'#616061'}
        />
      </View>
    </View>
  );
};

const InputBoxStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 5,
  },
  inputHolder: {
    marginStart: 10,
    marginEnd: 10,
  },
  label: {
    fontSize: 12,
    padding: 5,
    color: '#616061',
  },
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: color.brand_color,
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
});

export default Login;
