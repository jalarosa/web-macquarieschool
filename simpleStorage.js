var languaje = "es";

var fs = require('fs'); /* Put it where other modules included */
var lang_es = JSON.parse(fs.readFileSync('www/data/lang_es.json', 'utf8'));
var lang_en = JSON.parse(fs.readFileSync('www/data/lang_en.json', 'utf8'));

function getLanguaje() {
  return languaje;
}

function getData(lang) {
    if (lang === "es") {
        return lang_es;
    } else {
        return lang_en;
    }
}

function setLanguaje(value) {
  globalValue = value;
}

module.exports.getLanguaje = getLanguaje;
module.exports.setLanguaje = setLanguaje;
module.exports.getData = getData;