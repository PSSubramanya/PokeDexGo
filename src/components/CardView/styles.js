import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import fontFamily from '../../ultilities/fontFamily';

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
  cardView: {
    // backgroundColor: colors.white,
    shadowColor: colors.bluishGrey,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 14,
    elevation: 3,
    borderRadius: 3,
  },
});
