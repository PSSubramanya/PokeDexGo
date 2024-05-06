import {StyleSheet, Platform} from 'react-native';
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';
import colors from '../../constants/colors';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  chatTextStyle: {
    color: colors?.white,
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(12),
    lineHeight: verticalScale(20),
    paddingHorizontal: horizontalScale(10),
  },
  headerStyle: {
    color: colors?.white,
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    textAlign: 'center',
  },
  pikaFace: {
    height: verticalScale(25),
    width: horizontalScale(25),
    marginRight: horizontalScale(5),
    marginTop: verticalScale(-5),
  },
  chatBody: {
    flex: 1,
  },
  chevronIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    marginTop: verticalScale(10),
    marginLeft: horizontalScale(0),
  },
  imageViewIcons: {
    height: verticalScale(20),
    width: horizontalScale(20),
    marginTop: verticalScale(12),
  },
});
