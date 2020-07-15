const en_US = require('./en_US.json')
const es_ES = require('./es_ES.json')
const ht_HT = require('./ht_HT.json')


module.exports = {
    translate: function (deviceLanguage, key1, key2) {
        if (!deviceLanguage) return en_US[key1][key2];
        else if (deviceLanguage.includes("es")) return es_ES[key1][key2];
        else if (deviceLanguage.includes("ca")) return es_ES[key1][key2];
        else if (deviceLanguage.includes("ht")) return ht_HT[key1][key2];
        else return en_US[key1][key2];
    }
  };

