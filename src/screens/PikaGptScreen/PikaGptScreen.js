import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
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

  //TODO: Add Image as chats,
  //TODO: Add profile images on text ends,
  //TODO: Add 1 date for all chats of today
  //TODO: Different chat options like speaker, media, images etc. Refere different chat apps and dribbble designs
  //TODO: The text area should expand for 4-5 lines and then scroll

  const [message, setMessage] = useState('');

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
        data={chatData}
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
                  {item?.image ? (
                    <Image
                      source={{uri: item?.image}}
                      height={1}
                      width={1}
                      style={{
                        width: 200,
                        height: 300,
                      }}
                      resizeMode={'contain'}
                    />
                  ) : null}
                  <Text
                    style={[
                      styles?.chatTextStyle,
                      {marginTop: item?.image ? 10 : null},
                    ]}>
                    {item?.text}
                  </Text>
                </View>
                <Text
                  style={[
                    styles?.chatTextStyle,
                    {
                      marginHorizontal: 12,
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
    </View>
  );
};
export default PikaGptScreen;
