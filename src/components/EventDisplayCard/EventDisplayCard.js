import React, {useState} from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import imagePaths from '../../constants/imagePaths';
import styles from './styles';

const EventDisplayCard = props => {
  const {item} = props;

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
      <View style={styles.eventCardBodySection}>
        <View style={styles.eventTextSection}>
          <Text style={styles.eventTitle}>{item?.Summary}</Text>
          <Text style={styles.eventDescription}>{item?.Description}</Text>
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
