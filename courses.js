let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/courses', function(request,response) {
    var data = storage.getData("es");
    var menu = [{name: data.Home.value, href: 'home'}, {name: data.Courses.value, href: 'courses', className: 'current'}, {name: data.Contact.value, href: 'contact'}];
    response.render('courses', {"page_title": "Courses", menu: menu, data: data});
});

module.exports = router;