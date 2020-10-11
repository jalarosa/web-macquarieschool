let router = require('express').Router();
let storage = require('./simpleStorage');

router.get('/contact', function(request,response) {
    var languaje = request.query.lang || storage.getLanguaje();
    var data = storage.getData(languaje);
    var langParam = "?lang=" + languaje;
    var menu = [{name: data.Home.value, href: 'home' + langParam}, {name: data.Courses.value, href: 'courses' + langParam}, {name: data.Contact.value, href: 'contact' + langParam, className: 'current'}];
    response.render('contact', {"page_title": "Contact", menu: menu, data: data});
});

module.exports = router;