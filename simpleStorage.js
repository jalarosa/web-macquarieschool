var globalValue = "";

var fs = require('fs'); /* Put it where other modules included */
var lang_es = JSON.parse(fs.readFileSync('www/data/lang_es.json', 'utf8'));

function getValue() {
  return globalValue;
}

function getData(lang) {
    if (lang === "es") {
        return lang_es;
    } else {
        return lang_es;
    }
}

function setValue(value) {
  globalValue = value;
}

module.exports.getValue = getValue;
module.exports.setValue = setValue;
module.exports.getData = getData;