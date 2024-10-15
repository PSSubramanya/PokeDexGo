import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  NativeModules,
} from 'react-native';
import {moderateScale, verticalScale} from '../../ultilities/scale';
import styles from './styles';
import colors from '../../constants/colors';
import imagePaths from '../../constants/imagePaths';
import strings from '../../constants/strings';

const TextInputField = ({
  placeholderText,
  headerTitle,
  onChangeText,
  textInputData,
  editable,
  compulsoryField,
  onPress,
  onBlur,
  containerStyle,
  type,
  fontSize,
  onClickOfPlusOrSendIcon,
}) => {
  // const {SpeechToText} = NativeModules;

  /* There are 3 types of text input fields in this custom component -> "Username", "Password" and "Normal" type*/

  const [selectedField, setSelectedField] = useState(false);

  return (
    <>
      <View
        style={[
          containerStyle,
          {
            borderColor: selectedField ? colors.purple : colors.grey,
          },
        ]}>
        {headerTitle ? (
          <View style={[styles.flexRow]}>
            <Text style={styles.HeaderTitle}>{headerTitle}</Text>
            {compulsoryField ? (
              <Text style={styles.compulsorySign}>
                {strings.compulsorySign}
              </Text>
            ) : null}
          </View>
        ) : null}
        {onPress ? (
          <TouchableOpacity
            onPress={onPress}
            // style={{backgroundColor: 'yellow', zIndex: 1}}
          >
            <TextInput
              style={styles.textInputView}
              editable={editable}
              placeholder={placeholderText}
              placeholderTextColor={colors.grey}
              onChangeText={onChangeText}
              onFocus={val => {
                setSelectedField(true);
                console.log('SELECTED TEXTINPUT 1 ...', val);
              }}
              onBlur={val => {
                setSelectedField(false);
                console.log('SELECTED TEXTINPUT 2 ...', val);
                onBlur && onBlur();
              }}
              value={textInputData}
              // keyboardType={'default'}
              // secureTextEntry={false}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              styles.textInputView,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            {type === 'chatInput' ? (
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={imagePaths?.emojiIconOutline}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[styles.iconStyle, {marginLeft: -5}]}
                />
              </TouchableOpacity>
            ) : null}
            <TextInput
              style={[
                styles.chatTextStyle,
                {
                  // backgroundColor: 'red',
                  marginLeft: type === 'chatInput' ? 0 : 0,
                  fontSize: fontSize ? fontSize : moderateScale(12),
                },
                {
                  marginTop:
                    Platform.OS === 'ios'
                      ? headerTitle
                        ? verticalScale(10)
                        : verticalScale(15)
                      : headerTitle
                      ? verticalScale(-5)
                      : verticalScale(3),
                },
              ]}
              editable={editable}
              placeholder={placeholderText}
              placeholderTextColor={colors.normal}
              onChangeText={onChangeText}
              onFocus={val => {
                setSelectedField(true);
                console.log('SELECTED TEXTINPUT 1 ...', val);
              }}
              onBlur={val => {
                setSelectedField(false);
                console.log('SELECTED TEXTINPUT 2 ...', val);
                onBlur && onBlur();
              }}
              value={textInputData}
              // keyboardType={'default'}
              // secureTextEntry={false}
            />
            {type === 'chatInput' ? (
              <TouchableOpacity
                onPress={() => {
                  onClickOfPlusOrSendIcon();
                }}>
                <Image
                  source={
                    textInputData?.length === 0
                      ? imagePaths?.plusIcon
                      : imagePaths?.sendIcon
                  }
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[styles.iconStyle]}
                />
              </TouchableOpacity>
            ) : null}
            {type === 'chatInput' ? (
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={imagePaths?.speakerIconNormal}
                  height={1}
                  width={1}
                  resizeMode={'contain'}
                  style={[styles.iconStyle, {marginLeft: 10, marginRight: 10}]}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>

      {/* NOTE: For Light Mode Theme develop this properly later*/}
      {/* <View
        style={[
          styles.Divider,
          {borderColor: selectedField ? colors.purple : colors.grey},
        ]}
      /> */}
    </>
  );
};

export default TextInputField;
