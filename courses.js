let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/courses', function(request,response) {
    let userName = storage.getValue();
    var menu = [{name: 'Home', href: 'home'}, {name: 'Courses', href: 'courses', className: 'current'}, {name: 'Contact', href: 'contact'}];
    response.render('courses', {"page_title": "Courses", menu: menu});
});

module.exports = router;