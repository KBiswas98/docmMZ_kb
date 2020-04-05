import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TopNavbar from '../../components/prefab/TopNavbar/TopNavbar';
import {color} from '../../config/styles/color';
import {useDispatch} from 'react-redux';
import {addScheduleToRedux} from '../../redux/action/schedule';

/**
 *  > create schedule for next 7 days
 */

const _getDate = dayCount => {
  var currentDate = new Date(
    new Date().getTime() + 24 * dayCount * 60 * 60 * 1000,
  );
  return currentDate.toISOString();
};

var schel = [];

const Schedule2 = props => {
  const [data, setData] = useState();
  const [isSelected, setSelected] = useState(false);
  const dispatch = useDispatch();

  const handelClick = (_id, date) => {
    setSelected(!isSelected);

    const _date = date.slice(0, 10);
    const _time = date.slice(11, 16);
    dispatch(addScheduleToRedux({id: _id, date: _date, time: _time}));
    console.log(`-------Id is : ${_id} and date: ${_date} and time : ${_time}`);
    props.navigation.goBack();
  };

  useEffect(() => {
    props.navigation.state.params.schedule.map(days => {
      console.log(`isBooked: ${days.booked} day: ${days.bookedFor}`);
    });
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <TopNavbar
          nav={props}
          mode={true}
          style={{backgroundColor: color.brand_color}}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          {props.navigation.state.params.schedule.map(days => {
            return (
              !days.booked && (
                <Option data={days} click={handelClick} selected={isSelected} />
              )
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Option = props => {
  const [isSelected, setSelected] = useState(false);

  const handelClick = (_id, date) => {
    setSelected(!isSelected);
    console.log(`Id is : ${_id} and date: ${date}`);
    props.click(props.data._id, props.data.bookedFor);
  };

  return (
    <TouchableOpacity
      onPress={() => handelClick(props.data._id, props.data.bookedFor)}
      style={[
        {
          borderRadius: 4,
          borderWidth: 2,
          borderColor: color.brand_color,
          padding: 5,
          width: 100,
          height: 80,
          margin: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        isSelected && {backgroundColor: color.brand_color},
      ]}>
      <Text
        style={[
          {fontSize: 18, fontWeight: 'bold'},
          isSelected && {color: '#fff'},
        ]}>
        {props.data.bookedFor.slice(11, 16)}
      </Text>
      <Text
        style={[
          {fontSize: 9, color: '#000', fontWeight: '300'},
          isSelected && {color: '#fff'},
        ]}>
        {props.data.bookedFor.slice(0, 10)}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Schedule2);
