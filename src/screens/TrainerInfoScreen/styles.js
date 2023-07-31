import {StyleSheet} from 'react-native';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../ultilities/scale';
import fontFamily from '../../ultilities/fontFamily';
import colors from '../../constants/colors';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  appIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
    marginBottom: verticalScale(15),
    marginTop: verticalScale(30),
    alignSelf: 'center',
  },
  appName: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    alignSelf: 'center',
  },
  appVersion: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    alignSelf: 'center',
    marginTop: verticalScale(12),
  },
  primaryColorStyle: {
    color: colors.secondaryColor,
  },
  secondaryColorStyle: {
    color: colors.vermillion,
  },
  bulletPoints: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    marginTop: verticalScale(12),
    marginLeft: horizontalScale(12),
    width: horizontalScale(330),
  },
  paginationDots: {
    height: horizontalScale(6),
    width: verticalScale(6),
    borderRadius: 25,
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(20),
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.purple,
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(20),
  },
  upcomingPoints: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    textTransform: 'uppercase',
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(12),
    // alignSelf: 'center',
  },
});
