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
  mainBody: {
    flex: 1,
    justifyContent: 'space-between',
  },
  eggIcon: {
    height: verticalScale(120),
    width: horizontalScale(120),
    marginBottom: verticalScale(10),
    padding: verticalScale(5),
    alignSelf: 'center',
  },
  eggKmCategory: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.purple,
  },
  gridImageStyle: {
    height: verticalScale(60),
    width: horizontalScale(60),
  },
  shinyIcon: {
    height: verticalScale(22),
    width: horizontalScale(22),
  },
  shinyIconContainer: {
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
  gridBorderStyle: {
    height: verticalScale(80),
    width: horizontalScale(80),
    marginHorizontal: horizontalScale(10),
    borderRadius: 5,
    marginVertical: verticalScale(12),
    borderColor: colors.purple,
    borderWidth: 2,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridViewDisplay: {
    marginVertical: verticalScale(30),
    alignItems: 'center',
  },
  pokemonNames: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.purple,
    width: horizontalScale(100),
    alignSelf: 'center',
    marginBottom: verticalScale(5),
  },
  chevronIcon: {
    height: verticalScale(20),
    width: horizontalScale(20),
    marginTop: verticalScale(1),
    marginHorizontal: horizontalScale(10),
  },
  filterSection: {
    height: verticalScale(50),
    justifyContent: 'space-between',
  },
  dotsStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // marginHorizontal: 1,
    backgroundColor: colors.vermillion,
  },
  activeDotColor: {
    backgroundColor: colors.vermillion,
  },
  inactiveDotColor: {
    backgroundColor: colors.purple,
  },
  filterEggIcon: {
    height: verticalScale(50),
    width: horizontalScale(50),
  },
  filterOptions: {
    height: verticalScale(65),
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: colors.purple,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginHorizontal: horizontalScale(4),
    marginVertical: verticalScale(10),
  },
  filterContainer: {
    backgroundColor: colors.white,
    borderTopWidth: 1.5,
    borderColor: colors.grey,
  },
  seasonText: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.purple,
  },
});
