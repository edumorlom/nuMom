import en_US from './en_US'


export default function getLocalizedText(deviceLanguage, key) {
    if (deviceLanguage === ('en_US')) return en_US[key]
}