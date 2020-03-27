import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import {text} from '../../config/styles/color';
import Icon from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {Host} from '../../config/settings/Connection';
import NavigationActions from 'react-navigation/src/NavigationActions';

const __getScheduleOfADate = (date /* iso format*/, allSchedule) => {
  let dailySchedule = [];
  allSchedule.map(item => {
    if (item.bookedFor.split('T')[0].localeCompare(date.split('T')[0]) === 0) {
      console.log(item.bookedFor);
      dailySchedule.push(item);
    }
  });

  return dailySchedule;
};

const __getTimgeFromIso = isoTime => {
  let t = new Date(isoTime);
  return t.getUTCHours() + ':' + t.getUTCMinutes();
};

const BookASchedule = (patientId, transactionId, timeSlot, practise, props) => {
  console.log(patientId);
  console.log(transactionId);
  console.log(timeSlot);
  console.log(practise);


  if(patientId === undefined || patientId === null) {
    props.navigation.navigate('Setting', {}, NavigationActions.navigate({routeName: 'Auth'}))
  }

  const data = {
    patient: patientId,
    transactionId: transactionId,
    timeSlot: timeSlot,
    practise: practise,
  };

  const config = {
    'Content-Type': 'application/json',
  };

  axios
    .post(`${Host}/appointment/book`, data, config)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
};

