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
  mainContainer: {
    height: '100%',
    justifyContent: 'space-evenly',
  },
  appIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
    marginBottom: verticalScale(30),
    marginTop: verticalScale(30),
  },
  appName: {
    fontSize: moderateScale(20),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  centerAlignmentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTextSize: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyRegular,
  },
  rightArrowCircle: {
    height: verticalScale(40),
    width: horizontalScale(40),
  },
  primaryColorStyle: {
    color: colors.secondaryColor,
  },
  modalExternalStyle: {
    backgroundColor: colors.white,
    padding: horizontalScale(19),
    borderRadius: 10,
  },
  modalMarginStyle: {
    marginHorizontal: horizontalScale(20),
  },
  modalInnerStyle: {
    alignItems: 'center',
  },
  modalText: {
    fontSize: moderateScale(18),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.purple,
  },
  buttonStyle: {
    width: horizontalScale(110),
    height: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    borderRadius: 5,
  },
  okButton: {
    backgroundColor: colors.purple,
    marginTop: verticalScale(10),
  },
  okButtonText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
});
