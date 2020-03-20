import en_US from './en_US'
import es_ES from './es_ES'


export default function getLocalizedText(deviceLanguage, key) {
    if (!deviceLanguage) return en_US[key];
    if (deviceLanguage.includes("es")) return es_ES[key];
    else return en_US[key];
}