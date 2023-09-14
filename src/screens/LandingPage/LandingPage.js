import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Linking,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
import soundTracks from '../../constants/soundTracks';
import {eventDataLoad, darkModeActivation} from '../../actions/eventData';
import {storeData, getData} from '../../ultilities/commonFunctions';
import styles from './styles';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import {CircleRightArrow} from '../../assets/images/svg';
import webscrappedData from '../../ultilities/pokemonData/pokemon_data6.json';
import eggData from '../../ultilities/pokemonData/egg_data.json';

const LandingPage = ({navigation}) => {
  // const subscriber = firestore().collection('Users').doc(uniqueDeviceIdValue);

  const dispatch = useDispatch();
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  const {networkState} = useNetStatusInfo();

  const navigationScreens = [
    {
      name: 'Events',
      navigationPath: 'HomeScreen',
      image: imagePaths.calendarIcon,
    },
    {
      name: 'Eggs',
      navigationPath: 'EggDetailsScreen',
      image: imagePaths.pokeEggIcon,
    },
    // {
    //   name: 'Field Research',
    //   navigationPath: 'FieldResearchScreen',
    //   image: imagePaths.fieldResearchIcon,
    // },
    {
      name: 'Raid Bosses',
      navigationPath: 'RaidBossScreen',
      image: imagePaths.raidIcon,
    },
    {
      name: 'Trainer Info',
      navigationPath: 'TrainerInfoScreen',
      image: imagePaths.ashCapIcon,
    },
  ];

  const [loadData, setLoadData] = useState([]);
  const [loadEggData, setLoadEggData] = useState([]);
  const [loadRaidBossData, setRaidBossData] = useState([]);
  const [darkModeStatus, setDarkModeStatus] = useState(true);
  const [reloadData, setReloadData] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [uniqueDeviceIdValue, setUniqueDeviceIdValue] = useState('');
  const [countDownTimer, setCountDownTimer] = useState(10);

  const decreaseTimer = () => {
    setCountDownTimer(prev => prev - 1);
  };

  useEffect(() => {
    countDownTimer > 0
      ? setTimeout(() => {
          decreaseTimer();
        }, 1000)
      : setReloadData(true);
  }, [countDownTimer]);

  useEffect(() => {
    soundTracks?.pikapika1.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    soundTracks?.pikapika1.setVolume(0.5); // NOTE: Reduce the volume by half
    soundTracks?.pikapika1.setPan(0.5); // NOTE: Position the sound to the full right in a stereo field
    soundTracks?.pikapika1.setNumberOfLoops(0); // NOTE: Loop indefinitely until stop() is called
  }, []);

  // console.log('DEVICE INFO', DeviceInfo.getUniqueID());//getDeviceId()
  // console.log('DEVICE INFO', DeviceInfo.getUniqueId()); //getDeviceId()

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      const tempId = uniqueId;
      setUniqueDeviceIdValue(tempId);
    });

    //NOTE: Try to use AsyncStorage here with right usage
    const initialDarkModeStatus =
      getData('darkModeStatus') !== null ||
      getData('darkModeStatus') !== undefined
        ? getData('darkModeStatus')
        : true;

    setDarkModeStatus(initialDarkModeStatus);
  }, []);

  useEffect(() => {
    let loadedData;
    fetch(
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/pokemondata',
    )?.then(response => {
      response.json()?.then(res => {
        loadedData = res?.data;
        setLoadData(loadedData);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState, reloadData]);

  useEffect(() => {
    dispatch(eventDataLoad(loadData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  useEffect(() => {
    // let loadedData = eggData?.data;
    // setLoadEggData(loadedData);

    let loadedEggData;
    fetch(
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/eggData',
    ).then(response => {
      response.json().then(res => {
        loadedEggData = res?.data;
        setLoadEggData(loadedEggData);
      });
    });
  }, [loadEggData, reloadData]);

  useEffect(() => {
    let loadedRaidBossData;
    fetch(
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/raidBosses',
    ).then(response => {
      response.json().then(res => {
        loadedRaidBossData = res?.data;
        setRaidBossData(loadedRaidBossData);
      });
    });
  }, [loadRaidBossData, reloadData]);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const modalContainer = () => {
    return (
      <View style={styles.modalInnerStyle}>
        <Text style={styles.queryText}>
          For any questions or concerns, please get in touch with the following
          email address:
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:sarrarpa69@gmail.com');
          }}>
          <Text style={[styles.queryText, styles.emailText]}>
            sarrarpa69@gmail.com
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const infoButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.infoIconButton}>
        <Image
          source={imagePaths?.questionMarkIcon}
          height={1}
          width={1}
          style={styles.infoIcon}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };

  const appIconContainer = () => {
    return (
      <View style={styles.centerAlignmentStyle}>
        {infoButton()}
        <Image
          source={imagePaths.appIcon}
          height={1}
          width={1}
          style={styles.appIcon}
        />
        <Text
          style={[
            styles.appName,
            {
              color: darkModeValue
                ? colors.primaryTextColorDarkMode
                : colors.secondaryColor,
            },
          ]}>
          {strings.app_name}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.name === 'Events') {
            navigation.navigate(item?.navigationPath, {loadData: loadData});
          } else if (item?.name === 'Eggs') {
            navigation.navigate(item?.navigationPath, {loadData: loadEggData});
          } else if (item?.name === 'Raid Bosses') {
            navigation.navigate(item?.navigationPath, {
              loadData: loadRaidBossData,
            });
          } else {
            navigation.navigate(item?.navigationPath);
          }
        }}>
        <View
          style={[
            {
              backgroundColor: darkModeValue
                ? colors.tertiaryBackgroundColorDarkMode
                : colors.secondaryBackgroundColor,
            },
            styles.navigationButtonStyle,
          ]}>
          <Image
            source={item?.image}
            height={1}
            width={1}
            resizeMode={'contain'}
            style={styles.buttonIcons}
          />
          <Text
            style={[
              {
                color: darkModeValue
                  ? colors.primaryTextColorDarkMode
                  : colors.primaryColor,
              },
              styles.buttonTextStyles,
            ]}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const navigationButtons = () => {
    return (
      <>
        {networkState ? (
          <View style={styles.centerAlignmentStyle}>
            <FlatList
              data={navigationScreens}
              keyExtractor={item => item}
              numColumns={2}
              renderItem={renderItem}
            />
          </View>
        ) : null}
      </>
    );
  };

  const darkModeButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          const currentTheme = darkModeStatus;
          setDarkModeStatus(!currentTheme);
          dispatch(darkModeActivation(!currentTheme));

          // firestore()
          //   .collection('Users')
          //   .doc('themeData')
          //   .add({
          //     appTheme: !currentTheme,
          //   })
          //   .then(res => {
          //     console.log(
          //       'App theme stored FIRESTORE DATA',
          //       uniqueDeviceIdValue,
          //       res,
          //     );
          //   })
          //   .catch(err => {
          //     console.log('ERROR FIRESTORE DATA', err);
          //   });

          // firestore()
          //   .collection('Users')
          //   .add({
          //     appTheme: !currentTheme,
          //   })
          //   .then(res => {
          //     console.log(
          //       'App theme stored FIRESTORE DATA',
          //       uniqueDeviceIdValue,
          //       res,
          //     );
          //   })
          //   .catch(err => {
          //     console.log('ERROR FIRESTORE DATA', err);
          //   });
        }}>
        <View style={styles.darkModeButton}>
          <Image
            source={
              darkModeValue
                ? imagePaths.darkModeIcon
                : imagePaths.brightModeIcon
            }
            height={1}
            width={1}
            style={styles.darkModeIcon}
            resizeMode={'contain'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const redoIcon = () => {
    return (
      <>
        {networkState && loadData?.length === 0 ? (
          <View style={styles.redoIconContainer}>
            <TouchableOpacity
              onPress={() => {
                setReloadData(true);
              }}>
              <Image
                source={imagePaths.appIcon}
                height={1}
                width={1}
                style={styles.redoIcon}
              />
            </TouchableOpacity>
            <Text style={styles?.reloadDataText}>Loading Data</Text>
            <Text style={styles?.reloadDataText}>{countDownTimer}</Text>
          </View>
        ) : null}
      </>
    );
  };

  const modalPopUp = () => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={modalVisible}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalExternalStyle,
            {
              backgroundColor: darkModeValue
                ? colors.quaternaryBackgroundColorDarkMode
                : colors.white,
            },
          ]}>
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  const mainContainerBody = () => {
    return (
      <View
        style={[
          {
            backgroundColor: darkModeValue
              ? colors.secondaryBackgroundColorDarkMode
              : null,
          },
          styles.mainContainer,
        ]}>
        {loadData?.length !== 0 ? appIconContainer() : null}
        {loadData?.length !== 0 ? navigationButtons() : null}
        {redoIcon()}
        {modalPopUp()}
        {/* {darkModeButton()} */}
        {/* <CircleRightArrow /> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.darkBlue} />
      {mainContainerBody()}
    </SafeAreaView>
  );
};

export default LandingPage;
