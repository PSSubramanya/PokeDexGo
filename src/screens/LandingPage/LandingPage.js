import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
import soundTracks from '../../constants/soundTracks';
import {eventDataLoad} from '../../actions/eventData';
import styles from './styles';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import {CircleRightArrow} from '../../assets/images/svg';
import webscrappedData from '../../ultilities/webscrappedData/pokemon_data.json';

const LandingPage = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    soundTracks?.pikapika1.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    soundTracks?.pikapika1.setVolume(0.5); // Reduce the volume by half
    soundTracks?.pikapika1.setPan(0.5); // Position the sound to the full right in a stereo field
    soundTracks?.pikapika1.setNumberOfLoops(0); // Loop indefinitely until stop() is called
  }, []);

  useEffect(() => {
    const loadedData = webscrappedData?.data;
    dispatch(eventDataLoad(loadedData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.darkBlue} />
      <View style={styles.mainContainer}>
        <View style={styles.centerAlignmentStyle}>
          <Image
            source={imagePaths.appIcon}
            height={1}
            width={1}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>{strings.app_name}</Text>
        </View>
        {/* <CircleRightArrow /> */}
        <View style={styles.centerAlignmentStyle}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('HomeScreen');
            }}
            style={commonStyling.centerAlignment}>
            <Image
              source={imagePaths.rightArrowCircle}
              height={1}
              width={1}
              style={styles.rightArrowCircle}
            />
            <Text style={styles.smallTextSize}>{strings.continue}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
