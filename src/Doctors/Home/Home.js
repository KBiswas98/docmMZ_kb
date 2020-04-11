import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import BottomNavbar from '../../components/prefab/BottomNavbar.js/BottomNavbar';
import DoctorTopNavbar from '../../components/prefab/TopNavbar/DoctorTopNavbar';
import {color} from '../../config/styles/color';
import {useDispatch, useSelector} from 'react-redux';
import {addUserToRedux, addUserFullData} from '../../redux/action/auth';
import {Host} from '../../config/settings/Connection'
import axios from 'axios'

const Home = (props) => {
  const dispatch = useDispatch();
  var {width, height} = Dimensions.get('window');
  const [isLoading, setLoading] = useState(true);
  const data = useSelector((state) => state.AuthReducer.data);

  const _fetchData =(_id) => {
     axios.get(`${Host}/doctors/getdoc/${_id}`)
     .then(result => {
       console.log(result)
       if(result.status) {
         console.log(result.data.data)
         dispatch(addUserFullData(result.data.data))
       }
     })
     .catch( err => {
       console.log(err)
     })
  }

  useEffect(() => {
    _getDataFromLocalStore();
    console.log(data) 
  },[]);

  const _getDataFromLocalStore = async () => {
    await AsyncStorage.getItem('userData', (err, result) => {
      console.log(result);
      if (result === null || result === undefined) {
        props.navigation.navigate('Home');
      } else if (result.length > 2) {
        _fetchData(JSON.parse(result).id)
        dispatch(addUserToRedux(result));
      }
      setLoading(false);
    });
  };

  return isLoading ? (
    <Text>Loading..</Text>
  ) : (
    <SafeAreaView
      style={{
        // backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}>
      <ScrollView>
        <DoctorTopNavbar />
        <View
          style={{
            display: 'flex',
            flex: 1,
            // backgroundColor: 'pink',
            alignItems: 'flex-end',
            marginRight: 20,
            marginTop: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 100,
              display: 'flex',
            }}>
            <Text
              style={{
                fontSize: 28,
                textAlign: 'right',
                color: color.brand_color,
              }}>
              Hello
            </Text>
            <Text
              style={{
                fontSize: 28,
                textAlign: 'right',
                color: color.back_color,
                fontWeight: 'bold',
                letterSpacing: 1,
              }}>
              {JSON.parse(data).name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                textAlign: 'right',
                color: color.text_on_bg,
              }}>
              You have 4 consult left today
            </Text>

            <View style={{marginTop: 40}}>
              <Text style={{textAlign: 'right'}}>Upcomeing schedules</Text>
              <RecentMeeting day="today" name="ela" time="3.15 PM" />
              <RecentMeeting day="today" name="ela" time="3.15 PM" />
              <RecentMeeting day="today" name="ela" time="3.15 PM" />
              <RecentMeeting day="today" name="ela" time="3.15 PM" />
            </View>
          </View>
          <Image
            source={require('../../assets/images/doctrox_ultra.png')}
            style={{
              display: 'flex',
              flex: 1,
              width: width * 1,
              height: height * 1,
            }}
          />
        </View>
      </ScrollView>
      <BottomNavbar nav={props} />
    </SafeAreaView>
  );
};

const RecentMeeting = (props) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        elevation: 6,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
      }}>
      <Image
        source={require('../../assets/images/doc.jpg')}
        style={{height: 50, width: 50, borderRadius: 15, marginRight: 10}}
      />
      <View style={{minWidth: 100}}>
        <Text style={{textTransform: 'capitalize', fontSize: 17}}>
          {props.day}
        </Text>
        <Text
          style={{
            textTransform: 'capitalize',
            fontSize: 12,
            color: color.text_on_bg,
            fontWeight: '300',
          }}>
          {props.name + ' | ' + 'At ' + props.time}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(Home);
