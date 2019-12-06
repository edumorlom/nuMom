import firebase from 'firebase';

const db = firebase.database();

//send user info to db

//get user info from db
export const getUserInfo = () => {
    console.log("hello from db actions file");

    db.ref('/users3053991519').on('value', snapshot => {
        console.log("info got from the db", snapshot.val())
    })
};


//save documents in db