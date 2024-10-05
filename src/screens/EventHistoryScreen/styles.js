import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';
import fontFamily from '../../ultilities/fontFamily';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  cardInnerStyling: {
    marginHorizontal: horizontalScale(20),
    paddingHorizontal: horizontalScale(5),
    borderRadius: 8,
  },
  topPaddingStyle: {
    marginTop: verticalScale(30),
  },
  emptyListText: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(16),
    // marginBottom: verticalScale(40),
  },
  emptyListImage: {
    height: verticalScale(180),
    width: horizontalScale(180),
  },
});
