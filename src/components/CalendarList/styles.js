import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  calendarStyle: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: verticalScale(310),
    marginTop: verticalScale(155),
  },
});
