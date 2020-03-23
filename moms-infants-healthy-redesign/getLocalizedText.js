import en_US from './en_US'
import es_ES from './es_ES'
import pt_BR from './pt_BR'
import zh_Hans from './zh_Hans'


export default function getLocalizedText(deviceLanguage, key) {
    if (!deviceLanguage) return en_US[key];
    if (deviceLanguage.includes("es")) return es_ES[key];
    if (deviceLanguage.includes("ca")) return es_ES[key];
    if (deviceLanguage.includes("pt")) return pt_BR[key];
    if (deviceLanguage.includes("zh")) return zh_Hans[key];
    else return en_US[key];
}