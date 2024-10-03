// import React, {useState, useEffect} from 'react';
// import {DeviceEventEmitter, Alert, Platform} from 'react-native';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import notifee, {AndroidStyle, TriggerType} from '@notifee/react-native';

// export const usePushNotification = navigation => {
//   const [permissions, setPermissions] = useState({});

//   useEffect(() => {
//     if (Platform.OS === 'ios') {
//       PushNotificationIOS.addEventListener('register', onRegistered);
//       PushNotificationIOS.addEventListener(
//         'registrationError',
//         onRegistrationError,
//       );
//       PushNotificationIOS.addEventListener(
//         'notification',
//         onRemoteNotification,
//       );
//       PushNotificationIOS.addEventListener(
//         'localNotification',
//         onLocalNotification,
//       );

//       PushNotificationIOS.requestPermissions({
//         alert: true,
//         badge: true,
//         sound: true,
//         critical: true,
//       }).then(
//         data => {
//           console.log('PushNotificationIOS.requestPermissions', data);
//         },
//         data => {
//           console.log('PushNotificationIOS.requestPermissions failed', data);
//         },
//       );
//     }

//     return () => {
//       PushNotificationIOS.removeEventListener('register');
//       PushNotificationIOS.removeEventListener('registrationError');
//       PushNotificationIOS.removeEventListener('notification');
//       PushNotificationIOS.removeEventListener('localNotification');
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const sendNotification = () => {
//     DeviceEventEmitter.emit('remoteNotificationReceived', {
//       remote: true,
//       aps: {
//         alert: {title: 'title', subtitle: 'subtitle', body: 'body'},
//         badge: 1,
//         sound: 'default',
//         category: 'REACT_NATIVE',
//         'content-available': 1,
//         'mutable-content': 1,
//       },
//     });
//   };

//   const sendSilentNotification = () => {
//     DeviceEventEmitter.emit('remoteNotificationReceived', {
//       remote: true,
//       aps: {
//         category: 'REACT_NATIVE',
//         'content-available': 1,
//       },
//     });
//   };

//   const sendLocalNotification = (
//     notificationTitle,
//     notificationDescription,
//   ) => {
//     PushNotificationIOS.presentLocalNotification({
//       alertTitle: notificationTitle, //'Sample Title',
//       alertBody: notificationDescription, //'Sample local notification',
//       applicationIconBadgeNumber: 1,
//     });
//   };

//   /* NOTE: The one we are using in the app */

//   const sendLocalNotificationWithSound = (
//     notificationTitle,
//     notificationSubtitle,
//     notificationDescription,
//     notificationImageUrl,
//   ) => {
//     const defaultImage = 'https://www.github.com/Naturalclar.png';

//     PushNotificationIOS.addNotificationRequest({
//       id: 'notificationWithSound',
//       title: notificationTitle,
//       subtitle: notificationSubtitle,
//       body: notificationDescription,
//       sound: 'customSound.wav',
//       badge: 1,
//       fireDate: new Date(new Date().valueOf() + 2000),
//       userInfo: {
//         image: notificationImageUrl ?? defaultImage,
//       },
//     });
//   };

//   const scheduleLocalNotification = () => {
//     PushNotificationIOS.scheduleLocalNotification({
//       alertBody: 'TESTING LOCAL NOTIFICATION',
//       fireDate: new Date(new Date().valueOf() + 2000),
//     });
//   };

//   const addNotificationRequest = () => {
//     PushNotificationIOS.addNotificationRequest({
//       id: 'test',
//       title: 'title',
//       subtitle: 'subtitle',
//       body: 'body',
//       category: 'test',
//       threadId: 'thread-id',
//       fireDate: new Date(new Date().valueOf() + 2000),
//       repeats: true,
//       userInfo: {
//         image: 'https://www.github.com/Naturalclar.png',
//       },
//     });
//   };

//   const addCriticalNotificationRequest = () => {
//     PushNotificationIOS.addNotificationRequest({
//       id: 'critical',
//       title: 'Critical Alert',
//       subtitle: 'subtitle',
//       body: 'This is a critical alert',
//       category: 'test',
//       threadId: 'thread-id',
//       isCritical: true,
//       fireDate: new Date(new Date().valueOf() + 2000),
//       repeats: true,
//     });
//   };

//   const addMultipleRequests = () => {
//     PushNotificationIOS.addNotificationRequest({
//       id: 'test-1',
//       title: 'First',
//       subtitle: 'subtitle',
//       body: 'First Notification out of 3',
//       category: 'test',
//       threadId: 'thread-id',
//       fireDate: new Date(new Date().valueOf() + 10000),
//       repeats: true,
//     });

//     PushNotificationIOS.addNotificationRequest({
//       id: 'test-2',
//       title: 'Second',
//       subtitle: 'subtitle',
//       body: 'Second Notification out of 3',
//       category: 'test',
//       threadId: 'thread-id',
//       fireDate: new Date(new Date().valueOf() + 12000),
//       repeats: true,
//     });

//     PushNotificationIOS.addNotificationRequest({
//       id: 'test-3',
//       title: 'Third',
//       subtitle: 'subtitle',
//       body: 'Third Notification out of 3',
//       category: 'test',
//       threadId: 'thread-id',
//       fireDate: new Date(new Date().valueOf() + 14000),
//       repeats: true,
//     });
//   };

//   const getPendingNotificationRequests = () => {
//     PushNotificationIOS.getPendingNotificationRequests(requests => {
//       Alert.alert('Push Notification Received', JSON.stringify(requests), [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ]);
//     });
//   };

//   const setNotificationCategories = async () => {
//     PushNotificationIOS.setNotificationCategories([
//       {
//         id: 'test',
//         actions: [
//           {id: 'open', title: 'Open', options: {foreground: true}},
//           {
//             id: 'ignore',
//             title: 'Desruptive',
//             options: {foreground: true, destructive: true},
//           },
//           {
//             id: 'text',
//             title: 'Text Input',
//             options: {foreground: true},
//             textInput: {buttonTitle: 'Send'},
//           },
//         ],
//       },
//     ]);

//     Alert.alert(
//       'setNotificationCategories',
//       `Set notification category complete`,
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   };

