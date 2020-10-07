import en_US from '../en_US.json'
import es_ES from '../es_ES.json'
import ht_HT from '../ht_HT.json'
import { NativeModules } from 'react-native'

let deviceLanguage = Platform.OS === "ios"
? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
NativeModules.SettingsManager.settings.AppleLocale
: NativeModules.I18nManager.localeIdentifier

//Translates general text in the app
export default function getLocalizedText(key) {
    if (!deviceLanguage) return en_US[key];
    else if (deviceLanguage.includes("es")) return es_ES[key];
    else if (deviceLanguage.includes("ca")) return es_ES[key];
    else if (deviceLanguage.includes("ht")) return ht_HT[key];
    else return en_US[key];
}