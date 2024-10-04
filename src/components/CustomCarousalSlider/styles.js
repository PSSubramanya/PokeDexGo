import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
  viewportWidth,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  paginationView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDots: {
    height: horizontalScale(6),
    width: verticalScale(6),
    borderRadius: 20,
    marginHorizontal: horizontalScale(6),
  },
  paginationTextBorder: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.purple,
    backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(5),
  },
  paginationTextStyle: {
    color: colors.purple,
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  paginationRichtext1: {
    color: colors.vermillion,
    fontFamily: fontFamily.primaryFontFamilyBold,
  },
  paginationRichtext2: {
    color: colors.purple,
    fontFamily: fontFamily.primaryFontFamilyBold,
  },
  paginationSection: {
    // backgroundColor: 'white',
    height: verticalScale(50),
    width: viewportWidth,
    alignItems: 'center',
  },
  sliderStyle: {
    alignSelf: 'center',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  chevronIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
    marginTop: verticalScale(30),
  },
});
