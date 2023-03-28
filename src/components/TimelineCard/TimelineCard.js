import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import styles from './styles';
import CardView from '../CardView/CardView';
import colors from '../../constants/colors';

const TimelineCard = ({
  cardContainerView,
  onPress,
  timestamp,
  timelinetype,
}) => {
  return (
    <View>
      <View
        style={[styles.timelineCardLineStyle, styles.timelineCardTopLineHeight]}
      />
      <View style={styles.cardContainer}>
        <Text style={styles.timestamp}>{timestamp}</Text>
        <View style={styles.flexStyle}>
          <TouchableOpacity onPress={onPress}>
            <CardView
              innerView={cardContainerView}
              style={styles.cardInnerStyle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.timelineCardLineStyle,
          styles.timelineCardBottomLineHeight,
        ]}
      />
    </View>
  );
};
export default TimelineCard;
