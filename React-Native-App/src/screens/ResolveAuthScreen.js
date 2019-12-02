import { useEffect, useContext } from 'react';
import { Context as AuthContext} from '../context/AuthContext';
import { ProviderTypes, TranslatorConfiguration } from 'react-native-power-translator';


const ResolveAuthScreen = props => {

    global.GLOBAL_LANGUAGE = "en";

    console.log("resolve auth language", GLOBAL_LANGUAGE)

    // translator
    TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', GLOBAL_LANGUAGE);
    
    
    const { tryLocalSignIn } = useContext(AuthContext);

    useEffect (() => {
        tryLocalSignIn();
    }, []);
    
    return null;
};

export default ResolveAuthScreen;