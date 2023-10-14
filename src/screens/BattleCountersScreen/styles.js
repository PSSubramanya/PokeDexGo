import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../ultilities/scale';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: colors?.secondaryBackgroundColorDarkMode,
  },
  pokemonIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
    marginTop: verticalScale(10),
  },
  textTitles: {
    color: colors?.white,
    fontFamily: fontFamily?.primaryFontFamilyMedium,
    marginTop: verticalScale(10),
    textTransform: 'uppercase',
  },
  infoText: {
    color: colors?.white,
    fontFamily: fontFamily?.primaryFontFamilyMedium,
    marginTop: verticalScale(10),
    fontSize: moderateScale(12),
    textAlign: 'center',
    marginHorizontal: horizontalScale(20),
  },
  gridBorderStyle: {
    height: verticalScale(80),
    width: horizontalScale(80),
    marginHorizontal: horizontalScale(10),
    borderRadius: 5,
    marginTop: verticalScale(12),
    marginBottom: verticalScale(6),
    borderColor: colors.purple,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcons: {
    height: verticalScale(60),
    width: horizontalScale(60),
  },
  shadowIcon: {
    height: verticalScale(22),
    width: horizontalScale(22),
  },
  shadowIconContainer: {
    height: verticalScale(26),
    width: horizontalScale(26),
    backgroundColor: colors.white,
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: verticalScale(-8),
    right: horizontalScale(-10),
  },
  pokeName: {
    textAlign: 'center',
    marginTop: verticalScale(5),
    marginHorizontal: horizontalScale(5),
    width: horizontalScale(100),
    color: colors?.white,
    fontFamily: fontFamily?.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  centreText: {
    textAlign: 'center',
  },
  scoreText: {
    textAlign: 'center',
    marginTop: verticalScale(5),
    color: colors?.white,
    fontFamily: fontFamily?.primaryFontFamilyMedium,
    fontSize: moderateScale(10),
    textTransform: 'uppercase',
  },
  scoreDisplay: {
    color: colors?.highlightGreen,
    fontSize: moderateScale(11),
  },
  groupAlignment: {
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(30),
    marginBottom: verticalScale(5),
  },
  groupView: {
    borderTopWidth: 1,
    borderColor: colors?.white,
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
});
