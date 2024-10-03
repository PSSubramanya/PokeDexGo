/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {
  AppRegistry,
  PermissionsAndroid,
  View,
  Text,
  Image,
  Alert,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useState, useEffect} from 'react';
import {useNetStatusInfo} from './src/ultilities/customHooks/useNetStatusInfo';
import imagePaths from './src/constants/imagePaths';
import {Modal, Portal, Provider as ModalProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store/store.js';
import styles from './src/screens/LandingPage/styles';
// import PushNotification from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

// Request permissions (required for iOS)
notifee
  .requestPermission()
  .then(() => {
    // Permission granted or already granted, you can proceed with displaying notifications
    console.log('Permission granted');

    // 1. checks if battery optimization is enabled
    notifee
      .isBatteryOptimizationEnabled()
      .then(batteryOptimizationEnabled => {
        if (batteryOptimizationEnabled) {
          // 2. ask your users to disable the feature
          Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please disable battery optimization for the app.',
            [
              // 3. launch intent to navigate the user to the appropriate screen
              {
                text: 'OK, open settings',
                // onPress: async () => await notifee.openBatteryOptimizationSettings(),
                onPress: () =>
                  notifee.openBatteryOptimizationSettings().then().catch(),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.log('Battery Optimization error'));

    // 1. get info on the device and the Power Manager settings
    notifee
      .getPowerManagerInfo()
      .then(powerManagerInfo => {
        if (powerManagerInfo.activity) {
          // 2. ask your users to adjust their settings
          Alert.alert(
            'Restrictions Detected',
            'To ensure notifications are delivered, please adjust your settings to prevent the app from being killed',
            [
              // 3. launch intent to navigate the user to the appropriate screen
              {
                text: 'OK, open settings',
                // onPress: async () => await notifee.openPowerManagerSettings(),
                onPress: () =>
                  notifee.openPowerManagerSettings().then().catch(),
              },
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        }
      })
      .catch(err => console.log('Power Manager error'));
  })
  .catch(error => {
    // Permission denied or there was an error
    console.error('Permission request error:', error);
  });

// NOTE: This below function is the one used to trigger notifications during background app status
notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  console.log('notifee background 1');

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      method: 'POST',
    });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const RNRedux = () => {
  const {networkState} = useNetStatusInfo();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    requestInitialPermission();
  }, []);

  useEffect(() => {
    if (networkState) {
      hideModal();
    } else {
      showModal();
    }
  }, [networkState]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const requestInitialPermission = async () => {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const modalContainer = () => {
    return (
      <View style={styles.modalInnerStyle}>
        <Image
          // source={imagePaths.pichuDancing}
          source={imagePaths.noInternetImage}
          height={1}
          width={1}
          style={styles.appIcon}
          resizeMode={'contain'}
        />
        <Text style={styles.modalText}>Please Turn on the Internet</Text>
      </View>
    );
  };

  const modalPopUp = () => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={modalVisible}
          contentContainerStyle={[styles.modalExternalStyle]}>
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  return (
    <Provider store={store}>
      <ModalProvider>
        {modalPopUp()}
        <App />
      </ModalProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
