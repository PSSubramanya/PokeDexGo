import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {verticalScale, horizontalScale} from '../../ultilities/scale';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  shinyIcon: {
    height: verticalScale(22),
    width: horizontalScale(22),
  },
  shinyIconContainer: {
    height: verticalScale(26),
    width: horizontalScale(26),
    backgroundColor: colors.white,
    borderColor: colors.purple,
    borderWidth: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: verticalScale(0),
    right: horizontalScale(0),
  },
});
