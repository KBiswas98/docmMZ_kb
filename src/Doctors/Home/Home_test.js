import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  StatusBar,
  ScrollView,
} from 'react-native';

import Header from '../../components/prefab/Header/Header';
import RoundedImageHolder from '../../components/prefab/RoundedImageHolder/RoundedImageHolder';
// import BottomNavigation from '../../components/BottomNavigation/BottomNavigation.component';
// import {ScrollView} from 'react-native-gesture-handler';
import SearchBar from '../../components/prefab/SearchBar/SearchBar';
import BasicCard from '../../components/prefab/BasicCard/BasicCard';

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import CardContent from './components/cardContent.component';
// import ScheduleAppointment from './components/scheduleAppointment.component';
import ToggleButton from '../../components/primitive/ToggleButton/ToggleButton';
import {TouchableOpacity} from 'react-native-gesture-handler';

/**
 *
 * CONTENT CONTAINER
 *
 */
function ContentContainer({children, style}) {
  return (
    <View
      style={[ContentContainerStyle.Container, style ? style.Container : null]}>
      {children}
    </View>
  );
}
const ContentContainerStyle = StyleSheet.create({
  Container: {
    width: '100%',
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    transform: [
      {
        translateY: -60,
      },
    ],
  },
});

/**
 *
 * Card Content
 *
 */

