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
  topSection: {
    flex: 1,
    justifyContent: 'center',
  },
  appIcon: {
    height: verticalScale(130),
    width: horizontalScale(130),
  },
  eventIconBorder: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(40),
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
    height: verticalScale(30),
    width: horizontalScale(30),
  },
  chevronIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
  },
  selectedEventImage: {
    //TODO: Need to fix this styling
    height: verticalScale(71),
    width: horizontalScale(71),
    borderRadius: moderateScale(40),
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
    borderWidth: 1,
    borderColor: colors.purple,
    // shadowColor: colors.purple,
    // shadowOpacity: 0.15,
    // shadowOffset: {
    //   width: 0,
    //   height: verticalScale(5),
    // },
    // shadowRadius: 5,
    // elevation: 5,
    // marginTop: -verticalScale(60),
    marginBottom: verticalScale(30),
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
  textFieldsHeader: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.bluishGrey,
    marginLeft: horizontalScale(15),
    marginTop: verticalScale(25),
    fontSize: moderateScale(12),
  },
  compulsorySignStyle: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.red,
    marginTop: verticalScale(20),
    fontSize: moderateScale(15),
  },
  textFieldContainer: {
    height: verticalScale(53),
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    marginHorizontal: horizontalScale(10),
  },
  textFieldStyle: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    paddingLeft: horizontalScale(5),
    textAlign: 'left',
  },
  smallerTextfieldWidth: {
    width: '45%',
  },
  modalStyle: {
    backgroundColor: 'white',
    width: '80%',
    height: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  modalTitleStyle: {
    textAlign: 'center',
    marginTop: horizontalScale(19),
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  modalTimeContainer: {
    borderWidth: 0.5,
    borderColor: colors.purple,
    alignItems: 'center',
    marginHorizontal: horizontalScale(30),
    borderRadius: 10,
    // height: verticalScale(110),
    justifyContent: 'space-between',
  },
  timeSeparatorStyle: {
    color: colors.purple,
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(40),
    opacity: 0.5,
    marginLeft: horizontalScale(10),
  },
  modalTimeStyle: {
    color: colors.purple,
    fontSize: moderateScale(40),
  },
  minuteDisplayStyle: {
    marginLeft: horizontalScale(10),
  },
  upperChevron: {
    height: verticalScale(30),
    width: horizontalScale(30),
    marginVertical: verticalScale(20),
    transform: [{rotate: '90deg'}],
  },
  lowerChevron: {
    height: verticalScale(30),
    width: horizontalScale(30),
    marginVertical: verticalScale(20),
    transform: [{rotate: '90deg'}],
  },
  ampmSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  amStyle: {
    width: horizontalScale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    borderRadius: 5,
  },
  pmStyle: {
    width: horizontalScale(50),
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(5),
    borderRadius: 5,
  },
  modalBottomSection: {
    borderWidth: 1,
    borderColor: colors.purple,
    opacity: 0.65,
    marginHorizontal: horizontalScale(20),
  },
  closeButton: {
    textTransform: 'uppercase',
    fontFamily: fontFamily.primaryFontFamilyMedium,
    alignSelf: 'center',
    marginBottom: verticalScale(25),
    marginTop: verticalScale(10),
  },
  numberOfEvents: {
    fontSize: moderateScale(90),
    fontFamily: fontFamily.primaryFontFamilyBold,
    alignSelf: 'center',
    // color: colors.purple,
  },
  primaryColorStyle: {
    color: colors.secondaryColor,
  },
});
