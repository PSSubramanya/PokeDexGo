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
  pokemonName: {
    color: colors?.white,
    fontFamily: fontFamily?.primaryFontFamilyMedium,
    marginTop: verticalScale(10),
    textTransform: 'uppercase',
  },
});
