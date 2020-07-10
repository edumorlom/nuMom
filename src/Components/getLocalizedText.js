import en_US from '../en_US.json'
import es_ES from '../es_ES.json'
import pt_BR from '../pt_BR.json'
import zh_Hans from '../zh_Hans.json'
import en_STD from '../en_STD.json'
import es_STD from '../es_STD.json'
import { NativeModules } from 'react-native'

let deviceLanguage = Platform.OS === "ios"
? NativeModules.SettingsManager.settings.AppleLocale ||
NativeModules.SettingsManager.settings.AppleLanguages[0]
: NativeModules.I18nManager.localeIdentifier

export default function getLocalizedText(key) {
    if (!deviceLanguage) return en_US[key];
    else if (deviceLanguage.includes("es")) return es_ES[key];
    else if (deviceLanguage.includes("ca")) return es_ES[key];
    else if (deviceLanguage.includes("pt")) return pt_BR[key];
    else if (deviceLanguage.includes("zh")) return zh_Hans[key];
    else return en_US[key];
}

export function STDTranslate(key) {
    if (!deviceLanguage) return en_STD[key];
    else if (deviceLanguage.includes("es")) return es_STD[key];
    else if (deviceLanguage.includes("ca")) return es_STD[key];
    else if (deviceLanguage.includes("ht")) return ht_STD[key];
    else return en_STD[key];
}