import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  selectedDayStyle: {
    backgroundColor: 'orange',
    borderRadius: 30,
  },
  calandarView: {
    zIndex: 1,
  },
  chevronIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    marginTop: verticalScale(30),
  },
});
