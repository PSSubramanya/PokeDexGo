import Sound from 'react-native-sound';

var pikapika1 = new Sound('pikachu_sound.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

var pikapika2 = new Sound(
  'pikachu_notification_sound.mp3',
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  },
);

export default {
  pikapika1,
  pikapika2,
};
