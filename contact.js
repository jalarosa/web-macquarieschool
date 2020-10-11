let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/contact', function(request,response) {
    let userName = storage.getValue();
    var menu = [{name: 'Home', href: 'home'}, {name: 'Courses', href: 'courses'}, {name: 'Contact', href: 'contact', className: 'current'}];
    response.render('contact', {"page_title": "Contact", menu: menu});
});

module.exports = router;