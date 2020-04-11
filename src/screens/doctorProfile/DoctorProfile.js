/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import {text, color} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/SimpleLineIcons';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';
import Loading from '../loading/Loading';
import TopNavbar from '../../components/prefab/TopNavbar/TopNavbar';
import {LabaledInput} from '../../components/primitive/Input/Input';
import Button from '../../components/primitive/Button/Button';
import {useSelector, useDispatch} from 'react-redux';
import {addScheduleToRedux} from '../../redux/action/schedule';
import NavigationActions from 'react-navigation/src/NavigationActions';

const DoctorProfile = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [inputs, setInputs] = useState({
    name: 'no Name',
    reason: '',
    contact: '',
  });
  const scheduleData = useSelector(state => state.ScheduleReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('from redux');
    console.log(scheduleData);

    _getDataFromLocalStore();

    const _id = props.navigation.state.params.id;
    console.log(_id);
    const _getData = __id => {
      axios
        .get(`${Host}/doctors/getdoc/${__id}`)
        .then(result => {
          if (result.status) {
            let first = result.data.data.appointments.find(
              item => item.booked === false,
            );

            dispatch(
              addScheduleToRedux({
                id: first['_id'],
                date: first['bookedFor'].slice(0, 10),
                time: first['bookedFor'].slice(11, 16),
              }),
            );
            setData(result.data.data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    _getData(_id);
  }, [loading]);

  const _getDataFromLocalStore = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      // console.log(result);
      if (result === null || result === undefined) {
        props.navigation.navigate('Auth');
      }
      setUser(result);
    });
  };

  const onSubmit = () => {
    console.log(JSON.parse(user).id);

    const _data = {
      patient: JSON.parse(user).id,
      transactionId: '0000',
      timeSlot: scheduleData.id,
      practise: data._id,
    };

    const config = {
      'Content-Type': 'application/json',
    };

    console.log(_data);

    axios
      .post(`${Host}/appointment/book`, _data, config)
      .then(result => {
        console.log(result.data);
        props.navigation.navigate('appointmentSuccess', {
          name: inputs.name,
          time: scheduleData.time,
          date: scheduleData.date,
          doctorName: data.basic.name
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  const changeTimeAndDate = (time, date) => {
    setInputs({...inputs, time: time, date: date});
  };

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{backgroundColor: color.background}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={topNavBar_styles.header_container}>
            <TopNavbar nav={props} mode={true} />
          </View>
          <View style={doctorprofile.details}>
            <ProfileBox nav={props} data={data} />
          </View>
          <View>
            <SortSchedule
              nav={props}
              data={data}
              schedule={scheduleData}
              changeDateTime={changeTimeAndDate}
              input={inputs}
            />
          </View>
          <View style={doctorprofile.inputs}>
            <LabaledInput
              label="Patient Name"
              onChange={e => setInputs({...inputs, name: e})}
              value={inputs.name}
            />
            <LabaledInput
              label="Reason for visit"
              onChange={e => setInputs({...inputs, reason: e})}
              value={inputs.reason}
            />
            <LabaledInput
              label="Contact Number"
              onChange={e => setInputs({...inputs, contact: e})}
              type="number-pad"
              value={inputs.contact}
            />
          </View>
          {/* <MapPart nav={props} data={data} /> */}
          <View>
            <Consult fee={'2000'} currency={'$'} />
          </View>
          {/* <DoctorsActivity nav={props} data={data} /> */}
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 20,
            }}>
            <Button
              deafult={true}
              title={'CANCEL'}
              t_text={true}
              onlyBorder
              onClick={() => props.navigation.goBack()}
            />
            <Button
              deafult={true}
              title={'CONFIRM'}
              normal
              shadow
              onClick={onSubmit}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const doctorprofile = StyleSheet.create({
  details: {
    marginTop: -100,
  },
  inputs: {
    margin: 25,
  },
});

const SortSchedule = props => {
  return (
    <View style={sortschedule.container}>
      <View
        onTouchStart={() =>
          props.nav.navigation.navigate('scheduleScreen2', {
            schedule: props.data.appointments,
            id: props.data._id,
          })
        }
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/icons/calander.png')}
          style={{padding: 10, height: 35, width: 35, marginRight: 13}}
        />
        <View>
          <Text style={{fontSize: 13, color: color.text_on_bg}}>
            {props.schedule.date}
          </Text>
          <Text
            style={{fontSize: 18, fontWeight: '600', color: color.brand_color}}>
            {props.schedule.time || '10.00AM - 11.00AM'}
          </Text>
        </View>
      </View>
      <View>
        <View
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="md-checkmark-circle"
            size={18}
            color={color.available}
            style={{padding: 10}}
          />
          <Text style={{color: color.available}}>Avaliable</Text>
        </View>
      </View>
    </View>
  );
};

const sortschedule = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
});

const TopNavBar = props => {
  return (
    <View style={topNavBar_styles.top_bar}>
      <Icon
        name="arrow-left-circle"
        color={'#000'}
        size={25}
        onPress={() => props.nav.navigation.navigate('homeScreen')}
      />
      <Text style={topNavBar_styles.heading}>
        {props.nav.navigation.state.params.name}
      </Text>
    </View>
  );
};

const topNavBar_styles = StyleSheet.create({
  top_bar: {
    paddingTop: 45,
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: '300',
    color: text.color_1,
  },
  heading_bold: {
    fontWeight: 'bold',
    color: text.color_0,
  },
  holder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drop_down: {
    padding: 10,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: text.color_2,
    marginRight: 20,
  },
  icon: {
    height: 18,
    width: 18,
  },
  header_container: {
    backgroundColor: color.brand_color,
    paddingBottom: 105,
  },
});

const ProfileBox = props => {
  return (
    <View style={profilebox.container}>
      <View style={profilebox.pro_contain}>
        <Image
          style={[profilebox.profile_pic]}
          source={require('../../assets/images/doc.jpg')}
        />
      </View>
      <View style={profilebox.text}>
        <View style={profilebox.detail_container}>
          <Text
            style={{
              fontSize: 20,
              maxWidth: 170,
              fontWeight: 'bold',
              letterSpacing: 0.3,
              color: color.white_color,
              textAlign: 'right',
            }}>
            {props.data.basic.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              letterSpacing: 0.2,
              color: color.white_color,
              opacity: 0.65,
            }}>
            Allergists
          </Text>
        </View>
        <View style={profilebox.text_container}>
          <View style={profilebox.about}>
            <Image
              source={require('../../assets/icons/patient.png')}
              style={profilebox.icon}
            />
            <View style={{marginRight: 20}}>
              <Text style={{fontSize: 15}}>1.5k</Text>
              <Text style={{fontSize: 9, fontWeight: '300', opacity: 0.5}}>
                Patients
              </Text>
            </View>
          </View>
          <View style={profilebox.about}>
            <Image
              source={require('../../assets/icons/wait.png')}
              style={profilebox.icon}
            />
            <View>
              <Text style={{fontSize: 15}}>5 Years</Text>
              <Text style={{fontSize: 9, fontWeight: '300', opacity: 0.5}}>
                Experience
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const profilebox = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'relative',
    margin: 20,
  },
  pro_contain: {
    elevation: 10,
  },
  profile_pic: {
    height: 145,
    width: 145,
    borderRadius: 14,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  text: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
  },
  detail_container: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  text_container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 45,
  },
  about: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 15,
    marginRight: 15,
  },
});

