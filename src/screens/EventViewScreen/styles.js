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
  flexRowStyle: {
    flexDirection: 'row',
  },
  eventImage: {
    height: verticalScale(45),
    width: horizontalScale(45),
  },
  eventName: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    color: colors.purple,
  },
  eventDescription: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(11.5),
    marginTop: verticalScale(5),
  },
  eventTimeStyle: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(11.5),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    color: colors.purple,
  },
  cardBodySection: {
    marginLeft: horizontalScale(13),
    width: horizontalScale(190),
    justifyContent: 'space-between',
  },
  notificationIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
  },
  checkmarkIcon: {
    height: verticalScale(25),
    width: horizontalScale(25),
    marginBottom: verticalScale(5),
  },
  cardFooterSection: {
    height: verticalScale(80),
    justifyContent: 'space-between',
    marginRight: horizontalScale(12),
  },
  cardHeaderSection: {
    height: verticalScale(60),
    justifyContent: 'center',
  },
  timelineCardStyle: {
    flexDirection: 'row',
    marginLeft: horizontalScale(15),
    justifyContent: 'space-between',
  },
  flatListKnob: {
    height: verticalScale(19),
    width: horizontalScale(19),
    borderRadius: 30,
    borderColor: colors.purple,
    backgroundColor: colors.purple,
    borderWidth: 2,
    marginLeft: horizontalScale(49),
  },
  modalExternalStyle: {
    backgroundColor: colors.white,
    padding: horizontalScale(19),
    borderRadius: 10,
  },
  modalInnerStyle: {
    alignItems: 'center',
  },
  modalMarginStyle: {
    marginHorizontal: horizontalScale(38),
  },
  modalImage: {
    height: verticalScale(193),
    width: horizontalScale(193),
    marginTop: verticalScale(9),
  },
  modalDescriptionStyle: {
    textAlign: 'center',
    fontFamily: fontFamily.primaryFontFamilyMedium,
    marginVertical: verticalScale(10),
    color: colors.bluishGrey,
  },
  modalTextStyle: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    fontSize: moderateScale(18),
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
  viewButton: {
    backgroundColor: colors.purple,
    marginTop: verticalScale(10),
  },
  viewButtonText: {
    color: colors.white,
    textTransform: 'uppercase',
    fontFamily: fontFamily.primaryFontFamilyMedium,
  },
  purpleTextColor: {
    color: colors.purple,
  },
  descriptionDataContentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  descriptionView: {
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(5),
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.purple,
    borderWidth: horizontalScale(1),
  },
  descriptionText: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    color: colors.purple,
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
});
