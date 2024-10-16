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
  raidTierHeaderStyle: {
    height: verticalScale(56),
    paddingLeft: horizontalScale(10),
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tierHeaderStyle: {
    fontSize: moderateScale(14),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    color: colors.white,
    textTransform: 'uppercase',
    marginLeft: horizontalScale(10),
  },
  raidIcon: {
    height: verticalScale(30),
    width: horizontalScale(30),
  },
  raidListStyle: {
    borderWidth: 2,
    justifyContent: 'center',
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(3),
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingBottom: verticalScale(20),
  },
  rewardsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  raidBossImageDisplay: {
    height: horizontalScale(60),
    width: verticalScale(60),
  },
  rewardText: {
    fontSize: moderateScale(12),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    marginLeft: horizontalScale(10),
    alignSelf: 'center',
    width: horizontalScale(100),
  },
  rewardCircle: {
    borderWidth: 1,
    borderColor: colors.vermillionLighter,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginLeft: horizontalScale(10),
    justifyContent: 'center',
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
    marginTop: verticalScale(10),
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    width: horizontalScale(130),
  },
  rewardTextQuantitytext: {
    fontFamily: fontFamily.primaryFontFamilySemiBold,
  },
  pokemonTypeImageStyel: {
    height: verticalScale(20),
    width: horizontalScale(20),
  },
  pokemonNameStyle: {
    marginTop: verticalScale(1),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  pokemonInfoSection: {
    alignSelf: 'center',
  },
  pokemonTypeStyle: {
    marginLeft: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  boostedText: {
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    color: colors.bluishGrey,
  },
  raidBossScrollPageStyle: {
    marginBottom: verticalScale(10),
  },
});