function CardContent({Profile, DoctorName, rating, Specialization, onPress}) {
  const ratingStars = (() => {
    let arr = [];
    let i, j;
    for (i = 0; i < rating; i++) {
      arr.push(
        <FontAwesomeIcon key={i} name="star" size={12} color="#F4C130" />,
      );
    }
    for (j = 0; j < 5 - rating; j++) {
      arr.push(<Icon key={i + j} name="star" size={11} color="#F4C130" />);
    }
    return arr;
  })();
  return (
    <>
      <View style={CardContentStyles.AvailableDoctorsCardContent}>
        {Profile}
        <View style={CardContentStyles.AvailableDoctorsDetails}>
          <View style={CardContentStyles.AvailableDoctorsNameContainer}>
            <Text style={CardContentStyles.AvailableDoctorsName}>
              {DoctorName}
            </Text>
            <View style={CardContentStyles.AvailableDoctorsRating}>
              {ratingStars}
            </View>
          </View>
          <Text style={CardContentStyles.AvailableDoctorsSpecialization}>
            {Specialization}
          </Text>
          <View style={CardContentStyles.AvailableDoctorsAvailableTimes}>
            <Text style={CardContentStyles.AvailableDoctorsAvailableTime}>
              9:00
            </Text>
            <Text
              style={[
                CardContentStyles.AvailableDoctorsAvailableTime,
                {
                  backgroundColor: 'rgba(255,255,255,0)',
                  fontWeight: '600',
                },
              ]}>
              11:00
            </Text>
            <Text
              style={[
                CardContentStyles.AvailableDoctorsAvailableTime,
                {
                  backgroundColor: 'rgba(255,255,255,0)',
                  fontWeight: '600',
                },
              ]}>
              16:00
            </Text>
          </View>
        </View>
      </View>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <TouchableOpacity onPress={onPress}>
          <FontAwesomeIcon name="arrow-right" size={18} color="#555" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
  },
  AvailableDoctorsDetails: {
    marginLeft: 10,
  },
  AvailableDoctorsNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  AvailableDoctorsName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  AvailableDoctorsRating: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  AvailableDoctorsSpecialization: {
    color: '#666',
  },
  AvailableDoctorsAvailableTimes: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  AvailableDoctorsAvailableTime: {
    backgroundColor: '#F4C130',
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  AvailableDoctorsContinueButton: {
    backgroundColor: '#F4C130',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

function Home({navigation}) {
  const [showPopup, setShowPopup] = useState(false);
  const PopupTranslateY = useRef(new Animated.Value(0)).current;
  const onPress = () => {
    Animated.sequence([
      Animated.timing(PopupTranslateY, {
        toValue: showPopup ? 0 : 1,
        easing: Easing.bezier(0.52, 0.5, 0.08, 0.78),
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
    setShowPopup(!showPopup);
  };

  return (
    <>
      <StatusBar hidden={true} />
      <View style={HomeStyles.Container}>
        <Header
          style={{
            Container: {
              flex: 3,
            },
          }}>
          <Text style={HomeStyles.HeaderPrimaryText}>Find a doctor</Text>
          <ToggleButton text="NOW" />
        </Header>
        <ContentContainer
          style={{
            Container: {
              flex: 5,
            },
          }}>
          <ScrollView style={{marginTop: 8}}>
            <SearchBar />
            <ScrollView
              horizontal={true}
              style={HomeStyles.CatagoryScroll}
              contentContainerStyle={HomeStyles.ContentCardContainer}>
              <BasicCard active={true}>
                <Icon name="people" size={42} color="#fff" />
                <Text style={[HomeStyles.CatagoryText, {color: '#fff'}]}>
                  Family Physicians
                </Text>
              </BasicCard>
              <BasicCard>
                <Icon name="people" size={42} color="#000" />
                <Text style={HomeStyles.CatagoryText}>Pulmonologists</Text>
              </BasicCard>
              <BasicCard>
                <Icon name="heart" size={42} color="#000" />
                <Text style={HomeStyles.CatagoryText}>Cardiologist</Text>
              </BasicCard>
            </ScrollView>
            <View style={HomeStyles.AvailableDoctors}>
              <Text style={HomeStyles.AvailableDoctorsHeaderText}>
                Available Doctors
              </Text>
              <View style={HomeStyles.AvailableDoctorsCardContainer}>
                <BasicCard
                  style={{
                    CardContainer: HomeStyles.AvailableDoctorsBasicCard,
                  }}>
                  <CardContent
                    DoctorName="Dr.Haley"
                    rating={4}
                    // onPress={}
                    Specialization="General Dentist"
                    Profile={
                      <RoundedImageHolder
                        sourceUrl={require('../../assets/images/doc.jpg')}
                        style={{
                          ImageWrapper: {
                            height: 70,
                            width: 70,
                          },
                        }}
                      />
                    }
                  />
                </BasicCard>
                <BasicCard
                  style={{
                    CardContainer: HomeStyles.AvailableDoctorsBasicCard,
                  }}>
                  <CardContent
                    onPress={() => {
                      onPress();
                    }}
                    DoctorName="Dr.Smith"
                    rating={5}
                    Specialization="Orthodontist"
                    Profile={
                      <RoundedImageHolder
                        sourceUrl={require('../../assets/images/doc.jpg')}
                        style={{
                          ImageWrapper: {
                            height: 70,
                            width: 70,
                          },
                        }}
                      />
                    }
                  />
                </BasicCard>
                <BasicCard
                  style={{
                    CardContainer: HomeStyles.AvailableDoctorsBasicCard,
                  }}>
                  <CardContent
                    onPress={() => {
                      onPress();
                    }}
                    DoctorName="Dr.Smith"
                    rating={5}
                    Specialization="Orthodontist"
                    Profile={
                      <RoundedImageHolder
                        sourceUrl={require('../../assets/images/doc.jpg')}
                        style={{
                          ImageWrapper: {
                            height: 70,
                            width: 70,
                          },
                        }}
                      />
                    }
                  />
                </BasicCard>
              </View>
            </View>
          </ScrollView>
        </ContentContainer>
        {/* <BottomNavigation PopupTranslateY={PopupTranslateY} />
        <ScheduleAppointment
          PopupTranslateY={PopupTranslateY}
          onPress={onPress}
        /> */}
      </View>
    </>
  );
}

const HomeStyles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  HeaderPrimaryText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -10,
  },
  ContentCardContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  CatagoryScroll: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
  },
  CatagoryText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  AvailableDoctors: {
    flex: 1,
    marginTop: 10,
  },
  AvailableDoctorsBasicCard: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    alignItems: 'flex-start',
    height: 'auto',
    position: 'relative',
    paddingBottom: 25,
  },
  AvailableDoctorsHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  AvailableDoctorsCardContainer: {
    marginTop: 15,
  },
});
export default Home;
