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
  Platform,
} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
// import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import {usePushNotification} from '../../ultilities/customHooks/usePushNotification';
import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
import soundTracks from '../../constants/soundTracks';
import {eventDataLoad, darkModeActivation} from '../../actions/eventData';
import {storeData, retrieveData} from '../../ultilities/commonFunctions';
import styles from './styles';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import {CircleRightArrow} from '../../assets/images/svg';
import webscrappedData from '../../ultilities/pokemonData/pokemon_data6.json';
import eggData from '../../ultilities/pokemonData/egg_data.json';
import {NotificationService} from '../../ultilities/services/notifications/notificationService';

const LandingPage = ({navigation}) => {
  // const subscriber = firestore().collection('Users').doc(uniqueDeviceIdValue);

  const dispatch = useDispatch();
  const {networkState} = useNetStatusInfo();
  const {localNotif} = usePushNotification(navigation);

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
    {
      name: 'Field Research',
      navigationPath: 'FieldResearchScreen',
      image: imagePaths.fieldResearchIcon,
    },
    {
      name: 'Raid Bosses',
      navigationPath: 'RaidBossScreen',
      image: imagePaths.raidIcon,
    },
    // {
    //   name: 'Trainer Info',
    //   navigationPath: 'TrainerInfoScreen',
    //   image: imagePaths.ashCapIcon,
    // },
  ];

  const [loadData, setLoadData] = useState([]);
  const [loadEggData, setLoadEggData] = useState([]);
  const [loadRaidBossData, setRaidBossData] = useState([]);
  const [loadFieldResearchData, setFieldResearchData] = useState([]);
  const [darkModeStatus, setDarkModeStatus] = useState(true);
  const [reloadData, setReloadData] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [uniqueDeviceIdValue, setUniqueDeviceIdValue] = useState('');
  const [modalDisplayText, setModalDisplayText] = useState('');
  const [modalTypeValue, setModalType] = useState('');
  const [countDownTimer, setCountDownTimer] = useState(10);
  const [forceUpdateModal, setForceUpdateModal] = useState(false);

  NotificationService(navigation);

  useEffect(() => {
    let versionData;
    const appVersionCheckURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/version';
    const installedVersion = DeviceInfo.getVersion();

    fetch(appVersionCheckURL)
      ?.then(response => {
        response.json()?.then(res => {
          versionData = res?.data;
          const latestVersion = versionData[0]?.version;

          if (latestVersion > installedVersion) {
            setForceUpdateModal(true);
            setModalType('force-update');
            setModalDisplayText(
              'A new version of the app is available. Please update to continue using the app.',
            );
          } else {
            setForceUpdateModal(false);
          }
        });
      })
      .catch(err => {
        console.log(' APP VERSION ERROR', err);
      });
  }, []);

  useEffect(() => {
    dispatch(darkModeActivation(darkModeStatus));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkModeStatus]);

  useEffect(() => {
    if (loadData?.length === 0) {
      countDownTimer > 0
        ? setTimeout(() => {
            decreaseTimer();
          }, 1000)
        : serverMaintainanceError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      const tempId = uniqueId;
      setUniqueDeviceIdValue(tempId);
    });

    retrieveData('themeStatus')
      .then(themVal => {
        if (themVal) {
          // Do something with the retrieved data, e.g., display it in your component.
          const serializedValue = JSON.parse(themVal);
          setDarkModeStatus(serializedValue);
        } else {
          // Handle the case where data doesn't exist.
        }
      })
      .catch(err => {
        console.log('themVal ERROR.', err);
      });
  }, []);

  useEffect(() => {
    let loadedData;
    const eventDataURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/pokemondata';

    fetch(eventDataURL)
      ?.then(response => {
        response.json()?.then(res => {
          loadedData = res?.data;
          setLoadData(loadedData);
          storeData('eventsData', loadedData);
          hideModal();
          console.log('SERIALISED EVENTS DATA VALUE from API', loadedData);
        });
      })
      .catch(err => {
        console.log('SERIALISED EVENTS DATA VALUE ERROR', err);
      });

    if (loadData?.length === 0) {
      retrieveData('eventsData')
        .then(themVal => {
          if (themVal) {
            // Do something with the retrieved data, e.g., display it in your component.
            const serializedValue = JSON.parse(themVal);
            loadedData = serializedValue;
            setLoadData(loadedData);
            console.log('SERIALISED EVENTS DATA VALUE', loadedData);
          }
        })
        .catch(err => {
          console.log('events data fetch ERROR.', err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState, countDownTimer]);

  useEffect(() => {
    dispatch(eventDataLoad(loadData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  useEffect(() => {
    let loadedEggData;
    const eggDataURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/eggData';

    fetch(eggDataURL)
      .then(response => {
        response.json().then(res => {
          loadedEggData = res?.data;
          setLoadEggData(loadedEggData);
          storeData('eggsData', loadedEggData);
          hideModal();
        });
      })
      .catch(err => {
        console.log('SERIALISED EGG DATA VALUE ERROR', err);
      });

    if (loadEggData?.length === 0) {
      retrieveData('eggsData')
        .then(eggVal => {
          if (eggVal) {
            const serializedValue = JSON.parse(eggVal);
            loadedEggData = serializedValue;
            setLoadEggData(loadedEggData);
            console.log('SERIALISED EGG DATA VALUE', loadedEggData);
          }
        })
        .catch(err => {
          console.log('eggs data ERROR.', err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState]);

  useEffect(() => {
    let loadedRaidBossData;
    const raidBossURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/raidBosses';

    fetch(raidBossURL)
      .then(response => {
        response.json().then(res => {
          loadedRaidBossData = res?.data;
          setRaidBossData(loadedRaidBossData);
          storeData('raidsData', loadedRaidBossData);
          hideModal();
        });
      })
      .catch(err => {
        console.log('SERIALISED RAID DATA VALUE ERROR', err);
      });

    if (loadRaidBossData?.length === 0) {
      retrieveData('raidsData')
        .then(raidVal => {
          if (raidVal) {
            // Do something with the retrieved data, e.g., display it in your component.
            const serializedValue = JSON.parse(raidVal);
            loadedRaidBossData = serializedValue;
            setRaidBossData(loadedRaidBossData);
            console.log('SERIALISED RAID DATA VALUE', loadedRaidBossData);
          }
        })
        .catch(err => {
          console.log('raids data ERROR.', err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState]);

  useEffect(() => {
    let loadedFieldResearchData;
    const fieldResearchURL =
      'https://getpantry.cloud/apiv1/pantry/b45d3e57-17a6-498d-8aec-b8173408efb4/basket/fieldResearch';

    fetch(fieldResearchURL)
      .then(response => {
        response.json().then(res => {
          loadedFieldResearchData = res?.data;
          setFieldResearchData(loadedFieldResearchData);
          storeData('fieldResearchData', loadedFieldResearchData);
          hideModal();
        });
      })
      .catch(err => {
        console.log('SERIALISED FIELD RESEARCH DATA VALUE ERROR', err);
      });

    if (loadFieldResearchData?.length === 0) {
      retrieveData('fieldResearchData')
        .then(researchVal => {
          if (researchVal) {
            // Do something with the retrieved data, e.g., display it in your component.
            const serializedValue = JSON.parse(researchVal);
            loadedFieldResearchData = serializedValue;
            setFieldResearchData(loadedFieldResearchData);
            console.log(
              'SERIALISED FIELD RESEACH DATA VALUE',
              loadedFieldResearchData,
            );
          }
        })
        .catch(err => {
          console.log('field research data ERROR.', err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState]);

  /* NOTE: HERE STARTS NOTIFICATION CODE */

  /* NOTE: HERE ENDS NOTIFICATION CODE*/

  const decreaseTimer = () => {
    setCountDownTimer(prev => prev - 1);
  };

  const serverMaintainanceError = () => {
    const serverErrorModalText = 'SERVER UNDER MAINTAINANCE';
    setModalType('server-error');
    setModalDisplayText(serverErrorModalText);
    showModal();
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const modalContainer = (modalText, modalType) => {
    return (
      <View style={styles.modalInnerStyle}>
        {forceUpdateModal && modalType === 'force-update' ? (
          <View>
            <Text
              style={[
                styles.modalHeaderText,
                {color: colors.white, textTransform: 'uppercase'},
              ]}>
              Update Required
            </Text>
          </View>
        ) : null}
        {modalType === 'server-error' ? (
          <Image
            source={imagePaths.serverErrorIcon}
            height={1}
            width={1}
            resizeMode="contain"
            style={[styles.serverErrorIcon]}
          />
        ) : null}
        {modalType === 'server-error' ? (
          <Text
            style={[styles.modalHeaderText, {color: colors.secondaryRedColor}]}>
            SOMETHING WENT WRONG
          </Text>
        ) : null}
        <Text style={styles.queryText}>{modalText}</Text>
        {forceUpdateModal && modalType === 'force-update' ? (
          <TouchableOpacity
            style={styles?.updateButton}
            onPress={() => {
              if (Platform?.OS === 'android') {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.sarrarpa.pokeguide',
                ); // Android
              } else if (Platform?.OS === 'ios') {
                // Linking.openURL('https://apps.apple.com/app/idyourappid'); // iOS
              }
            }}>
            <Text style={styles?.updateText}>UPDATE</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => {
            if (modalType === 'email') {
              Linking.openURL('mailto:sarrarpa69@gmail.com');
            }
          }}>
          {modalType === 'email' ? (
            <Text style={[styles.queryText, styles.emailText]}>
              sarrarpa69@gmail.com
            </Text>
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const infoButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          const modalQueryDisplayText =
            'For any questions or concerns, please get in touch with the following email address:';
          setModalType('email');
          setModalDisplayText(modalQueryDisplayText);
          showModal();
        }}>
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

  const notificationButton = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('PdfViewScreen');
        }}>
        <Image
          source={imagePaths?.notificationsOnIcon}
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
              color: darkModeStatus
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
          } else if (item?.name === 'Field Research') {
            navigation.navigate(item?.navigationPath, {
              loadData: loadFieldResearchData,
            });
          } else {
            navigation.navigate(item?.navigationPath);
          }
        }}>
        <View
          style={[
            {
              backgroundColor: darkModeStatus
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
                color: darkModeStatus
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
          storeData('themeStatus', !currentTheme);

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
              darkModeStatus
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
            <Text style={styles?.reloadDataText}>
              Loading Data in {countDownTimer} seconds
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  const modalPopUp = (modalDisplayText, type) => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={modalVisible || forceUpdateModal}
          onDismiss={hideModal}
          contentContainerStyle={[
            styles.modalExternalStyle,
            {
              backgroundColor: darkModeStatus
                ? colors.quaternaryBackgroundColorDarkMode
                : colors.white,
            },
          ]}>
          {modalContainer(modalDisplayText, type)}
        </Modal>
      </Portal>
    );
  };

  const mainContainerBody = () => {
    return (
      <View
        style={[
          {
            backgroundColor: darkModeStatus
              ? colors.secondaryBackgroundColorDarkMode
              : null,
          },
          styles.mainContainer,
        ]}>
        <View style={styles?.iconContainer}>
          {notificationButton()}
          {infoButton()}
        </View>
        {loadData?.length !== 0 ? appIconContainer() : null}
        {loadData?.length !== 0 ? navigationButtons() : null}
        {redoIcon()}
        {modalPopUp(modalDisplayText, modalTypeValue)}
        {/* {darkModeButton()} */}
        {/* <CircleRightArrow /> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={colors.secondaryBackgroundColorDarkMode}
      />
      {mainContainerBody()}
    </SafeAreaView>
  );
};

export default LandingPage;
