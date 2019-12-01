import React, { useEffect, useContext } from 'react';
import { View, Image } from 'react-native';
import { Context as AuthContext} from '../context/AuthContext';

const ResolveAuthScreen = () => {

    global.GlobalLanguage = "en";

    console.log("resolve auth", global.GlobalLanguage)
    
    const { tryLocalSignIn } = useContext(AuthContext);

    useEffect (() => {
        tryLocalSignIn();
    }, []);
    
    
    
    
    return ( 
        <View style={{ justifyContent:'center', alignItems: 'center' }}>
             <Image style={{width: 400, height: 400, marginRight: 20, alignItems: 'center'}} source={require('../../assets/images/logo111.png')} />
        </View>
    );
};

export default ResolveAuthScreen;