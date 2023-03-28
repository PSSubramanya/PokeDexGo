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
  mainContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  appIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
  },
  appName: {
    fontSize: moderateScale(20),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  centerAlignmentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTextSize: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyRegular,
  },
  rightArrowCircle: {
    height: verticalScale(40),
    width: horizontalScale(40),
  },
});
