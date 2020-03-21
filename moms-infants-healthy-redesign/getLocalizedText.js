import en_US from './en_US'
import es_ES from './es_ES'
import pt_BR from './pt_BR'


export default function getLocalizedText(deviceLanguage, key) {
    if (!deviceLanguage) return en_US[key];
    if (deviceLanguage.includes("es")) return es_ES[key];
    if (deviceLanguage.includes("pt")) return pt_BR[key];
    else return en_US[key];
}