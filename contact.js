let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/contact', function(request,response) {
    var data = storage.getData("es");
    var menu = [{name: data.Home.value, href: 'home'}, {name: data.Courses.value, href: 'courses'}, {name: data.Contact.value, href: 'contact', className: 'current'}];
    response.render('contact', {"page_title": "Contact", menu: menu, data: data});
});

module.exports = router;