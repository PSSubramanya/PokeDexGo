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
  mainBody: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  eggIcon: {
    height: verticalScale(120),
    width: horizontalScale(120),
    marginBottom: verticalScale(10),
    marginTop: verticalScale(10),
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
  gridBorderStyle: {
    height: verticalScale(80),
    width: horizontalScale(80),
    marginHorizontal: horizontalScale(10),
    borderRadius: 5,
    marginVertical: verticalScale(5),
    borderColor: colors.purple,
    borderWidth: 2,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridViewDisplay: {
    marginVertical: verticalScale(30),
    width: viewportWidth,
    alignItems: 'center',
    flex: 1,
  },
  pokemonNames: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.purple,
    width: horizontalScale(100),
    alignSelf: 'center',
  },
  chevronIcon: {
    height: verticalScale(20),
    width: horizontalScale(20),
    marginTop: verticalScale(1),
    marginHorizontal: horizontalScale(10),
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
