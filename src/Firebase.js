import * as firebase from "firebase";
import getLocalizedText from "./Components/getLocalizedText";
import { NativeModules } from "react-native";
import firebaseAccount from './firebase_account.json';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';



const config = firebaseAccount;

firebase.initializeApp(config);


export const signUp = (email, phoneNumber, password, fullName, dob, pregnant, infant, liveMiami, babyDOB, nextWeek, week) => {
  createUserWithEmailAndPassword(email, password).then(response => {
    saveUserInfo(response.user.uid, phoneNumber, fullName, dob, pregnant, infant, liveMiami, babyDOB, nextWeek, week).then(() => {
      sendWelcomeSMS(fullName, phoneNumber).then(response => console.log("Text Message Sent Successfully!"));
    }, e => { alert("ERROR: Couldn't save user information!") })
  }, e => { alert("ERROR: E-Mail is already associated with another account!"); })
};

export const createUserWithEmailAndPassword = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const logIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);


//Change this function to use ref.update instead of set
export const storeObjectInDatabase = (uid, object) => {
  if (!uid) return;
  getUserInfo(uid).on("value", (snapshot) => {
    firebase
      .database()
      .ref("users/" + uid)
      .update(object);
  });
}

export const saveUserInfo = (uid, phoneNumber, fullName, dob, pregnant, infant, liveMiami, babyDOB, nextWeek, week) => {
  if (!uid) return;
  return firebase.database().ref('users/' + uid).set({
    phoneNumber: phoneNumber,
    fullName: fullName,
    dob: dob,
    pregnant: pregnant,
    infant: infant,
    babyDOB: babyDOB,
    liveMiami: liveMiami,
    nextWeek: nextWeek,
    week: week,
    appointments: null
  }).catch(err => console.log(err));

};

//Hardcoded to work only inside the US (+1). Would have to be changed for other countries.
export const sendWelcomeSMS = async (fullName, phoneNumber) => {
  let deviceLanguage = Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier;
  phoneNumber = phoneNumber.substring(0, 2) === '+1' ? phoneNumber : '+1' + phoneNumber;
  let name = fullName.split(" ")[0];
  let message = getLocalizedText(deviceLanguage, 'welcomeSMS').replace("{NAME}", name);
  console.log(message);
  return await fetch(
    `https://us-central1-numom-57642.cloudfunctions.net/sendCustomSMS?phoneNumber=${phoneNumber}`,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    }
  );
}


export const getUserInfo = (uid) => firebase.database().ref("users/" + uid);

export const getUserData = async (property) => {
  let uid = firebase.auth().currentUser.uid;
  let address = `users/${uid}/${property}`;
  let value = '';
  await firebase.database().ref(address).once('value', (snapshot) => {
    value = snapshot.val();
  });
  return value;
}


export const getRef = (address) => firebase.database().ref(address);

export const passwordReset = (email) => {
  return firebase.auth().sendPasswordResetEmail(email)
}

export const registerForPushNotificationsAsync = async (currentUser) => {
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to our backend so we can use it to send pushes from there
  var updates = {}
  updates['/expoToken'] = token
  await firebase.database().ref('users/' + currentUser.uid).update(updates)
  //call the push notification 
}

export const uploadImage = async(uri, user) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = firebase.storage().ref().child(user.uid + '/' + "my-image");
  return ref.put(blob);
}

export const getUid = () => {
  return firebase.auth().currentUser.uid;
}

export const getAuth = () => {
  return firebase.auth()
}

export const deleteAppointment = async (id, uid, objects, setObjects) => {
  if (uid !== null) {

    setObjects(objects.filter((item) => item.key !== id));

    const appointments = firebase.database().ref('users/' + uid + '/appointments/' + id);
    return appointments.remove();

  } else {
    console.log("Error: Couldn't get the User appointment Info");
  }

}

export const fetchAppointment = async (uid, setObjects, _isMounted) => {
  _isMounted = true;
  if (uid !== null) {
    await firebase.database().ref('users/' + uid + '/appointments/').once('value', (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        console.log(childKey);
        console.log(childData);
        if (childSnapshot.val() !== null || childSnapshot.val() !== 'undefined') {
          if (_isMounted) {
            setObjects(prevArray => [...prevArray, childSnapshot]);
          }
        }
      });
    });
  } else {
    alert("Error: Couldn't get the Appointment Info");
  }
}

export const addAppointment = async (uid, appointmentInfo) => {
  firebase.database().ref("users/" + uid + "/appointments").push(appointmentInfo).catch((err) => console.log(err));
}