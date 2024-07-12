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
  },
  gridImageStyle: {
    height: verticalScale(60),
    width: horizontalScale(60),
  },
  evolutionGridImageStyle: {
    height: verticalScale(50),
    width: horizontalScale(50),
    marginTop: verticalScale(20),
  },
  shinyIcon: {
    height: verticalScale(22),
    width: horizontalScale(22),
  },
  arrowIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
    alignSelf: 'center',
  },
  candyIcon: {
    height: verticalScale(20),
    width: horizontalScale(20),
    alignSelf: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  evolutionGridBorderStyle: {
    height: verticalScale(70),
    width: horizontalScale(70),
    marginHorizontal: horizontalScale(10),
    borderRadius: 5,
    marginVertical: verticalScale(12),
    borderColor: colors.purple,
    borderWidth: 2,
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
    borderTopWidth: 1.5,
  },
  seasonText: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  evolutionText: {
    color: 'white',
    marginTop: verticalScale(40),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  noEvolutionText: {
    color: 'white',
    marginVertical: verticalScale(40),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  evolutionChartContainer: {
    backgroundColor: colors.quaternaryBackgroundColorDarkMode,
    marginHorizontal: horizontalScale(20),
    marginTop: verticalScale(20),
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 20,
    width: horizontalScale(360),
  },
  candyText1: {
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors?.white,
    marginTop: verticalScale(3),
  },
  evolutionChartPokemonName: {
    textAlign: 'center',
    fontSize: moderateScale(10),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors?.white,
    marginTop: verticalScale(10),
    width: horizontalScale(100),
  },
  candyIconPositioning: {
    // position: 'absolute',
    // top: verticalScale(65),
    marginBottom: verticalScale(-8),
  },
  evolutionProgressStyle: {
    marginTop: verticalScale(20),
  },
});
