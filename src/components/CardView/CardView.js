import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, View, Animated} from 'react-native';
import colors from '../../constants/colors';
import styles from './styles';

const CardView = ({innerView, style}) => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  //   const decayAnimationVariable = useRef(new Animated.Value(-500)).current;

  //   const handleDecayAnimation = () => {
  //     decayAnimationVariable.setValue(-470);
  //     Animated.decay(decayAnimationVariable, {
  //       toValue: 50,
  //       duration: 50,
  //       velocity: 0.95,
  //       deceleration: 0.998,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  //   const delay = ms => new Promise(res => setTimeout(res, ms));

  //   const animationDelay = async () => {
  //     await delay(0);
  //     handleDecayAnimation();
  //   };

  //   useEffect(() => {
  //     animationDelay();
  //   }, []);

  //   return (
  //     <Animated.View
  //       style={[
  //         styles.animatedCardView,
  //         {
  //           transform: [{translateY: decayAnimationVariable}],
  //         },
  //       ]}>
  //       {innerView}
  //     </Animated.View>
  //   );

  return (
    <View
      style={[
        styles.cardView,
        style,
        {
          backgroundColor: darkModeValue
            ? colors.quaternaryBackgroundColorDarkMode
            : colors.white,
        },
      ]}>
      {innerView}
    </View>
  );
};

export default CardView;
