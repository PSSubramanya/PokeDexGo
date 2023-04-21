import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import imagePaths from '../../constants/imagePaths';
import strings from '../../constants/strings';
import {horizontalScale} from '../../ultilities/scale';
import moment from 'moment';
import styles from './styles';

const EventDisplayCard = props => {
  const {item, eventCompletionStatus} = props;

  const [notifications, setNotifications] = useState([]);
  const [checkLists, setCheckLists] = useState([]);

  return (
    <View>
      <Image
        source={{uri: item?.['Img Src']?.[0]}}
        height={1}
        width={1}
        style={styles.pokemonBanner}
        resizeMode={'cover'}
      />

      {eventCompletionStatus ? <View style={styles.greyScalingStyle} /> : null}

      {item?.Bonus?.length > 0 ? (
        <View style={styles.bonusSection}>
          <View style={[styles.bonusTextView, {width: horizontalScale(110)}]}>
            <Text numberOfLines={1} style={styles.bonusTextStyle}>
              {item?.Bonus?.[0]}
            </Text>
          </View>
          {item?.Bonus?.length > 1 ? (
            <View style={[styles.bonusTextView, {width: horizontalScale(110)}]}>
              <Text numberOfLines={1} style={styles.bonusTextStyle}>
                {item?.Bonus?.[1]}
              </Text>
            </View>
          ) : null}
          {item?.Bonus?.length > 2 ? (
            <View style={[styles.bonusTextView]}>
              <Text numberOfLines={1} style={styles.bonusTextStyle}>
                {item?.Bonus?.length - 2}
                {strings.plus}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
      {/* TODO: Need to get this below condition fixed via JSON */}
      {eventCompletionStatus ? (
        <View style={styles.completedTextView}>
          <Text numberOfLines={1} style={styles.completedTextStyle}>
            {strings.event_completed.toUpperCase()}
          </Text>
        </View>
      ) : null}

      <View style={styles.eventCardBodySection}>
        <View style={styles.eventTextSection}>
          <Text style={[styles.eventTitle, styles.primaryColorStyle]}>
            {item?.Summary}
          </Text>
          <Text style={[styles.eventDescription, styles.primaryColorStyle]}>
            {item?.Description}
          </Text>
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
    </View>
  );
};
export default EventDisplayCard;
