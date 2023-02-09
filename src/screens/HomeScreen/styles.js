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
  },
  appIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
  },
  eventIconBorder: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginTop: verticalScale(18),
    marginRight: horizontalScale(10),
    height: verticalScale(71),
    width: horizontalScale(71),
  },
  eventIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
  },
  cameraIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
  },
  chevronIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
  },
  selectedEventImage: {
    //TODO: Need to fix this styling
    height: verticalScale(65),
    width: horizontalScale(65),
    borderRadius: 40,
  },
  calendarIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  noEventTitle: {
    fontSize: moderateScale(15),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallTextSize: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyRegular,
  },
  buttonStyle: {
    width: horizontalScale(110),
    height: verticalScale(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    borderRadius: 5,
  },
  viewButton: {
    backgroundColor: colors.purple,
    marginTop: verticalScale(10),
  },
  viewButtonText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  addEventButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGrey,
  },
  addEventButtonText: {
    color: colors.darkGrey,
    textTransform: 'uppercase',
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  calendarStyle: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    height: verticalScale(310),
    marginTop: verticalScale(155),
  },
  flexRow: {
    flexDirection: 'row',
  },
  mediumFontSize: {
    fontSize: moderateScale(19),
  },
  largeFontSize: {
    fontSize: moderateScale(28.5),
  },
  mediumFont: {
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  boldFont: {
    fontFamily: fontFamily.primaryFontFamilyBold,
  },
  cardMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeStampStyle: {
    marginTop: verticalScale(23),
  },
  inputSection: {
    marginTop: -verticalScale(10),
    marginBottom: verticalScale(18),
  },
  rightChevronIcon: {
    marginRight: horizontalScale(58),
  },
  leftChevronIcon: {
    marginLeft: horizontalScale(58),
  },
  viewEventIcon: {
    height: verticalScale(54),
    width: horizontalScale(54),
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: colors.purple,
    shadowColor: colors.purple,
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: verticalScale(5),
    },
    shadowRadius: 5,
    elevation: 5,
    marginTop: -verticalScale(60),
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginRight: horizontalScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInnerStyling: {
    marginTop: verticalScale(32),
    paddingBottom: verticalScale(32),
    paddingTop: verticalScale(13),
    marginHorizontal: horizontalScale(8),
  },
});
