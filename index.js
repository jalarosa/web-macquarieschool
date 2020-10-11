let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/', function(request,response) {
  var languaje = request.query.lang || 'es';
  storage.setLanguaje(languaje);
  response.redirect('/home?lang=' + languaje);
});

router.get('/home', function(request,response) {
  var languaje = request.query.lang || storage.getLanguaje();
  storage.setLanguaje(languaje);
  var langParam = "?lang=" + languaje;
  var data = storage.getData(languaje);
  var menu = [{name: data.Home.value, href: 'home' + langParam, className: 'current'}, {name: data.Courses.value, href: 'courses' + langParam}, {name: data.Contact.value, href: 'contact' + langParam}];
  response.render('index', {"page_title": "Macquarie School of English", menu: menu, data: data});
});

module.exports = router;