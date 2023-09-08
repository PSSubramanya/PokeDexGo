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
    marginBottom: verticalScale(30),
  },
  eventTimeStyle: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(11.5),
    marginTop: verticalScale(15),
  },
  cardBodySection: {
    marginLeft: horizontalScale(13),
    width: horizontalScale(190),
    justifyContent: 'space-between',
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
    padding: horizontalScale(19),
    borderRadius: 10,
  },
  modalInnerStyle: {
    alignItems: 'center',
  },
  modalMarginStyle: {
    marginHorizontal: horizontalScale(20),
  },
  modalImage: {
    height: verticalScale(200),
    width: horizontalScale(200),
    marginTop: verticalScale(9),
    marginHorizontal: horizontalScale(40),
  },
  modalDescriptionStyle: {
    textAlign: 'center',
    fontFamily: fontFamily.primaryFontFamilyMedium,
    marginVertical: verticalScale(5),
    color: colors.bluishGrey,
    fontSize: moderateScale(12),
  },
  modalTextStyle: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    fontSize: moderateScale(18),
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
    borderRadius: 5,
    borderColor: colors.purple,
    borderWidth: horizontalScale(1),
  },
  descriptionText: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  emptyListImage: {
    height: verticalScale(180),
    width: horizontalScale(180),
  },
  selectDatePromptImage: {
    height: verticalScale(250),
    width: horizontalScale(250),
  },
  emptyListText: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(16),
  },
  eventDataListContainer: {
    height: '50%',
    marginTop: verticalScale(10),
  },
  calandarView: {
    marginBottom: verticalScale(10),
  },
  topPaddingStyle: {
    marginTop: verticalScale(30),
  },
  cardInnerStyling: {
    marginHorizontal: horizontalScale(10),
    borderRadius: 8,
    marginBottom: verticalScale(10),
  },
  eventsList: {
    marginTop: verticalScale(20),
  },
  eventsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(12),
  },
  eventDateText: {
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(16),
  },
  eventNumberText: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(16),
  },
  eventNumberText2: {
    fontFamily: fontFamily.primaryFontFamilyBold,
    marginLeft: horizontalScale(5),
    color: colors?.white,
  },
  paginationView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDots: {
    height: horizontalScale(6),
    width: verticalScale(6),
    borderRadius: 20,
    marginHorizontal: horizontalScale(6),
  },
  chevronIcon: {
    height: verticalScale(40),
    width: horizontalScale(40),
    marginTop: verticalScale(30),
  },
  eventImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noImageTextStyle: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(18),
    color: colors.purple,
    alignSelf: 'center',
  },
  pokemonName: {
    paddingVertical: verticalScale(5),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
    textAlign: 'center',
  },
  pokemonDescription: {
    paddingHorizontal: horizontalScale(18),
    paddingBottom: verticalScale(10),
  },
  pokemonTypeImageStyel: {
    height: verticalScale(20),
    width: horizontalScale(20),
  },
  pokemonNameStyle: {
    marginLeft: horizontalScale(5),
    marginRight: horizontalScale(10),
    marginTop: verticalScale(1),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  primaryColorStyle: {
    color: colors.secondaryColor,
  },
  activityIndicatorStyle: {
    height: verticalScale(200),
    width: horizontalScale(200),
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalScale(40),
  },
  paginationTextStyle: {
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  paginationRichtext1: {
    color: colors.vermillion,
    fontFamily: fontFamily.primaryFontFamilyBold,
  },
  paginationRichtext2: {
    fontFamily: fontFamily.primaryFontFamilyBold,
  },
  gridImageStyle: {
    height: verticalScale(80),
    width: horizontalScale(80),
    marginHorizontal: horizontalScale(10),
    borderRadius: 5,
    marginVertical: verticalScale(5),
  },
  paginationTextBorder: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.purple,
    // backgroundColor: colors.white,
    paddingHorizontal: horizontalScale(5),
  },
  gridViewDisplay: {
    height: verticalScale(270),
  },
  pokemonNameDisplayView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  shinyIndicatorView: {
    marginTop: verticalScale(1),
    zIndex: 1,
  },
  shinyIcon: {
    height: verticalScale(22),
    width: verticalScale(22),
  },
});
