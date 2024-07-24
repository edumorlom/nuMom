import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
//import 'firebase/compat/storage';
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  push,
  remove,
  child,
} from 'firebase/database';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  ref as ref_storage,
  getDownloadURL,
  getStorage,
  listAll,
  uploadBytes,
  uploadBytesResumable,
  deleteObject,
} from 'firebase/storage';
import firebaseAccount from './firebase_account.json';
import translate from './Components/getLocalizedText';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseAccount);
}
export const signUp = (
  email,
  phoneNumber,
  password,
  fullName,
  dob,
  pregnant,
  infant,
  liveMiami,
  babyDOB,
  nextWeek,
  week
) => {
  createUserWithEmailAndPass(email, password).then(
    (response) => {
      saveUserInfo(
        response.user.uid,
        phoneNumber,
        fullName,
        dob,
        pregnant,
        infant,
        liveMiami,
        babyDOB,
        nextWeek,
        week
      ).then(
        () => {
          sendWelcomeSMS(fullName, phoneNumber).then((response) =>
            console.log('Text Message Sent Successfully!')
          );
        },
        (e) => {
          alert(translate('noUserInfo'));
        }
      );
    },
    (e) => {
      alert(translate('emailExists'));
    }
  );
};

export const createUserWithEmailAndPass = (email, password) =>
  createUserWithEmailAndPassword(getAuth(), email, password);

export const checkEmailExist = async (email) => {
  console.log(`This is the email passed to firebase method  ${email}`);
  return await fetchSignInMethodsForEmail(getAuth(), email);
};

export const logIn = (email, password) =>
  signInWithEmailAndPassword(getAuth(), email, password);

export const storeObjectInDatabase = (uid, object) => {
  if (!uid) return;

  const userInfoRef = ref(getDatabase(), `users/${uid}`);
  update(userInfoRef, object).catch((err) => console.log(err));
};

export const saveUserInfo = (
  uid,
  phoneNumber,
  fullName,
  dob,
  pregnant,
  infant,
  liveMiami,
  babyDOB,
  nextWeek,
  week
) => {
  if (!uid) return;
  return set(ref(getDatabase(), `users/${uid}`), {
    phoneNumber,
    fullName,
    dob,
    pregnant,
    infant,
    babyDOB,
    liveMiami,
    nextWeek,
    week,
    appointments: null,
  }).catch((err) => console.log(err));
};

// Calls the sendCustomSMS cloud function
export const sendWelcomeSMS = async (fullName, phoneNumber) => {
  const areaCodePhoneNumber =
    phoneNumber.substring(0, 2) === '+1' ? phoneNumber : `+1${phoneNumber}`;
  const name = fullName.split(' ')[0];
  const message = translate('welcomeSMS').replace('{NAME}', name);

  return await fetch(
    `https://us-central1-numom-57642.cloudfunctions.net/sendCustomSMS?phoneNumber=${areaCodePhoneNumber}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({message}),
    }
  );
};

// Gets a reference of a specific user
export const getUserInfo = (uid) => ref(getDatabase(), `users/${uid}`);

// fetches a given property from the current user
export const getUserData = async (property) => {
  let uid = getAuth().currentUser.uid;
  let address = `users/${uid}/${property}`;
  let value = '';

  await onValue(
    ref(getDatabase(), address),
    (snapshot) => {
      value = snapshot.val();
    },
    {
      onlyOnce: true,
    }
  );

  return value;
};

// Gets a ref, any ref
export const getRef = (address) => ref(getDatabase(), address);

export const passwordReset = (email) =>
  sendPasswordResetEmail(getAuth(), email);

// Asks for notifications permission
export const registerForPushNotificationsAsync = async (currentUser) => {
  const {existingStatus} = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });

  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const {status} = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    finalStatus = status;
  }
  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }
  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // POST the token to our backend so we can use it to send pushes from there
  let updates = {};
  updates['/expoToken'] = token;
  await update(ref(getDatabase(), `users/${currentUser.uid}`), updates);
  // call the push notification
};

// get all users token to sendPushNotification
export const sendPushNotification = async (title, body, data) => {
  const usersRef = ref(getDatabase(), 'users');

  onValue(usersRef, (snapshot) => {
    let userList = users.val();

    let expoTokenList = [];
    Object.keys(userList).forEach((key) => {
      if (
        userList[key].expoToken &&
        !expoTokenList.includes(userList[key].expoToken.toString()) // token duplicate removal
      ) {
        expoTokenList.push(userList[key].expoToken.toString());
      }
    });
    expoTokenList.forEach((item) => {
      const message = {
        to: item,
        sound: 'default',
        title,
        body,
        badge: 1,
        data: data || {},
      };
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      }).then((res) => console.log(res));
    });
  });
};

export const uploadImage = async (
  uri,
  user,
  fileName,
  documents,
  setDocuments
  ) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref_storage(getStorage(), `${user.uid}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
      },
      (error) => {
        console.log(error.message);
      },
      async () => {
        // Successful uploading and updating the documents state array
        await grabImages(user, documents, setDocuments);
        console.log('Test here');
      }
    );
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};

export const uploadDocument = async (uri, user, fileName, setDocuments) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref_storage(getStorage(), `${user.uid}/${fileName}`);
    console.log('Document Storage Reference:', storageRef.fullPath);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
      },
      (error) => {
        console.log('Error uploading document:', error);
      },
      async () => {
        // Successful uploading and updating the documents state array
        await grabImages(user, documents, setDocuments);
        console.log('Document uploaded successfully');
      }
    );
  } catch (error) {
    console.error('Error uploading document:', error);
  }
};


