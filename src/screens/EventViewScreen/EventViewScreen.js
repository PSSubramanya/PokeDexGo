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
