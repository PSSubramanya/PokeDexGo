import React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors.js';
import styles from './styles.js';

const RaidBossScreen = props => {
  const darkMode = useSelector(state => state?.eventDataReducer?.darkModeValue);
  const darkModeValue = darkMode?.data;
  return (
    <View
      style={{
        backgroundColor: darkModeValue
          ? colors?.secondaryBackgroundColor
          : null,
        flex: 1,
      }}
    />
  );
};
export default RaidBossScreen;
