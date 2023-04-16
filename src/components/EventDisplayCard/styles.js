import {StyleSheet} from 'react-native';
import fontFamily from '../../ultilities/fontFamily';
import colors from '../../constants/colors';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  pokemonBanner: {
    height: verticalScale(110),
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  greyScalingStyle: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: verticalScale(110),
    position: 'absolute',
    opacity: 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  eventCardBodySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTextSection: {
    paddingHorizontal: horizontalScale(8),
    width: horizontalScale(323),
  },
  eventTitle: {
    paddingTop: verticalScale(12),
    fontFamily: fontFamily.primaryFontFamilySemiBold,
    fontSize: moderateScale(16),
  },
  eventDescription: {
    fontFamily: fontFamily.primaryFontFamilyRegular,
    fontSize: moderateScale(11.5),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(30),
  },
  cardFooterSection: {
    height: verticalScale(80),
    justifyContent: 'space-between',
    marginRight: horizontalScale(20),
    marginTop: verticalScale(12),
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
  bonusSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    zIndex: 1,
    marginTop: -horizontalScale(35),
    justifyContent: 'flex-end',
    marginRight: horizontalScale(5),
    // opacity: 0.5,
  },
  bonusTextView: {
    marginBottom: verticalScale(10),
    marginLeft: horizontalScale(5),
    backgroundColor: colors.white,
    borderRadius: 5,
    borderColor: colors.purple,
    borderWidth: horizontalScale(1),
  },
  bonusTextStyle: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(5),
    color: colors.purple,
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(12),
  },
  completedTextView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: verticalScale(5),
  },
  completedTextStyle: {
    color: colors.red,
    fontFamily: fontFamily.primaryFontFamilyBold,
    fontSize: moderateScale(18),
  },
});
