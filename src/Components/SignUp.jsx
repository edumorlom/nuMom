import {useState, useEffect} from 'react';
import {signUp} from '../Firebase';

export default function SignUp(props) {
  const [index, setIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [pregnant, setPregnant] = useState(null);
  const [infant, setInfant] = useState(null);
  const [liveMiami, setLiveMiami] = useState(null);
  const [babyDOB, setBabyDOB] = useState('');

  let _isMounted = false;

  useEffect(() => {
    _isMounted = true;

    return () => (_isMounted = false);
  }, []);

  const signUpAndUploadData = () => {
    const info = getNextWeekAndWeekNo();
    signUp(
      email,
      phoneNumber,
      password,
      fullName,
      dob,
      pregnant,
      infant,
      liveMiami,
      babyDOB,
      ...info
    );
    // Unbinds Async Storage keys used in sign up after successful sign up
    const keys = [
      'name',
      'dob',
      'e-mail',
      'phone',
      'pass',
      'repeat',
      'babyDOB',
      'liveMiami',
    ];
    // AsyncStorage.multiRemove(keys, (err) => { console.log(err) });
    /* Logs in user after creating account
    setTimeout(() => {
      props.login(email, password);
    }, 2000);
    */
  };

  const getNextWeekAndWeekNo = () => {
    const babyDob = new Date(babyDOB);
    const today = new Date();
    const daysDifference =
      ((today.getTime() - babyDob.getTime()) / (1000 * 3600 * 24)) | 0; // Milliseconds to days
    const daysTillNextWeek = (7 - (daysDifference % 7)) % 7;
    const nextweek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysTillNextWeek
    );
    let nextWeek = `${(nextweek.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${nextweek
      .getDate()
      .toString()
      .padStart(2, '0')}/${nextweek.getFullYear()}`;
    let weekNo =
      daysTillNextWeek === 0
        ? (daysDifference / 7) | 0
        : (daysDifference / 7 + 1) | 0;
    if (weekNo > 24) {
      nextWeek = null;
      weekNo = null;
    }
    return [nextWeek, weekNo];
  };
}