//   const removeAllPendingNotificationRequests = () => {
//     PushNotificationIOS.removeAllPendingNotificationRequests();
//   };

//   const removePendingNotificationRequests = () => {
//     PushNotificationIOS.removePendingNotificationRequests(['test-1', 'test-2']);
//   };

//   const onRegistered = deviceToken => {
//     // Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
//     //   {
//     //     text: 'Dismiss',
//     //     onPress: null,
//     //   },
//     // ]);
//   };

//   const onRegistrationError = error => {
//     Alert.alert(
//       'Failed To Register For Remote Push',
//       `Error (${error.code}): ${error.message}`,
//       [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ],
//     );
//   };

//   const onRemoteNotification = notification => {
//     const isClicked = notification.getData().userInteraction === 1;

//     const result = `
//       Title:  ${notification.getTitle()};\n
//       Subtitle:  ${notification.getSubtitle()};\n
//       Message: ${notification.getMessage()};\n
//       badge: ${notification.getBadgeCount()};\n
//       sound: ${notification.getSound()};\n
//       category: ${notification.getCategory()};\n
//       content-available: ${notification.getContentAvailable()};\n
//       Notification is clicked: ${String(isClicked)}.`;

//     if (notification.getTitle() == undefined) {
//       Alert.alert('Silent push notification Received', result, [
//         {
//           text: 'Send local push',
//           onPress: sendLocalNotification,
//         },
//       ]);
//     } else {
//       Alert.alert('Push Notification Received', result, [
//         {
//           text: 'Dismiss',
//           onPress: null,
//         },
//       ]);
//     }
//     notification.finish('UIBackgroundFetchResultNoData');
//   };

//   const onLocalNotification = notification => {
//     const isClicked = notification.getData().userInteraction === 1;

//     navigation.navigate('EventViewScreen', {
//       selectedDate: new Date(),
//     });

//     /* NOTE: Navigate to the events page for the given date. Then send a trigger keyword that opens the modal of that even in that page */
//     // Alert.alert(
//     //   'Local Notification Received',
//     //   `Alert title:  ${notification.getTitle()},
//     //   Alert subtitle:  ${notification.getSubtitle()},
//     //   Alert message:  ${notification.getMessage()},
//     //   Badge: ${notification.getBadgeCount()},
//     //   Sound: ${notification.getSound()},
//     //   Thread Id:  ${notification.getThreadID()},
//     //   Action Id:  ${notification.getActionIdentifier()},
//     //   User Text:  ${notification.getUserText()},
//     //   Notification is clicked: ${String(isClicked)}.`,
//     //   [
//     //     {
//     //       text: 'Dismiss',
//     //       onPress: null,
//     //     },
//     //   ],
//     // );
//   };

//   const showPermissions = () => {
//     if (Platform.OS === 'ios') {
//       PushNotificationIOS.checkPermissions(permissions => {
//         setPermissions({permissions});
//       });
//     }
//   };

