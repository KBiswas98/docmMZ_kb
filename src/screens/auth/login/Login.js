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
import IconM from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import {Host} from '../../../config/settings/Connection';
import NavigationActions from 'react-navigation/src/NavigationActions';
import {_checkLogin, _saveDataToStorage} from '../../../config/common/Storage';

const Login = props => {
  const [data, setData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    
  }, [loading]);

  const handelEmailInput = e => {
    console.log(e.target);
    setData({...data, email: e});
  };

  const handelPasswordInput = e => {
    setData({...data, password: e});
  };

  const _save = async userData => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData), () => {
      props.navigation.navigate('Setting');
    });
  };

  const _handelLogin = () => {
    console.log(data);

    const config = {
      'Content-Type': 'application/json',
    };

    axios
      .post(`${Host}/patient/authenticate`, data, config)
      .then(result => {
        // console.log(result);
        if (result.status) {
          const __data = {
            email: result.data.email,
            name: result.data.name,
            id: result.data._id,
          };
          _save(__data);
        }
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return loading ? (
    <Text>Loading..</Text>
  ) : (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <Icon
          style={{position: 'absolute', margin: 15}}
          name="arrow-left-circle"
          color={'#000'}
          size={25}
          // onPress={() => props.navigation.dispatch(NavigationActions.back())}
          // onPress={() => props.navigation.goBack(null)}
          onPress={() => props.navigation.navigate('Setting')}
        />
        <HeadText headmsg={'Welcome,'} subMsg={'Sign in to continue!'} />
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
        {/* <TextInput label={'Email Id'} placeholder="email" onChangeText={e => setData({...data,email: e})}/> */}
        {/* <TextInput label={'Password'} placeholder="password" onChange={handelPasswordInput} /> */}
        <SubText text={'Forgot Password?'} />
        <ActionButton
          onClick={_handelLogin}
          label={'Login'}
          backgroundColor={'#e755cf'}
          color={'#fff'}
          icon={false}
        />
        <ActionButton
          label={'Continue with Facebook'}
          backgroundColor={'#e9e9ea'}
          color={'#3b1ce7'}
          icon={true}
        />
      </View>
      <BottomText
        onPress={() =>
          props.navigation.navigate(
            'Auth',
            {},
            NavigationActions.navigate({routeName: 'SignUp'}),
          )
        }
        text={`I'm a new User.`}
        linkText={'Sign Up'}
        color={'#e755cf'}
      />
    </ScrollView>
  );
};

const HeadText = props => {
  return (
    <View style={HeadTextStyle.container}>
      <Text style={HeadTextStyle.mainmsg}>{props.headmsg}</Text>
      <Text style={HeadTextStyle.subMsg}>{props.subMsg}</Text>
    </View>
  );
};

const HeadTextStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 30,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 60,
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
    color: '#59595a',
  },
});

const SubText = props => {
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
    fontSize: 16,
    marginBottom: 10,
  },
});

const InputBox = props => {
  return (
    <View style={InputBoxStyle.container}>
      <View style={InputBoxStyle.inputHolder}>
        <Text style={InputBoxStyle.label}>{`Enter ${props.label}`}</Text>
        <TextInput
          onChangeText={e => props.onChange(e)}
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
    fontSize: 16,
    padding: 5,
    color: '#616061',
  },
  input: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#ea57d2',
    borderRadius: 6,
    borderWidth: 1,
    paddingHorizontal: 15,
    width: '100%',
  },
});

const ActionButton = props => {
  return (
    <View style={ActionButtonStyle.container}>
      <TouchableOpacity
        style={[
          ActionButtonStyle.btn,
          {backgroundColor: props.backgroundColor, color: props.color},
        ]}
        onPress={props.onClick}>
        <View style={ActionButtonStyle.row_Box}>
          {props.icon ? (
            <Icon
              style={ActionButtonStyle.icon}
              name="facebook"
              color={'#fff'}
              size={16}
            />
          ) : null}
          <Text style={[ActionButtonStyle.btnText, {color: props.color}]}>
            {props.label}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ActionButtonStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,

    marginEnd: 10,
    marginStart: 10,
  },
  btn: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'normal',
    letterSpacing: 1,
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginEnd: 5,
    backgroundColor: '#3b1ce7',
    padding: 2,
    borderRadius: 2,
  },
});

const BottomText = props => {
  return (
    <View style={[BottomTextStyle.container, BottomTextStyle.row_Box]}>
      <Text style={BottomTextStyle.text}>{props.text}</Text>
      <TouchableOpacity onPress={props.onPress}>
        <Text
          style={[
            BottomTextStyle.text,
            {color: props.color, fontWeight: 'bold'},
          ]}>
          {props.linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const BottomTextStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10,
    marginEnd: 10,
    marginStart: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    marginEnd: 2,
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
