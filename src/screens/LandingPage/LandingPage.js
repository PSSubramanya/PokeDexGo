import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNetStatusInfo} from '../../ultilities/customHooks/useNetStatusInfo';
import strings from '../../constants/strings';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
import soundTracks from '../../constants/soundTracks';
import {eventDataLoad} from '../../actions/eventData';
import styles from './styles';
import commonStyling from '../../ultilities/commonStyling/commonStyling';
import {CircleRightArrow} from '../../assets/images/svg';
import webscrappedData from '../../ultilities/pokemonData/pokemon_data6.json';

const LandingPage = ({navigation}) => {
  const dispatch = useDispatch();
  const {networkState} = useNetStatusInfo();

  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    soundTracks?.pikapika1.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    soundTracks?.pikapika1.setVolume(0.5); // NOTE: Reduce the volume by half
    soundTracks?.pikapika1.setPan(0.5); // NOTE: Position the sound to the full right in a stereo field
    soundTracks?.pikapika1.setNumberOfLoops(0); // NOTE: Loop indefinitely until stop() is called
  }, []);

  useEffect(() => {
    let loadedData;
    fetch('https://rahulvhegde.github.io/Data/pokemon_data2.json').then(
      response => {
        response.json().then(res => {
          loadedData = res?.data;
          setLoadData(loadedData);
        });
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkState]);

  useEffect(() => {
    dispatch(eventDataLoad(loadData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadData]);

  const appIconContainer = () => {
    return (
      <View style={styles.centerAlignmentStyle}>
        <Image
          source={imagePaths.appIcon}
          height={1}
          width={1}
          style={styles.appIcon}
        />
        <Text style={[styles.appName, styles.primaryColorStyle]}>
          {strings.app_name}
        </Text>
      </View>
    );
  };

  const continueButton = () => {
    return (
      <>
        {networkState ? (
          <View style={styles.centerAlignmentStyle}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomeScreen', {loadData: loadData});
              }}
              style={commonStyling.centerAlignment}>
              <Image
                source={imagePaths.rightArrowCircle}
                height={1}
                width={1}
                style={styles.rightArrowCircle}
              />
              <Text style={[styles.smallTextSize, styles.primaryColorStyle]}>
                {strings.continue}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
    );
  };

  const mainContainerBody = () => {
    return (
      <View style={styles.mainContainer}>
        {appIconContainer()}
        {continueButton()}
        {/* <CircleRightArrow /> */}
      </View>
    );
  };

  return (
    <SafeAreaView style={{}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.darkBlue} />
      {mainContainerBody()}
    </SafeAreaView>
  );
};

export default LandingPage;
