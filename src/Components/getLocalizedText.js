import {NativeModules} from 'react-native';
import en_US from '../en_US.json';
import es_ES from '../es_ES.json';
import pt_BR from '../pt_BR.json';
import zh_Hans from '../zh_Hans.json';
import en_STD from '../en_STD.json';
import es_STD from '../es_STD.json';
import ht_STD from '../ht_STD.json';

const deviceLanguage =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLanguages[0] ||
      NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

// Translates general text in the app
export default function getLocalizedText(key) {
  if (!deviceLanguage) return en_US[key];
  if (deviceLanguage.includes('es')) return es_ES[key];
  if (deviceLanguage.includes('ca')) return es_ES[key];
  if (deviceLanguage.includes('pt')) return pt_BR[key];
  if (deviceLanguage.includes('zh')) return zh_Hans[key];
  return en_US[key];
}

// Translates the STD info from the learn tab
export function STDTranslate(key) {
  if (!deviceLanguage) return en_STD[key];
  if (deviceLanguage.includes('es')) return es_STD[key];
  if (deviceLanguage.includes('ca')) return es_STD[key];
  if (deviceLanguage.includes('ht')) return ht_STD[key];
  return en_STD[key];
}
