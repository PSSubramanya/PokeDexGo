import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  HeaderTitle: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.bluishGrey,
    marginLeft: 15,
    marginTop: 25,
    fontSize: 12,
  },
  TextInputView: {
    flexDirection: 'row',
  },
  textInputView: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    textAlign: 'left',
  },
  Divider: {
    borderBottomWidth: 1.5,
    marginHorizontal: 10,
    width: '95%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  compulsorySign: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.red,
    // marginLeft: 2,
    marginTop: 23,
    fontSize: 18,
  },
});
