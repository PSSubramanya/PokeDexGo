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
  flexRow: {
    flexDirection: 'row',
  },
  absoluteCenterStyling: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetweenStyling: {
    justifyContent: 'space-between',
  },
  centerAlignment: {
    alignItems: 'center',
  },
  horizontalCenterStyling: {
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  // Write Styles for different fonts in the app
});
