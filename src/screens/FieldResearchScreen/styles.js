import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  researchHeaderStyle: {
    backgroundColor: colors.vermillionLighter,
    height: verticalScale(56),
    justifyContent: 'center',
    paddingLeft: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  researchHeaderText: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.white,
    textTransform: 'uppercase',
  },
  researchBodyStyle: {
    backgroundColor: colors.orangeLighter,
    borderColor: colors.orangeLight,
    borderWidth: 2,
    // height: verticalScale(56),
    justifyContent: 'center',
    // paddingLeft: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(3),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: verticalScale(20),
  },
  researchtDescriptionView: {
    backgroundColor: colors.orangeMedium,
    borderRadius: 5,
    margin: verticalScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(80),
  },
  researchtDescriptionBody: {
    paddingLeft: horizontalScale(10),
  },
  researchtDescriptionText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    color: colors.bluishGrey,
    textTransform: 'uppercase',
  },
  possibleRewardsText: {
    textTransform: 'uppercase',
    color: colors.greyLight,
    fontFamily: fontFamily.primaryFontFamilyMedium,
    // fontStyle: 'italic',
  },
  rewardsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  rewardImageDisplay: {
    height: horizontalScale(60),
    width: verticalScale(60),
  },
  rewardText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.bluishGrey,
    marginLeft: horizontalScale(12),
    alignSelf: 'center',
  },
  rewardCircle: {
    borderWidth: 1,
    // height: horizontalScale(50),
    // width: verticalScale(50),
    borderColor: colors.vermillionLighter,
    backgroundColor: colors.orangeMedium,
    borderRadius: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  shinyIcon: {
    height: verticalScale(22),
    width: horizontalScale(22),
  },
  shinyIconContainer: {
    height: verticalScale(16),
    width: horizontalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: verticalScale(-3),
    left: horizontalScale(-3),
  },
  rewardQuantity: {
    marginRight: horizontalScale(20),
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(10),
    borderRadius: 5,
    borderColor: colors.purple,
    borderWidth: horizontalScale(1),
  },
  rewardTextQuantitytext: {
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.purple,
  },
});
