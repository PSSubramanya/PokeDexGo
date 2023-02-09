import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

const Button = ({buttonText, buttonStyle, buttonTextStyle, onPress}) => {
  return (
    <>
      <TouchableOpacity style={buttonStyle} onPress={onPress}>
        <View>
          <Text style={buttonTextStyle}>{buttonText}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default Button;