const Consult = props => {
  return (
    <View style={consult.container}>
      <Image
        source={require('../../assets/icons/pay.png')}
        style={{height: 22, width: 22, marginRight: 10}}
      />
      <Text style={{fontSize: 14, marginRight: 10}}>Consultation Fee</Text>
      <Text style={consult.fee}>
        {props.currency}
        {props.fee}
      </Text>
    </View>
  );
};

const consult = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  fee: {
    color: color.brand_color,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

// const ProfileBox = props => {
//   // console.log(props.data);
//   return (
//     <View style={ProfileBoxStyle.container}>
//       <View style={ProfileBoxStyle.row_Box}>
//         <Image
//           style={ProfileBoxStyle.profile_pic}
//           source={require('../../assets/images/doc.jpg')}
//         />
//         <View style={ProfileBoxStyle.actionHolder}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#fdddb1',
//               borderRadius: 13,
//               marginLeft: 7,
//             }}>
//             <Icon
//               name="chat"
//               size={22}
//               color={'#f9a025'}
//               style={{padding: 10}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#b2eaf1',
//               borderRadius: 13,
//               marginLeft: 7,
//             }}>
//             <IconM
//               name="call"
//               size={22}
//               color={'#0ab9d0'}
//               style={{padding: 10}}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: '#d5d4d3',
//               borderRadius: 13,
//               marginLeft: 7,
//             }}>
//             <Icon
//               name="video"
//               size={22}
//               color={'#555453'}
//               style={{padding: 10}}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View
//         style={[ProfileBoxStyle.row_Box, {justifyContent: 'space-between'}]}>
//         <Text style={ProfileBoxStyle.name}>
//           {props.nav.navigation.state.params.tag}
//         </Text>
//         <Text style={ProfileBoxStyle.rating}>
//           {/* <Icons name="star" size={15} color={'#9055BA'} /> */}
//           {props.nav.navigation.state.params.rating
//             ? props.nav.navigation.state.params.rating
//             : 4.4}
//         </Text>
//       </View>
//       <Text style={ProfileBoxStyle.description}>
//         {props.nav.navigation.state.params.description
//           ? props.nav.navigation.state.params.description
//           : 'Description Textlorem missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor.missing keys for items, make sure to specify a key or id property on each item or provide a custom keyExtractor. '}
//       </Text>
//     </View>
//   );
// };

const ProfileBoxStyle = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 20,
  },
  profile_pic: {
    height: 170,
    width: 140,
    borderRadius: 10,
    margin: 5,
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionHolder: {
    display: 'flex',
    flexDirection: 'row',
    marginStart: 20,
    marginTop: 30,
  },
  rating: {
    backgroundColor: '#9055BA',
    borderRadius: 5,
    paddingHorizontal: 13,
    paddingVertical: 5,
    // fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    letterSpacing: 0.09,
  },
  description: {
    margin: 10,
    fontSize: 12,
    // textAlign: "center",
    opacity: 0.5,
  },
});

