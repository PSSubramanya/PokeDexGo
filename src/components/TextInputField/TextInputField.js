import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const TextInputField = ({
  // type,
  placeholderText,
  headerTitle,
  onChangeText,
  textInputData,
  editable,
  compulsoryField,
  onPress,
  containerStyle,
}) => {
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
        <View style={[styles.flexRow]}>
          <Text style={styles.HeaderTitle}>{headerTitle}</Text>
          <Text style={styles.compulsorySign}>{strings.compulsorySign}</Text>
        </View>
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
              }}
              value={textInputData}
              // keyboardType={'default'}
              // secureTextEntry={false}
            />
          </TouchableOpacity>
        ) : (
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
            }}
            value={textInputData}
            // keyboardType={'default'}
            // secureTextEntry={false}
          />
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
