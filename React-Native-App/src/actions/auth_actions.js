import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
    FACEBOOK_LOGIN_SUCCESS, 
    FACEBOOK_LOGIN_FAIL,
    PHONE_LOGIN_SUCCESS
} from './types';

//action creator
export const FacebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token){
        //dispatch action saying fb login is done
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
    }
    else {
        //start up fb log in process
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async (dispatch) => {
    let { type, token } = await Facebook.logInWithReadPermissionsAsync('424226695166217', {
        permissions: ['public_profile']
    });


    if (type === 'cancel'){ //something went wrong when loggin in
        return dispatch( { type: FACEBOOK_LOGIN_FAIL} )
    }

    await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
}


//action creator
export const phoneLogin = () => {
    
};