export const grabImages = (user, documents, setDocuments) => {
  let storageRef = ref_storage(getStorage(), user.uid);

  listAll(storageRef)
    .then((result) => {
      result.items.forEach((imageRef) => {
        // Push to list of objects representing documents by url and name
        getDownloadURL(ref_storage(getStorage(), imageRef)).then((url) => {
          makeDocumentsList(url, imageRef.name, documents, setDocuments);
        });
        // displayImage(imageRef);
      });
    })
    .catch((error) => {
      // Handle any errors
      console.log(error);
    });
};

export const deleteDocument = async (fileName, user) => {
  // Check if the user is authenticated
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  try {
    // Delete the image file from Firebase Storage
    const storageRef = ref_storage(getStorage(), `${user.uid}/${fileName}`);
    await deleteObject(storageRef);

    // Remove the document entry from the database
    const firestore = firebase.firestore();
    const documentRef = firestore.collection('documents').doc(fileName);
    await documentRef.delete();

    // Return the updated list of documents
    const documents = grabImages(user, documents, setDocuments);
    return documents;
  } catch (error) {
    console.error('Error deleting document:', error);

    //console.log(fileName); Used to verify file path

    
  }
};

const makeDocumentsList = (url, name, documents, setDocuments) => {
  let found = false;
  documents.forEach((item) => {
    if (item.url == url) {
      found = true;
    }
  });

  if (!found) {
    // created an object to insert the url and name files
    object = {url, name};

    // updating the document state to display it on the phone.
    setDocuments((prevArray) => [...prevArray, object]);
  }
};

// Gets current Uid
export const getUid = () => getAuth().currentUser.uid;

// Gets current UEmail
export const getUEmail = () => getAuth().currentUser.email;

export const getAuths = () => getAuth();

export const deleteAppointment = async (
  id,
  uid,
  objects,
  setObjects,
  eventId
) => {
  if (uid !== null) {
    console.log('EVENT ID >>:', eventId);
    Calendar.deleteEventAsync(eventId).catch((err) => err.message);
    setObjects(objects.filter((item) => item.key !== id));

    const appointments = ref(getDatabase(), `users/${uid}/appointments/${id}`);

    return remove(appointments);
  }
  console.log("Error: Couldn't get the User appointment Info");
};

export const fetchAppointment = async (uid, setObjects) => {
  if (uid !== null) {
    await onValue(
      ref(getDatabase(), `users/${uid}/appointments/`),
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);
          if (
            childSnapshot.val() !== null ||
            childSnapshot.val() !== 'undefined'
          ) {
            setObjects((prevArray) => [...prevArray, childSnapshot]);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  } else {
    alert(translate('noAppointmentInfo'));
  }
};

export const addAppointment = async (uid, appointmentInfo) => {
  push(ref(getDatabase(), `users/${uid}/appointments`), appointmentInfo).catch(
    (err) => console.log(err)
  );
};

export const fetchImmunization = async (uid, setObjects) => {
  if (uid !== null) {
    await onValue(
      ref(getDatabase(), `users/${uid}/immunizations/`),
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);
          if (
            childSnapshot.val() !== null ||
            childSnapshot.val() !== 'undefined'
          ) {
            setObjects((prevArray) => [...prevArray, childSnapshot]);
          }
        });
      },
      {
        onlyOnce: true,
      }
    );
  } else {
    alert(translate('noImmunizationInfo'));
  }
};

export const deleteImmunization = async (id, uid, objects, setObjects) => {
  if (uid !== null) {
    setObjects(objects.filter((item) => item.key !== id));
    const appointments = ref(getDatabase(), `users/${uid}/immunizations/${id}`);

    return remove(appointments);
  }
  console.log("Error: Couldn't get the User Immunization Info");
};

export const addImmunization = async (uid, immunizationInfo) => {
  push(
    ref(getDatabase(), `users/${uid}/immunizations`),
    immunizationInfo
  ).catch((err) => console.log(err));
};

export const addReference = async (uid, referenceInfo) => {
  push(ref(getDatabase(), `users/${uid}/references`), referenceInfo).catch(
    (err) => console.log(err)
  );
};

export const fetchReference = (uid, setReferences) => {
  if (uid !== null) {
    const referenceRef = ref(getDatabase(),'users/${uid}/references/');
    onValue(
      referenceRef,
      (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          console.log(childKey);
          console.log(childData);
          if (childSnapshot.val() !== null || childSnapshot.val() !== 'undefined') {
            setReferences((prevArray) => [...prevArray, childSnapshot]);
          }
        });
      },
      (error) => {
        console.error('Error fetching reference:', error);
        alert(translate('noReferenceInfo'));
      },
      {
        onlyOnce: true,
      }
    );
  } else {
    alert(translate('noReferenceInfo'));
  }
};

export const deleteReference = async (id, uid, references, setReferences) => {
  if (uid !== null) {
    setReferences(references.filter((item) => item.key !== id));
    const reference = ref(getDatabase(), `users/${uid}/references/${id}`);
    return remove(reference).catch((err) => console.log(err.message));
  }
  console.log("Error: Couldn't get the Reference Info");
};
