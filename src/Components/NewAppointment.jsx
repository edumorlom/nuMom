import {
  Text,
  TouchableOpacity,
  TextInput as TextBox,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import {Appearance} from 'react-native';
import Constants from 'expo-constants';
import {colors} from 'react-native-elements';
import translate from './getLocalizedText';
import appStyles from './AppStyles';
import Button from './Button';
import {getUid, addAppointment} from '../Firebase';

// push notification snippets from https://docs.expo.io/versions/latest/sdk/notifications/
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NewAppointment(props) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [mode, setMode] = useState();
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  appointment = [
    ([name, setName] = useState(null)),
    ([address, setAddress] = useState(null)),
    ([date, setDate] = useState(
      `${moment().format('MM')}/${moment().format('DD')}/${moment().format(
        'YYYY'
      )}`
    )),
    ([time, setTime] = useState(
      `${moment().format('h')}:${moment().format('mm')}`
    )),
    ([extra, setExtra] = useState(null)),
    ([isDatePickerVisible, setDatePickerVisibility] = useState(false)),
    ([isTimePickerVisible, setTimePickerVisibility] = useState(false)),
    ([eventId, setEventId] = useState(null)),
  ];
  const uid = getUid();

  appointmentInfo = {
    name,
    address,
    date,
    time,
    extra,
    eventId,
  };

  onPress = async () => {
    if (!name || !address) {
      alert(translate('fillOutAllFields'));
    } else {
      await SynchronizeReminders(); // i couldn't create an appointment without getting reminder perms
      await SynchronizeCalendar();
      await addAppointment(uid, appointmentInfo);
      await schedulePushNotification();
      props.navigation.navigate('Appointment');
    }
  };

  showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  handleConfirm = (date) => {
    const newDate = moment(date).format('MM/DD/YYYY');
    setDate(newDate);
    // console.log('A date has been picked: ', newDate);
    hideDatePicker();
  };

  showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  handleConfirmTime = (time) => {
    const newTime = moment(time).format('h:mm a');
    setTime(newTime);
    // console.log('A date has been picked: ', newTime);
    hideTimePicker();
  };

  addEventsToCalendar = async (calendardId) => {
    let hours = moment(time, ['HH:mm a', 'h:mm a']).hours();
    let minutes = moment(time, ['HH:mm a', 'h:mm a']).minutes();
    let addHours = moment(time, ['HH:mm a', 'h:mm a']).add(1, 'h').hours();
    let addMinutes = moment(time, ['HH:mm a', 'h:mm a']).add(30, 'm').minutes();

    const event = {
      title: name,
      notes: extra,
      location: address,
      startDate: moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD'])
        .set({hour: hours, minute: minutes})
        .toDate(),
      endDate: moment(date, ['MM-DD-YYYY', 'YYYY-MM-DD'])
        .set({hour: addHours, minute: addMinutes})
        .toDate(),
      timeZone: Localization.timezone,
    };
    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendardId.toString(),
        event
      );
      return createEventAsyncRes;
    } catch (err) {
      console.log(err);
    }
  };

  SynchronizeCalendar = async () => {
    const {status} = await Permissions.askAsync(Permissions.CALENDAR);

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendars = calendars.filter(
        (item) => item.allowsModifications === true
      );

      try {
        const createEventAsyncRes = await addEventsToCalendar(
          defaultCalendars[0].id
        );
        // console.log(createEventAsyncRes);
        // setEventId(createEventAsyncRes.toString());
      } catch (err) {
        Alert.alert(err.message);
      }
    }
  };

  SynchronizeReminders = async () => {
    const {status} = await Permissions.askAsync(Permissions.REMINDERS);
    // need to handle perms not being granted, since it cannot create an appointment without reminders
  };

  function checkMode() {
    // check if user's device/machine is in dark/light mode to choose a contrasting color
    const matchResult = Appearance.getColorScheme();
    if (matchResult == 'dark') return 'white';
    return 'black';
  }

  return (
    <Pressable style={appStyles.contentContainer} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={appStyles.signupContainer}
        enabled={false}
      >
        <View style={appStyles.TextInputAppointment.View}>
          <TextBox
            placeholder={translate('appointmentName')}
            onChangeText={setName}
            value={name}
            style={appStyles.TextInputAppointment.TextInput}
          />
        </View>
        <View style={appStyles.TextInputAppointment.View}>
          <TextBox
            placeholder={translate('appointmentAddress')}
            onChangeText={setAddress}
            value={address}
            style={appStyles.TextInputAppointment.TextInput}
          />
        </View>
        <View style={appStyles.TextInputAppointment.View}>
          <TextBox
            placeholder={translate('appointmentExtra')}
            onChangeText={setExtra}
            value={extra}
            style={appStyles.TextInputAppointment.TextInput}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.textTitle}>{translate('Date')}</Text>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.textStyle}>{date}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            is24Hour
            headerTextIOS={translate('dateHeader')}
            textColor={checkMode()}
          />
        </View>
        <View style={styles.seperator} />
        <View style={styles.container}>
          <Text style={styles.textTitle}>{translate('Time')}</Text>
          <TouchableOpacity onPress={showTimePicker}>
            <Text style={styles.textStyle}>{time}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            is24Hour
            headerTextIOS={translate('timeHeader')}
            textColor={checkMode()}
          />
        </View>
        <View style={styles.seperator} />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: appStyles.win.height * 0.05,
          }}
        >
          <Button
            style={appStyles.button}
            text={translate('save')}
            onPress={onPress}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  seperator: {
    height: 0.2,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 8,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: appStyles.win.height * 0.005,
  },
  textTitle: {
    ...Platform.select({
      ios: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
      android: {
        color: '#9CAAC4',
        fontWeight: '600',
        fontSize: appStyles.regularFontSize - 3,
      },
    }),
  },
  textStyle: {
    ...Platform.select({
      ios: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
      android: {
        fontSize: 19,
        alignSelf: 'center',
        paddingTop: 5,
      },
    }),
  },
});

function getTriggerTime() {
  let today = new Date();
  let apptDate = new Date(date);

  let timeDifference = apptDate.getTime() - today.getTime();
  let daysDifference = timeDifference / (1000 * 3600 * 24);
  console.log(
    `difference in days from current date and appt set date: ${daysDifference}`
  );
  let timeTillNoti = 60;
  if (daysDifference >= 2) {
    timeTillNoti = daysDifference * 86400 - 86400;
  } else {
    if (daysDifference < 0) {
      daysDifference *= -1;
    }
    console.log(`days difference is ${daysDifference}`);
    timeTillNoti = (daysDifference / 2) * 60;
  }
  console.log(`appt noti will trigger in ${timeTillNoti} seconds`);
  return timeTillNoti;
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: translate('appointmentReminder'),
      body: `${translate('appointmentBody')} ${date}`, // could be today instead of tomorrow if appt was created on same day
      data: {data: '-'},
    },
    trigger: {seconds: getTriggerTime()},
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {status: existingStatus} = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const {status} = await Notifications.requestForegroundPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert(translate('failedToken'));
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert(translate('failedDevice'));
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
