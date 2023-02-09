import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Modal, Portal, Provider} from 'react-native-paper';

import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import styles from './styles';
import moment from 'moment';
import CalendarView from '../../components/CalendarView/CalendarView';
import TimelineCard from '../../components/TimelineCard/TimelineCard';
import Button from '../../components/Button/Button';
import eventsDisplayMockData from '../../ultilities/mockData/eventsPerDay';
import colors from '../../constants/colors';

const EventViewScreen = props => {
  const selectedDate = props?.route?.params?.selectedDate;

  const [selectedStartDate, setSelectedStartDate] = useState(selectedDate);
  const [eventsData, setEventsData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [checkLists, setCheckLists] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  // const tempDescriptionData = [
  //   'abcde ascac acsacaca aacacacacascacasc ascascascasc',
  //   'babcde ascacb',
  //   'cabcde acsacaca aacacacacascacasc ascascascasc',
  //   'eabcde ascac acsacaca',
  //   'dabcde ascac acsacaca aacacacacascacasc ascascascasc',
  // ];
  let tempDescriptionData;

  useEffect(() => {
    const displayableEvents = eventsDisplayMockData.filter(
      data =>
        data?.eventDate === moment(selectedStartDate).format('DD/MM/YYYY'),
    );
    setEventsData(displayableEvents);
  }, [selectedStartDate]);

  const showModal = () => setModalVisible(true);

  const hideModal = () => setModalVisible(false);

  const cardContainerView = item => {
    return (
      <View style={styles.timelineCardStyle}>
        <View style={styles.flexRowStyle}>
          <View style={styles.cardHeaderSection}>
            <Image
              source={{uri: item?.eventImage}}
              height={1}
              width={1}
              style={styles.eventImage}
              resizeMode={'contain'}
            />
          </View>

          <View style={styles.cardBodySection}>
            <View>
              <Text style={styles.eventName}>{item.eventName}</Text>
              <Text style={styles.eventDescription}>
                {item.eventDescription}
              </Text>
            </View>
            <Text style={styles.eventTimeStyle}>
              {`starts at ${item.eventTime}`}
            </Text>
          </View>
        </View>
        <View style={styles.cardFooterSection}>
          <TouchableOpacity
            onPress={() => {
              const tempNotificationsArray = notifications;
              let tempArray = [];

              if (tempNotificationsArray.includes(item)) {
                tempArray = tempNotificationsArray.filter(obj => obj !== item);
                setNotifications(tempArray);
                return;
              } else {
                tempArray = [...tempNotificationsArray, item];
                setNotifications(tempArray);
              }
            }}>
            <View style={{}}>
              <Image
                source={
                  notifications.includes(item)
                    ? imagePaths.notificationsOnIcon
                    : imagePaths.notificationsOffIcon2
                }
                height={1}
                width={1}
                style={styles.notificationIcon}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const tempCheckListArray = checkLists;
              let tempArray = [];

              if (tempCheckListArray.includes(item)) {
                tempArray = tempCheckListArray.filter(obj => obj !== item);
                setCheckLists(tempArray);
                return;
              } else {
                tempArray = [...tempCheckListArray, item];
                setCheckLists(tempArray);
              }
            }}>
            <Image
              source={
                checkLists.includes(item)
                  ? imagePaths.checkmarkOnIcon
                  : imagePaths.checkmarkOffIcon
              }
              height={1}
              width={1}
              style={styles.checkmarkIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TimelineCard
        cardContainerView={cardContainerView(item)}
        timestamp={item.eventTime}
        onPress={() => {
          showModal();
          setModalData(item);
        }}
        // timelinetype={'single'} // so we can make slight changes for range style
      />
    );
  };

  const modalContainer = () => {
    return (
      <View style={styles.modalInnerStyle}>
        <Text style={styles.modalTextStyle}>{modalData.eventName}</Text>
        <Image
          source={{uri: modalData?.eventImage}}
          height={1}
          width={1}
          style={styles.modalImage}
          resizeMode={'contain'}
        />
        <Text style={[styles.modalDescriptionStyle, styles.purpleTextColor]}>
          {`Starts at ${modalData.eventTime}`}
        </Text>
        <FlatList
          contentContainerStyle={styles.descriptionDataContentView}
          data={modalData?.eventDescription?.split(',')}
          keyExtractor={item => item}
          renderItem={({item}) => {
            return (
              <View style={styles.descriptionView}>
                <Text style={styles.descriptionText}>{item}</Text>
              </View>
            );
          }}
        />
        <Button
          buttonStyle={[styles.buttonStyle, styles.viewButton]}
          buttonTextStyle={[styles.viewButtonText]}
          onPress={() => {
            hideModal();
          }}
          buttonText={strings.close}
        />
      </View>
    );
  };

  return (
    <Provider>
      <SafeAreaView style={{}}>
        <Portal>
          <Modal
            style={styles.modalMarginStyle}
            visible={modalVisible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalExternalStyle}>
            {modalContainer()}
          </Modal>
        </Portal>
        <ScrollView>
          <CalendarView
            setSelectedStartDate={setSelectedStartDate}
            selectedStartDate={selectedStartDate}
          />
          {eventsData?.length !== 0 ? (
            <View>
              <View style={styles.flatListKnob} />
              <FlatList
                data={eventsData}
                keyExtractor={item => item.id}
                renderItem={renderItem}
              />
              <View style={styles.flatListKnob} />
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

export default EventViewScreen;

// Datepicker build it
// Add 2 timepickers so we can implement range

// Implement Handlebars

// At same time if there are more than 1 event at the same time on same day, use serial numbers to differentiate it
// Add range of time like from 2-5 for events duration
// So basically add types for these somehow
// If there is only 1 event in a time range make sure the card height resizes to that range limit eg. 2 - 5 pm
// If there are multiple events, then split the range into so many cards and make sure the whole cards is within the time range
// animate the cards
// add a thread like UI effect for timeline flatlist
// SORT Events based on time

/*------------- */

// For event timeline
// eventname - DONE
// event bonus info - DONE
// event pokemon image - DONE
// on click may be a pop up to show better info - DONE
// edit option to edit it in pop up menu
// notification icon -  clickable - DONE
// check list to mark if reminder is done or not - can replcae this by the notification icon for better UI/UX purpose - DONE
// time stamp - decide side or at the top - side better cos for community day I can show range of hours 2- 5 for example(this if updation in next version)
// left thick border line colored - DONE

// Make timeline style card to display events
// also make it like checklist so I can say done for the tasks done, else add a tag in it to make it remind u again
// Also make dates display in home page scrollable/ carousal
// add time picker also for the events
// add push notification
// add online and offline notification
// add firebase+ analytics integration
// add notificatoin postpone and snoozing option etc.
// add redux
// learn and implement backend
// upload to playstore
