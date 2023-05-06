/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {useState, useEffect} from 'react';
import {useNetStatusInfo} from './src/ultilities/customHooks/useNetStatusInfo';
import {View, Text, Image} from 'react-native';
import imagePaths from './src/constants/imagePaths';
import {Modal, Portal, Provider as ModalProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store/store.js';
import styles from './src/screens/LandingPage/styles';

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
          contentContainerStyle={styles.modalExternalStyle}>
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
