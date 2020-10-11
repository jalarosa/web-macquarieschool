let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/', function(request,response) {
  var menu = [{name: 'Home', href: 'home', className: 'current'}, {name: 'Courses', href: 'courses'}, {name: 'Contact', href: 'contact'}];
  response.render('index', {"page_title": "Macquarie School of English", menu: menu});
});

router.get('/home', function(request,response) {
  var menu = [{name: 'Home', href: 'home', className: 'current'}, {name: 'Courses', href: 'courses'}, {name: 'Contact', href: 'contact'}];
  response.render('index', {"page_title": "Macquarie School of English", menu: menu});
});

module.exports = router;