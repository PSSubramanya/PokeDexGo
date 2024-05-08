import React, {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Linking,
  Alert,
  // Animated,
  // PanResponder,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
// import {PinchGestureHandler, State} from 'react-native-gesture-handler';
// import {GestureDetector} from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from 'react-native-reanimated';

import {Modal, Portal} from 'react-native-paper';
import TextInputField from '../../components/TextInputField/TextInputField.js';
import colors from '../../constants/colors.js';
import strings from '../../constants/strings.js';
import imagePaths from '../../constants/imagePaths.js';
import {chatData} from '../../ultilities/mockData/chatMockData.js';
import moment from 'moment';
import styles from './styles.js';

const PikaGptScreen = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;

  /*
    //NOTE: To get the size of the local images

    const source = require('pathToYourImage');
    const { width, height } = Image.resolveAssetSource(source);
  */

  //TODO: Add Image as chats,
  //TODO: Add profile images on text ends,
  //TODO: Add 1 date for all chats of today
  //TODO: Different chat options like speaker, media, images etc. Refere different chat apps and dribbble designs
  //TODO: The text area should expand for 4-5 lines and then scroll
  // TODO: Gesture handler for pinch zoom images
  // TODO: The image write to storage permission granting needs work
  // TODO: Make the chats also deletavle
  // TODO: Add more options to the screen

  // const scale = useRef(new Animated.Value(1)).current;
  // const lastScale = useRef(1);
  // const baseScale = useRef(1);

  const [chatList, setChatList] = useState(chatData);
  const [message, setMessage] = useState('');
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [imageLoaded, setImageLoaded] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  // const [size, setSize] = useState({width: 0, height: 0});

  /*
    const isPressed = useSharedValue(false);
    const offset = useSharedValue({x: 0, y: 0});

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: offset.value.x},
          {translateY: offset.value.y},
          {scale: withSpring(isPressed.value ? 1.2 : 1)},
        ],
        backgroundColor: isPressed.value ? 'yellow' : 'blue',
      };
    });
  */

  /*
    const pinchHandler = Animated.event([{nativeEvent: {scale}}], {
      useNativeDriver: true,
    });

    const onPinchStateChange = event => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        lastScale.current *= event.nativeEvent.scale;
        baseScale.current = lastScale.current;
        setIsZooming(false);
      }
      if (event.nativeEvent.state === State.ACTIVE) {
        setIsZooming(true);
      }
    };
  */

  const checkPermission = async imageUrl => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(imageUrl);
    } else {
      try {
        downloadImage(imageUrl);
        /*
          // NOTE: This permission granting needs work
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message: 'App needs access to your storage to download Photos',
            },
          );
          console.log('PERMISSION BLOB', granted);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            downloadImage(imageUrl);
          } else {
            // If permission denied then show alert
            alert('Storage Permission Not Granted');
            downloadImage(imageUrl);
          }
        */
      } catch (err) {
        // To handle permission related exception
        console.log('PERMISSION ERROR', err);
      }
    }
  };

  const downloadImage = imageUrl => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    // let image_URL = REMOTE_IMAGE_PATH;
    let image_URL = imageUrl;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const headerView = () => {
    return (
      <View
        style={{
          height: 60,
          marginTop: Platform.OS === 'ios' ? 40 : null,
          backgroundColor: darkModeValue ? colors.darkGrey : null,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={imagePaths?.pikaFace}
          height={1}
          width={1}
          style={styles.pikaFace}
          resizeMode={'contain'}
        />
        <Text style={styles?.headerStyle}>PikaGPT</Text>
      </View>
    );
  };

  const chatHistory = () => {
    return (
      <FlatList
        data={chatList}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal: 10}}
        renderItem={({item, ind}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: item?.from === 'Me' ? 'flex-end' : 'flex-start',
              }}>
              <View>
                {item?.image === '' ? (
                  <View
                    style={{
                      marginHorizontal: 10,
                      paddingTop: 10,
                      marginTop: 10,
                      paddingBottom: 30,
                      width: 200,
                      backgroundColor:
                        item?.from === 'Me'
                          ? colors?.tertiaryBackgroundColorDarkMode
                          : colors?.darkGrey,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={[
                        styles?.chatTextStyle,
                        {marginTop: item?.image ? 10 : null},
                      ]}>
                      {item?.text}
                    </Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={() => {
                    //TODO: Here add a modal of Image view
                    showModal(item);
                  }}>
                  {item?.image ? (
                    <Image
                      source={{uri: item?.image}}
                      height={1}
                      width={1}
                      style={{
                        width: 200,
                        height: 300,
                        marginTop: 20,
                        marginHorizontal: 10,
                        borderWidth: 10,
                        borderColor: colors?.darkGrey,
                        borderRadius: 10,
                      }}
                      // resizeMode={'contain'}
                    />
                  ) : null}

                  {item?.image !== '' && item?.text !== '' ? (
                    <View
                      style={{
                        marginHorizontal: 10,
                        paddingTop: 10,
                        marginTop: -10,
                        paddingBottom: 30,
                        width: 200,
                        backgroundColor:
                          item?.from === 'Me'
                            ? colors?.tertiaryBackgroundColorDarkMode
                            : colors?.darkGrey,
                        // borderRadius: 10,
                      }}>
                      <Text
                        style={[
                          styles?.chatTextStyle,
                          {marginTop: item?.image ? 10 : null},
                        ]}>
                        {item?.text}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>

                <Text
                  style={[
                    styles?.chatTextStyle,
                    {
                      marginHorizontal: 5,
                      alignSelf:
                        item?.from === 'Me' ? 'flex-end' : 'flex-start',
                    },
                  ]}>
                  {moment(item?.timeStamp).format('LT')}
                </Text>
              </View>
            </View>
          );
        }}
      />
    );
  };

  const chatBody = () => {
    return (
      <View style={styles?.chatBody}>
        {headerView()}
        {chatHistory()}
      </View>
    );
  };

  const textingArea = () => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TextInputField
          placeholderText={strings.sample_event_name}
          onChangeText={val => {
            setMessage(val);
          }}
          textInputData={message}
          editable={true}
          compulsoryField={false}
          containerStyle={{
            height: 50,
            marginBottom: Platform?.OS === 'ios' ? 50 : 10,
            marginHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 10,
          }}
        />
      </KeyboardAvoidingView>
    );
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const showModal = item => {
    setDisplayModal(true);
    setSelectedItem(item);
  };

  const hideModal = () => {
    setDisplayModal(false);
  };

  const modalContainer = () => {
    return (
      <View
        style={{
          backgroundColor: colors?.secondaryBackgroundColorDarkMode,
          height: '100%',
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                setDisplayModal(false);
              }}>
              <Image
                source={imagePaths?.leftChevronIcon}
                height={1}
                width={1}
                resizeMode={'contain'}
                style={[styles.chevronIcon, {marginLeft: 10}]}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                width: 140,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Are you sure?',
                    'Do you want to delete this image?',
                    [
                      {
                        text: 'OK',
                        onPress: () => {
                          const indexValue = chatList?.findIndex(
                            item => item?.id === selectedItem?.id,
                          );
                          const tempArray = chatList;
                          tempArray.splice(indexValue, 1);
                          setChatList(tempArray);
                          setDisplayModal(false);
                        },
                      },
                      {
                        text: 'Cancel',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  );
                }}>
                <Image
                  source={imagePaths?.deleteIcon}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[styles.imageViewIcons]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={imagePaths?.shareIcon}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[styles.imageViewIcons]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  checkPermission(selectedItem?.image);
                }}>
                <Image
                  source={imagePaths?.greenArrowIcon1}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[
                    styles.chevronIcon,
                    {
                      transform: [{rotate: '90deg'}],
                      marginRight: 10,
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* {imageLoaded ? (
          <PinchGestureHandler
            onGestureEvent={pinchHandler}
            onHandlerStateChange={onPinchStateChange}>
            <Animated.View style={{transform: [{scale}]}}>
              <Image
                source={{uri: selectedItem?.image}}
                onLoad={handleImageLoad}
                height={1}
                width={1}
                style={{
                  height: 300,
                  width: 350,
                  alignSelf: 'center',
                  flex: 1,
                }}
                resizeMode={'contain'}
              />
            </Animated.View>
          </PinchGestureHandler>
        ) : (
          <ActivityIndicator
            size={'large'}
            style={{
              flex: 1,
            }}
            // color={colors?.secondaryColor}
            color={colors?.highlightGreen2}
          />
        )} */}

        {imageLoaded ? (
          <Image
            source={{uri: selectedItem?.image}}
            onLoad={handleImageLoad}
            height={1}
            width={1}
            style={{
              height: 300,
              width: 350,
              alignSelf: 'center',
              flex: 1,
            }}
            resizeMode={'contain'}
          />
        ) : (
          <ActivityIndicator
            size={'large'}
            style={{
              flex: 1,
            }}
            // color={colors?.secondaryColor}
            color={colors?.highlightGreen2}
          />
        )}
      </View>
    );
  };

  const modalPopUp = () => {
    return (
      <Portal>
        <Modal
          style={styles.modalMarginStyle}
          visible={displayModal}
          onDismiss={hideModal}
          // contentContainerStyle={[
          //   styles.modalExternalStyle,
          //   {
          //     backgroundColor: darkModeValue
          //       ? colors.quaternaryBackgroundColorDarkMode
          //       : colors.white,
          //   },
          // ]}
        >
          {modalContainer()}
        </Modal>
      </Portal>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: darkModeValue
          ? colors.secondaryBackgroundColorDarkMode
          : null,
      }}>
      {chatBody()}
      {textingArea()}
      {modalPopUp()}
    </View>
  );
};
export default PikaGptScreen;