const MapPart = props => {
  return (
    <View style={MapPartStyle.container}>
      <View style={MapPartStyle.row_Box}>
        <Image
          source={require('../../assets/images/map.jpg')}
          style={MapPartStyle.icon}
        />
        <View style={MapPartStyle.columnBox}>
          <View
            style={[
              MapPart.row_Box,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <Icons name="location-pin" size={15} color={'#b4b4ad'} />
            <Text style={MapPartStyle.headText}>Address</Text>
          </View>
          <Text style={MapPartStyle.description}>
            {props.data.address[0].address_1
              ? props.data.address[0].address_1 +
                ', ' +
                props.data.address[0].city +
                ', ' +
                props.data.address[0].state +
                ', ' +
                props.data.address[0].country_name
              : 'Address'}
          </Text>

          <View
            style={[
              MapPart.row_Box,
              {flexDirection: 'row', alignItems: 'center', marginTop: 15},
            ]}>
            <Icons name="calendar" size={15} color={'#b4b4ad'} />
            <Text style={MapPartStyle.headText}>Daily Practect</Text>
          </View>
          <Text style={MapPartStyle.description}>
            {props.nav.navigation.state.params.practect
              ? props.nav.navigation.state.params.practect
              : 'Monday - Friday'}
          </Text>
          <Text style={MapPartStyle.description}>
            {props.nav.navigation.state.params.time
              ? props.nav.navigation.state.params.time
              : 'Open till 7pm'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MapPartStyle = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    height: 150,
    width: '50%',
  },
  columnBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 5,
    marginLeft: 15,
  },
  headText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6c6c66',
    padding: 5,
  },
  description: {
    fontSize: 11,
    maxWidth: 150,
    color: '#6c6c66',
    marginStart: 20,
  },
});

const DoctorsActivity = props => {
  useEffect(() => {
    // console.log(props.data);
  });
  return (
    <View style={DoctorsActivityStyle.container}>
      <View style={DoctorsActivityStyle.row_Box}>
        <TouchableOpacity
          style={[DoctorsActivityStyle.box, {backgroundColor: '#02b6ee'}]}
          onPress={() =>
            props.nav.navigation.navigate('scheduleScreen', {
              schedule: props.data.appointments,
              id: props.data._id,
            })
          }>
          <Icon name="file-document" size={22} color={'#fff'} />
          <Text style={[DoctorsActivityStyle.text]}>List Of Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[DoctorsActivityStyle.box, {backgroundColor: '#151d64'}]}>
          <Icon name="doctor" size={22} color={'#fff'} />
          <Text style={[DoctorsActivityStyle.text]}>Doctor's Daily Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const DoctorsActivityStyle = StyleSheet.create({
  container: {
    position: 'relative',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
  },
  row_Box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 15,
    width: '48%',
    padding: 30,
    margin: '2%',
    borderRadius: 15,
    alignItems: 'center',
    maxHeight: 90,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    padding: 15,
    paddingLeft: 0,
  },
});
export default DoctorProfile;
