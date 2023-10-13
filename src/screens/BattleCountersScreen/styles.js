import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../ultilities/scale';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
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
});