const Schedule = props => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({
    date: '00-00-0000',
    time: '00:00 AM',
    timeSlot: '',
    practise: '',
    transactionId: '1245',
  });

  const [showBook, setShowBook] = useState(false);

  const tougleBookPopup = () => {
    setShowBook(!showBook);
    console.log('comes');
  };

  const _checkForLogedIn = () => {
    const _data = AsyncStorage.getItem('userData');
    if (_data.length < 3) {
      props.navigation.navigate('Setting');
    } else {
      console.log('WOOOWOOW');
    }
  };

  const setUpBook = (date, time, bid) => {
    _checkForLogedIn();
    // console.log(id);
    setBook({date: date, time: time, timeSlot: bid});
  };

  const _getDate = dayCount => {
    var currentDate = new Date(
      new Date().getTime() + 24 * dayCount * 60 * 60 * 1000,
    );
    return currentDate.toISOString();
  };


  useEffect(() => {
    console.log(props.navigation.state.params.id);
    setData(props.navigation.state.params.schedule);

    const _getData = __id => {
      const param = {
        limit: '300',
        doctor: __id,
        date: new Date().toISOString(),
      };
      const config = {
        'Content-Type': 'application/json',
      };
      axios
        .post(`${Host}/appointment/get`, param, config)
        .then(result => {
          if (result.status) {
            setData(result.data.data);
            setLoading(false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    _getData(props.navigation.state.params.id);
    console.log(props.navigation.state.params.schedule);
  }, [loading]);

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <TopNavBar nav={props} heading={props.heading} />
          {/* <Day 
            showBookPopup={tougleBookPopup}
            setUpBook={setUpBook}
            _data={__getScheduleOfADate(_getDate(0),data)}
            _date={ 
              _getDate(0)
                .toString()
                .split('T')[0]
            }
          /> */}
          <Day
            showBookPopup={tougleBookPopup}
            setUpBook={setUpBook}
            _data={__getScheduleOfADate(_getDate(1), data)}
            _date={
              _getDate(1)
                .toString()
                .split('T')[0]
            }
          />
          <Day
            showBookPopup={tougleBookPopup}
            setUpBook={setUpBook}
            _data={__getScheduleOfADate(_getDate(2), data)}
            _date={
              _getDate(2)
                .toString()
                .split('T')[0]
            }
          />
          <Day
            showBookPopup={tougleBookPopup}
            setUpBook={setUpBook}
            _data={__getScheduleOfADate(_getDate(3), data)}
            _date={
              _getDate(3)
                .toString()
                .split('T')[0]
            }
          />
        </View>
      </ScrollView>
      {showBook ? (
        <Book
          bid={book.timeSlot}
          date={book.date}
          time={book.time}
          popup={tougleBookPopup}
          doc_id={props.navigation.state.params.id}
          nav={props}
        />
      ) : null}
    </View>
  );
};

const Book = props => {
  const [uid, setUid] = useState();

  const _getDataFromLocalStore = async () => {
    var obj = null;
    await AsyncStorage.getItem('userData', (err, result) => {
      if (result !== null) {
        obj = JSON.parse(result);
        setUid(obj.id);
      }
    });
  };

  useEffect(() => {
    _getDataFromLocalStore();
  });

  return (
    <View style={book.container}>
      <View style={[book.holder, book.shadow]}>
        <Icons
          onPress={props.popup}
          name="close"
          size={15}
          color={'#000'}
          style={{position: 'absolute', right: 0, marginTop: 7, marginRight: 7}}
        />
        <View style={book.date_and_time}>
          <View style={book.date_holder}>
            <Icons name="date" size={15} color={'#63596A'} />
            <Text style={book.text_b}>{props.date}</Text>
          </View>
          <View style={book.date_holder}>
            <Icons name="clock" size={15} color={'#63596A'} />
            <Text style={book.text_b}>{props.time}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={book.button}
          onPress={() => BookASchedule(uid, '12345', props.bid, props.doc_id, props.nav)}>
          <Text style={book.text}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const book = StyleSheet.create({
  date_and_time: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    paddingTop: 34,
    justifyContent: 'space-between',
  },
  date_holder: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    padding: 15,
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    // backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 200,
    paddingVertical: 40,
    paddingTop: 15,
    paddingHorizontal: 30,
  },
  date_time: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  holder: {
    backgroundColor: '#fff',
    display: 'flex',
    flex: 1,
    borderRadius: 5,
  },
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
  button: {
    paddingVertical: 10,
    backgroundColor: '#A16FC4',
    // opacity: 0.5,
    marginTop: 5,
    // marginVertical: 2,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text_b: {
    marginLeft: 6,
    textTransform: 'uppercase',
    color: '#525252',
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
        {/* {props.nav.navigation.state.params.name ? props.nav.navigation.state.params.name :'Schedule'} */}
        Schedule
      </Text>
    </View>
  );
};

const topNavBar_styles = StyleSheet.create({
  top_bar: {
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
});

const Day = props => {
  return (
    <View style={day.container}>
      <View>
        <Text style={day.date}>{props._date}</Text>
      </View>
      <View style={day.holder}>
        {props._data.map((item, index) => (
          <Slot
            bid={item._id}
            popup={props.showBookPopup}
            status={item.booked ? 'booked' : 'empty'}
            setUpBook={props.setUpBook}
            date={props._date}
            time={__getTimgeFromIso(item.bookedFor)}
          />
        ))}
      </View>
    </View>
  );
};

const day = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: 'bold',
    letterSpacing: 0.4,
    marginVertical: 5,
  },
  holder: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 20,
  },
});

const Slot = props => {
  const [selected, setSelect] = useState(false);

  const tougle = openPopup => {
    console.log('tougle' + props.bid);
    setSelect(!selected);
    props.setUpBook(props.date, props.time, props.bid);
    openPopup ? props.popup() : null;
  };

  return props.status === 'booked' ? (
    <View style={slot.container}>
      <Text style={slot.text_a}>{props.time}</Text>
    </View>
  ) : (
    <TouchableOpacity
      style={[slot.container, slot.open, selected ? slot.select : null]}
      onPress={() => tougle(true)}>
      <Text style={selected ? slot.text_a : {color: '#000'}}>{props.time}</Text>
    </TouchableOpacity>
  );
};

const slot = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#9055BA',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    height: 30,
    borderRadius: 5,
  },
  select: {
    backgroundColor: '#9055BA',
  },
  text_a: {
    color: '#fff',
  },
  open: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9055BA',
  },
});

export default Schedule;