//   const localNotif = (
//     notificationTitle,
//     notificationSubtitle,
//     notificationDescription,
//     notificationImageUrl,
//     soundName,
//   ) => {
//     console.log('IM HEREEEEE 123');
//     PushNotification.createChannel(
//       {
//         channelId: '1',
//         channelName: 'name',
//       },
//       created => console.log(`createdChannel returned '${created}'`),
//     );
//     console.log('IM HEREEEEE TOO 123');
//     PushNotification.localNotification({
//       /* Android Only Properties */
//       channelId: '1', // (required) channelId, if the channel doesn't exist, notification will not trigger.
//       channelName: 'name',
//       channelDescription: 'Channel Description',
//       largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
//       largeIconUrl: 'ic_launcher', //'https://www.example.tld/picture.jpg', // (optional) default: undefined
//       smallIcon: 'ic_launcher', //'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
//       bigText: notificationDescription,
//       title: notificationSubtitle,
//       subText: notificationTitle,
//       bigPictureUrl: notificationImageUrl, // 'https://www.example.tld/picture.jpg', // (optional) default: undefined
//       bigLargeIcon: 'ic_launcher', // (optional) default: undefined
//       bigLargeIconUrl: notificationImageUrl, //'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
//       color: 'red', // (optional) default: system default
//       vibrate: true, // (optional) default: true
//       vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
//       message: notificationDescription, // (required)
//       // picture: 'https://www.example.tld/picture.jpg', // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
//       // userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
//       // playSound: false, // (optional) default: true
//       soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
//       // number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
//       // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
//       importance: 4,
//     });
//     console.log('IM HEREEEEE THREE 123');
//   };

//   // NOTE: This is the function that triggers Notification via Notifee
//   function onDisplayNotification(
//     notificationTitle,
//     notificationSubtitle,
//     notificationDescription,
//     notificationImageUrl,
//     eventId,
//     evDat,
//     returnedValue,
//     // soundName,
//   ) {
//     let channelId;

//     notifee
//       .createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         vibration: true,
//         vibrationPattern: [300, 500],
//         sound: 'hollow',
//         // sound: 'pikachu_notification_sound.mp3',
//       })
//       .then(cId => {
//         // Channel created successfully, you can use the channelId as needed
//         channelId = cId;
//         console.log('Channel created with ID:', channelId, typeof channelId);
//       })
//       .catch(err => {
//         console.error('Channel request error:', err);
//       });

//     /*
//     // Create a time-based trigger
//     const trigger = {
//       type: TriggerType.TIMESTAMP,
//       timestamp: Date.now() + 5000, // Schedule notification for 2 minutes for 12000 from now
//       // timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
//     };

//     // Create a scheduled trigger notification
//     notifee
//       .createTriggerNotification(
//         {
//           title: 'Meeting with Jane',
//           body: 'Today at 11:20am',
//           android: {
//             channelId: 'default',
//           },
//         },
//         trigger,
//       )
//       .then(val => console.log('Create Trigger Notification Successful'))
//       .catch(err => console.log('Error in Create Trigger Notification, ', err));

//     */

//     // Display a notification
//     notifee
//       .displayNotification({
//         id: eventId,
//         title: notificationTitle,
//         subtitle: notificationSubtitle,
//         body: notificationDescription,
//         android: {
//           channelId: 'default',
//           smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
//           style: {
//             type: AndroidStyle.BIGPICTURE,
//             picture: notificationImageUrl,
//             // picture:
//             //   'https://qph.cf2.quoracdn.net/main-qimg-88a14491cefee50fa13e38063b99a066-lq',
//           },
//           vibrationPattern: [300, 500],
//           sound: 'hollow',
//           // sound: 'pikachu_notification_sound.mp3',
//           // pressAction is needed if you want the notification to open the app when pressed
//           pressAction: {
//             id: 'default',
//           },
//         },
//       })
//       .then(() => {
//         // Notification displayed successfully
//         console.log('Notification displayed successfully', notificationTitle);

//         /*
//          WHEN CLICKED ON NOTIFICATION:

//          navigation.navigate('EventViewScreen', {
//           selectedDate: new Date(),
//          });
//         */
//       })
//       .catch(error => {
//         // Handle errors during notification display
//         console.error('Error displaying notification:', error);
//       });
//   }

//   return {
//     sendNotification,
//     sendSilentNotification,
//     sendLocalNotification,
//     sendLocalNotificationWithSound,
//     scheduleLocalNotification,
//     addNotificationRequest,
//     addCriticalNotificationRequest,
//     addMultipleRequests,
//     getPendingNotificationRequests,
//     setNotificationCategories,
//     removeAllPendingNotificationRequests,
//     removePendingNotificationRequests,
//     onRegistered,
//     onRegistrationError,
//     onRemoteNotification,
//     onLocalNotification,
//     showPermissions,
//     permissions,
//     localNotif,
//     onDisplayNotification,
//   };
// };
