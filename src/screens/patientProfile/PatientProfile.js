import React, {Profiler, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Avater from '../../components/primitive/Avater/Avater';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';

const PatientProfile = props => {
  const [data, setData] = useState({
    id: '',
    name: 'no name',
    email: 'email@e.com',
    phoneNo: '8001981993',
    sex: 'male',
    dob: '0-0-0',
    zip: '000000',
  });

  const handelInputs = (e, name) => {
    setData({...data, [name]: e});
  };

  const _gettingDataFromStorage = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (result !== null) {
        result = JSON.parse(result);
        console.log(result.email);
        setData({
          ...data,
          id: result.id,
          email: result.email,
          name: result.name,
          phoneNo: result.phone,
          sex:
            result.sex === null || result.sex === undefined
              ? 'male'
              : result.sex,
          dob:
            result.dob === null || result.dob === undefined
              ? '0-0-0'
              : result.dob,
          zip:
            result.zip === null || result.zip === undefined
              ? 'male'
              : result.zip,
        });
      }
    });
  };

  useEffect(() => {
    _gettingDataFromStorage();
  }, []);

  const _save = async userData => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData), () => {
      //   props.navigation.navigate('Setting');
      ToastAndroid.showWithGravity(
        'Profile Updated.',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    });
  };

  const submit = () => {
    console.log(data);
    const _data = {
      id: data.id,
      sex: data.sex,
      dob: data.dob,
      phone: data.phoneNo,
      zip: data.zip,
      race: 'blabla',
      home: 'xxx',
      work: 'xxx',
      preferredNumber: 'phone',
      Address: {street: 'test'},
      active: true,
      wellnessReminder: true,
      appointmentReminderText: true,
      notify: true,
      ethnicity: 'blabla',
      lastLogin: '',
      bloodGroup: 'O+',
    };

    const config = {
      'Content-Type': 'application/json',
    };

    axios
      .post(`${Host}/patient/update`, _data, config)
      .then(result => {
        console.log('result');
        if (result.data.status) {
          console.log(result.data.data);
          const __data = {
            email: result.data.data.email,
            name: result.data.data.name,
            phone: result.data.data.phone,
            id: result.data.data._id,
            bloodGroup: result.data.data.bloodGroup,
            dob: result.data.data.dob,
            sex: result.data.data.sex,
            zip: result.data.data.zip,
          };
          _save(__data);

          // dispatch(addUserToRedux(data))
        }
        console.log(result.data.status);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView>
      <View style={profile.container}>
        <Icon
          name="arrow-left"
          color={'#000'}
          size={18}
          style={{position: 'absolute', left: 20, top: 20}}
          onPress={() => props.navigation.goBack()}
        />
        <View style={profile.profile_pic}>
          <Avater width={100} />
          <Edit style={{position: 'absolute', bottom: 20, right: 10}} />
        </View>
        <View style={profile.about}>
          <Options
            data={data.name}
            onChange={handelInputs}
            name={'user'}
            type={'name'}
            submit={submit}
            isEditable={false}
          />
          <Options
            data={data.email}
            onChange={handelInputs}
            name={'mail'}
            type={'email'}
            submit={submit}
            isEditable={false}
          />
          <Options
            data={data.phoneNo}
            onChange={handelInputs}
            name={'phone'}
            type={'phoneNo'}
            submit={submit}
            isEditable={true}
          />
          <Options
            data={data.sex}
            onChange={handelInputs}
            name={'user-x'}
            type={'sex'}
            submit={submit}
            isEditable={true}
          />
          <Options
            data={data.dob}
            onChange={handelInputs}
            name={'calendar'}
            type={'dob'}
            submit={submit}
            isEditable={true}
          />
          <Options
            data={data.zip}
            onChange={handelInputs}
            name={'book'}
            type={'zip'}
            submit={submit}
            isEditable={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const profile = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  profile_pic: {
    // backgroundColor: 'yellow',
    marginTop: 50,
  },
  about: {
    // backgroundColor: 'blue',
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
});

const Edit = props => {
  return (
    <TouchableOpacity style={[edit.container, props.style]}>
      <Icon
        style={edit.icon}
        name="edit-2"
        color={'#000'}
        size={props.iconSize || 13}
      />
    </TouchableOpacity>
  );
};

const edit = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: 22,
    height: 22,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',

    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    elevation: 50,
  },
  icon: {},
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 40,
  },
});

const Options = props => {
  const [editing, setEditing] = useState(false);
  return (
    <View style={options.container}>
      <Icon
        name={props.name}
        color={'#000'}
        size={props.iconSize || 20}
        style={{marginRight: 10}}
      />
      <TextInput
        autoFocus={editing}
        style={options.input}
        value={props.data}
        editable={editing}
        onChangeText={e => props.onChange(e, props.type)}
      />
      {editing && (
        <TouchableOpacity
          onPress={() => {
            setEditing(true), props.submit();
          }}
          style={{marginRight: 10}}>
          <Icon name="check" color={'#000'} size={props.iconSize || 18} />
        </TouchableOpacity>
      )}
      {props.isEditable && (
        <TouchableOpacity onPress={() => setEditing(!editing)}>
          <Icon
            name={editing ? 'x' : 'edit-2'}
            color={'#000'}
            size={props.iconSize || 15}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const options = StyleSheet.create({
  container: {
    // backgroundColor: 'pink',
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: 'green',
    flex: 1,
  },
});

export default PatientProfile;
