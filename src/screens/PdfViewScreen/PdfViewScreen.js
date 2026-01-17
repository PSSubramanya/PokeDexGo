import React from 'react';
import {View, Platform} from 'react-native';
// import Pdf from 'react-native-pdf';
// import PDFReader from 'rn-pdf-reader-js';
// import PDFView from 'react-native-pdf-view';
import {WebView} from 'react-native-webview';
import styles from './styles.js';
import {NotificationService} from '../../ultilities/services/notifications/notificationService.js';

const PdfViewScreen = props => {
  const {navigation} = props;
  NotificationService(navigation);

  return (
    <View style={styles.container}>
      {/* <WebView
        source={{
          uri: 'https://www.educative.io/answers/how-to-use-webview-in-react-native',
        }}
      /> */}
      <WebView
        source={{
          // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
          uri: 'https://drive.google.com/file/d/17jOz7VMv_A6llpnVHTnwZZapGy5Tu1CF/view?usp=sharing',
          // uri: 'https://www.bgsu.edu/content/dam/BGSU/libraries/documents/collab-lab/Sketchup-Tutorial.pdf',
          // uri: 'https://github.com/PSSubramanya/pokeguidebook/blob/main/PS%20Subramanya%20Bhat%20Resume.pdf',
        }}
      />
    </View>
  );
};
export default PdfViewScreen;
