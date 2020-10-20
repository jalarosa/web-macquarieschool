var languaje = "es";

var fs = require('fs'); /* Put it where other modules included */
var lang_es = JSON.parse(fs.readFileSync('www/data/lang_es.json', 'utf8'));
var lang_en = JSON.parse(fs.readFileSync('www/data/lang_en.json', 'utf8'));

function getLanguaje() {
  return languaje;
}

function getMenu(index, languaje) {
  let data = getData(languaje);
  var langParam = "?lang=" + languaje;
  var menu = [{name: data.Home.value, href: 'home' + langParam}, 
              {name: data.Courses.value, href: 'courses' + langParam}, 
              {name: data.VirtualClasses.value, href: 'virtualClasses' + langParam}, 
              {name: data.Contact.value, href: 'contact' + langParam},
              {name: "Events", href: 'events' + langParam}];
  menu[index].className = 'current';
  return menu;
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
module.exports.getMenu = getMenu;