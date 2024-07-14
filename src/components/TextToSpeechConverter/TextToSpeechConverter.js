import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import Tts from 'react-native-tts';
import imagePaths from '../../constants/imagePaths';
import colors from '../../constants/colors';
// import styles from './styles.js';

const TextToSpeechConverter = props => {
  const {targetText} = props;
  const [ttsStatus, setTtsStatus] = useState('initiliazing');
  const [speak, setSpeak] = useState(false);

  useEffect(() => {
    const speechRate = 0.55;
    const speechPitch = 1;
    Tts.addEventListener('tts-start', _event => setTtsStatus('started'));
    Tts.addEventListener('tts-finish', _event => setTtsStatus('finished'));
    Tts.addEventListener('tts-cancel', _event => setTtsStatus('cancelled'));
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    Tts.getInitStatus().then(initTts);
    return () => {
      Tts.removeEventListener('tts-start', _event => setTtsStatus('started'));
      Tts.removeEventListener('tts-finish', _event => setTtsStatus('finished'));
      Tts.removeEventListener('tts-cancel', _event =>
        setTtsStatus('cancelled'),
      );
    };
  }, []);

  useEffect(() => {
    const voiceItem = {
      id: 'com.apple.voice.compact.en-US.Samantha',
      language: 'en-US',
      name: 'Samantha',
    };
    onVoicePress(voiceItem);
  }, []);

  useEffect(() => {
    readText();
  }, [speak]);

  const initTts = async () => {
    const voices = await Tts.voices();
    // Tts.voices().then(voices => console.log(voices));
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });
    let selectedVoice = null;
    if (voices && voices.length > 0) {
      // selectedVoice = voices[0].id;
      selectedVoice = 'com.apple.voice.compact.en-US.Samantha';
      try {
        await Tts.setDefaultLanguage('en-US');
      } catch (err) {
        //Samsung S9 has always this error:
        //"Language is not supported"
        console.log(`setDefaultLanguage error `, err);
      }
      await Tts.setDefaultVoice('com.apple.voice.compact.en-US.Samantha');
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };

  const readText = async () => {
    // Tts.stop();
    // Tts.speak(targetText); //targetText
    speak ? Tts.speak(targetText) : Tts.stop();
  };

  const onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      // Samsung S9 has always this error:
      // "Language is not supported"
      console.log(`setDefaultLanguage error `, err);
    }
    await Tts.setDefaultVoice(voice.id);
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setSpeak(!speak);
      }}>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: colors?.secondaryRedColor,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={speak ? imagePaths?.mikeOffIcon : imagePaths?.mikeOnIcon}
          style={{height: 20, width: 20}}
          height={20}
          width={20}
        />
      </View>
    </TouchableOpacity>
  );
};
export default TextToSpeechConverter;
