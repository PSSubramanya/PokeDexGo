import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

/**
 * Guideline sizes are based on the designs for iPhone X screen mobile device
 * iPhone X Resolution: 375 x 812 dp.
 */
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
// const guidelineBaseWidth = 375;
// const guidelineBaseHeight = 680;

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;
const viewportWidth = width;
const viewportHeight = height;

export {
  horizontalScale,
  verticalScale,
  moderateScale,
  viewportWidth,
  viewportHeight,
};
