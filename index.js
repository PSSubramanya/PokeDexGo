/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useState, useEffect} from 'react';
import {useNetStatusInfo} from './src/ultilities/customHooks/useNetStatusInfo';
import {View, Text, Image, Platform} from 'react-native';
import imagePaths from './src/constants/imagePaths';
import {Modal, Portal, Provider as ModalProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store/store.js';
import styles from './src/screens/LandingPage/styles';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const RNRedux = () => {
  const {networkState} = useNetStatusInfo();
  const [modalVisible, setModalVisible] = useState(false);

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

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  channelId: '1',

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
  // requestPermissions: true,
});
