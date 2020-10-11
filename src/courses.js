let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/courses', function(request,response) {
    var languaje = request.query.lang || storage.getLanguaje();
    var data = storage.getData(languaje);
    var langParam = "?lang=" + languaje;
    var menu = [{name: data.Home.value, href: 'home' + langParam}, {name: data.Courses.value, href: 'courses' + langParam, className: 'current'}, {name: data.Contact.value, href: 'contact' + langParam}];
    response.render('courses', {"page_title": "Courses", menu: menu, data: data});
});

module.exports = router;