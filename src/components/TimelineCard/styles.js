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
  flexStyle: {
    flex: 1,
  },
  cardContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(2),
  },
  timestamp: {
    marginTop: verticalScale(15),
    marginLeft: horizontalScale(8),
    fontFamily: fontFamily.primaryFontFamilyMedium,
    fontSize: moderateScale(11.5),
    color: colors.bluishGrey,
  },
  cardInnerStyle: {
    paddingBottom: verticalScale(10),
    paddingTop: verticalScale(18),
    borderColor: colors.purple,
    borderWidth: 0.5, // may be remove this
    borderLeftWidth: horizontalScale(7.5),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: horizontalScale(9),
    marginLeft: horizontalScale(5),
  },
  timelineCardLineStyle: {
    borderLeftWidth: 2,
    borderColor: colors.purple,
    marginHorizontal: 60,
  },
  timelineCardTopLineHeight: {
    height: verticalScale(19),
  },
  timelineCardBottomLineHeight: {
    height: verticalScale(38),
  },
});
