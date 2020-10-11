let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/', function(request,response) {
  response.redirect('/home');
});

router.get('/home', function(request,response) {
  var data = storage.getData("es");
  var menu = [{name: data.Home.value, href: 'home', className: 'current'}, {name: data.Courses.value, href: 'courses'}, {name: data.Contact.value, href: 'contact'}];
  response.render('index', {"page_title": "Macquarie School of English", menu: menu, data: data});
});

module.exports = router;