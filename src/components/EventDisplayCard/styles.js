import {StyleSheet} from 'react-native';
import fontFamily from '../../ultilities/fontFamily';
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
});
