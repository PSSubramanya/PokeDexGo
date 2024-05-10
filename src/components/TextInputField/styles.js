import {StyleSheet, Platform} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  HeaderTitle: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.bluishGrey,
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(10),
    fontSize: moderateScale(12),
  },
  TextInputView: {
    flexDirection: 'row',
  },
  textInputView: {
    // fontFamily: fontFamily.primaryFontFamilyRegular,
    paddingLeft: horizontalScale(14),
    textAlign: 'left',
    paddingBottom: verticalScale(5),
    // backgroundColor: 'red',
    // width: 200,
  },
  chatTextStyle: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    width: horizontalScale(240),
    // backgroundColor: 'red',
  },
  Divider: {
    borderBottomWidth: 1.5,
    marginHorizontal: horizontalScale(10),
    width: '95%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  compulsorySign: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.red,
    marginTop: verticalScale(5),
    fontSize: moderateScale(15),
  },
  iconStyle: {
    height: verticalScale(25),
    width: horizontalScale(25),
    marginTop: verticalScale(11),
    // backgroundColor: 'red',
  },
});
